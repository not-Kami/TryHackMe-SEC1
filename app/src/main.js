import { revisions } from './revisions/index.js'

const labels = ['A', 'B', 'C', 'D']
let currentQuestions = []
let currentRevisionTitle = ''
let currentRevisionId = ''
let currentIndex = 0
let answers = []
let quizStartTime = 0
let timerInterval = null
let timerPaused = false
let timerPausedElapsed = 0
let autoAdvanceTimeout = null

const app = document.getElementById('app')

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  if (h > 0) return `${h}h ${m}m ${s}s`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

function getElapsed() {
  if (!quizStartTime) return 0
  return timerPaused ? timerPausedElapsed : Date.now() - quizStartTime
}

function startTimer(initialElapsed = 0) {
  quizStartTime = Date.now() - initialElapsed
  timerPaused = false
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    const el = document.getElementById('timer-display')
    if (el && !timerPaused) el.textContent = formatTime(getElapsed())
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function clearAutoAdvance() {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout)
    autoAdvanceTimeout = null
  }
}

function goToNextOrResult() {
  clearAutoAdvance()
  currentIndex++
  if (currentIndex >= currentQuestions.length) {
    renderResult()
  } else {
    renderQuestion()
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const STORAGE_KEY = 'revisions-stats'
const PASS_PCT = 80

function getModuleImageUrl(id, imageFile) {
  try {
    const filename = imageFile || `${id}.png`
    return new URL(`./img/${filename}`, import.meta.url).href
  } catch {
    return ''
  }
}

function getStats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveStats(id, pct, elapsedMs = 0) {
  const stats = getStats()
  const prev = stats[id] || {
    bestPct: 0,
    passed: false,
    attempts: 0,
    totalMs: 0,
    lastMs: 0,
    totalPct: 0,
  }
  const bestPct = Math.max(prev.bestPct, pct)
  const passed = prev.passed || pct >= PASS_PCT

  const attempts = (prev.attempts || 0) + 1
  const totalMs = (prev.totalMs || 0) + elapsedMs
  const lastMs = elapsedMs
  const totalPct = (prev.totalPct || 0) + pct

  stats[id] = { bestPct, passed, attempts, totalMs, lastMs, totalPct }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
}

function getModuleStats(id) {
  return getStats()[id] || null
}

function exitQuiz() {
  stopTimer()
  clearAutoAdvance()
  currentIndex = 0
  answers = []
  currentRevisionId = ''
  currentRevisionTitle = ''
  renderStart()
}

function renderStart() {
  app.innerHTML = `
    <div class="screen start">
      <div class="start-container">
        <header class="start-header">
          <h1 class="title-row">
            Revisions
            <span class="info-wrap" title="Contributions welcome">
              <span class="info-i" aria-hidden="true">i</span>
              <span class="info-msg">Spotted an error? Feel free to open a PR.</span>
            </span>
          </h1>
        </header>
        <p class="subtitle">Choose a module to review.</p>
        <div class="part-grid" id="part-grid">
        ${revisions
          .map(
            (r) => {
              const isUpcoming = r.upcoming === true
              const imgUrl = getModuleImageUrl(r.id, r.image)
              const stats = isUpcoming ? null : getModuleStats(r.id)
              return `
          <button class="part-card ${isUpcoming ? 'part-card--upcoming' : ''}" data-id="${r.id}" type="button" ${isUpcoming ? 'disabled' : ''} title="${isUpcoming ? 'Coming soon' : ''}">
            <span class="part-card-frame ${stats?.passed ? 'part-card-frame--passed' : ''} ${stats?.bestPct === 100 ? 'part-card-frame--perfect' : ''}">
              ${!isUpcoming && stats ? `<span class="part-card-best" title="Best score">${stats.bestPct}%</span>` : ''}
              ${isUpcoming ? '<span class="part-card-coming">Coming soon</span>' : ''}
              ${stats?.passed ? '<span class="part-card-badge" title="Passed">✓</span>' : ''}
              ${imgUrl ? `<img class="part-card-img" src="${imgUrl}" alt="" />` : ''}
              <span class="part-card-title">${escapeHtml(r.title)}</span>
              <span class="part-card-desc">${escapeHtml(r.description)}</span>
            </span>
          </button>
        `
            }
          )
          .join('')}
        </div>
      </div>
    </div>
  `

  app.querySelectorAll('.part-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rev = revisions.find((r) => r.id === btn.dataset.id)
      if (rev.upcoming || !rev.questions || rev.questions.length === 0) return
      currentQuestions = shuffle(rev.questions)
      currentRevisionTitle = rev.title
      currentRevisionId = rev.id
      currentIndex = 0
      answers = []
      startTimer()
      renderQuestion()
    })
  })

}

function renderQuestion() {
  const q = currentQuestions[currentIndex]
  const existingAnswer = answers[currentIndex]
  const showBack = currentIndex > 0

  // Input question type: user types the answer (e.g. fill a command/operator).
  if (q && q.type === 'input') {
    app.innerHTML = `
      <div class="screen question">
        <button class="quiz-exit" type="button" id="quiz-exit-btn" title="Back to modules">← Modules</button>
        <div class="progress-row">
          <div class="progress">
            <span class="progress-text">Question ${currentIndex + 1} / ${currentQuestions.length}</span>
            <div class="progress-bar"><div class="progress-fill" style="width: ${((currentIndex + 1) / currentQuestions.length) * 100}%"></div></div>
          </div>
          <div class="timer-row">
            <span class="timer" id="timer-display">${formatTime(getElapsed())}</span>
            <button class="btn-timer" type="button" id="timer-pause-btn" title="${timerPaused ? 'Resume' : 'Pause'}">${timerPaused ? '▶' : '⏸'}</button>
          </div>
        </div>
        <p class="part">${escapeHtml(currentRevisionTitle)}</p>
        <h2 class="question-text">${escapeHtml(q.text)}</h2>

        <div class="cli-input-line">
          <span class="cli-prompt">${escapeHtml(q.cli?.prompt || '$')}</span>
          <span class="cli-before">${escapeHtml(q.cli?.before || '')}</span>
          <input
            id="cli-input"
            class="cli-input"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="${escapeHtml(q.inputPlaceholder || 'Type your command...')}"
            ${existingAnswer ? 'disabled' : ''}
            value="${existingAnswer?.input ? escapeHtml(existingAnswer.input) : ''}"
          />
          <span class="cli-after">${escapeHtml(q.cli?.after || '')}</span>
        </div>

        <div class="input-actions">
          <button class="btn btn-primary" type="button" id="input-submit-btn" ${existingAnswer ? 'disabled' : ''}>Validate</button>
        </div>

        <div class="feedback hidden" id="feedback">
          <p class="feedback-result" id="feedback-result"></p>
          <p class="feedback-hint" id="feedback-hint"></p>
        </div>

        <div class="question-nav">
          <button class="btn-arrow" id="prev-btn" type="button" ${!showBack ? ' disabled' : ''} title="Previous">←</button>
          <button class="btn-arrow" id="next-btn" type="button" ${!existingAnswer ? ' disabled' : ''} title="${currentIndex + 1 >= currentQuestions.length ? 'See result' : 'Next'}">→</button>
        </div>
      </div>
    `

    const inputEl = document.getElementById('cli-input')
    const feedbackEl = document.getElementById('feedback')
    const feedbackResult = document.getElementById('feedback-result')
    const feedbackHint = document.getElementById('feedback-hint')
    const nextBtn = document.getElementById('next-btn')
    const submitBtn = document.getElementById('input-submit-btn')

    const cliBefore = q.cli?.before || ''
    const cliAfter = q.cli?.after || ''
    const cliPrompt = q.cli?.prompt || ''

    function extractCliCore(raw) {
      let v = String(raw || '')

      // If the user pasted the full command, try to extract the missing part between before/after.
      if (cliBefore && v.includes(cliBefore)) {
        v = v.split(cliBefore)[1] ?? ''
      }
      if (cliAfter && v.includes(cliAfter)) {
        v = v.split(cliAfter)[0] ?? ''
      }

      if (cliPrompt && v.includes(cliPrompt)) {
        v = v.split(cliPrompt).pop() ?? v
      }
      return v
    }

    function normalize(s) {
      return String(s || '')
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
    }

    function validateInput(value) {
      const core = extractCliCore(value)
      const user = normalize(core)
      const accepted = Array.isArray(q.accepted) ? q.accepted : []
      return accepted.some((a) => normalize(a) === user)
    }

    function showFeedback(isCorrect) {
      feedbackResult.textContent = isCorrect ? '✓ Correct!' : '✗ Wrong'
      feedbackResult.className = 'feedback-result ' + (isCorrect ? 'ok' : 'ko')
      feedbackHint.textContent = q.hint || ''
      feedbackEl.classList.remove('hidden')
    }

    if (existingAnswer) {
      showFeedback(existingAnswer.correct)
      nextBtn.disabled = false
    } else {
      const syncSubmitDisabled = () => {
        const v = inputEl.value
        submitBtn.disabled = String(v || '').trim().length === 0
      }
      syncSubmitDisabled()

      inputEl.addEventListener('input', syncSubmitDisabled)

      function submitOnce() {
        const value = inputEl.value
        if (String(value || '').trim().length === 0) return
        const correct = validateInput(value)
        answers.push({ questionIndex: currentIndex, input: value, correct })
        showFeedback(correct)
        inputEl.disabled = true
        submitBtn.disabled = true
        nextBtn.disabled = false
        // Important: do NOT focus Next here.
        // Otherwise, pressing Enter can immediately "activate" the Next button.
      }

      submitBtn.addEventListener('click', submitOnce)
      inputEl.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        e.stopPropagation()
        submitOnce()
      })
    }

    document.getElementById('quiz-exit-btn')?.addEventListener('click', exitQuiz)
    document.getElementById('next-btn')?.addEventListener('click', () => {
      clearAutoAdvance()
      goToNextOrResult()
    })
    document.getElementById('prev-btn')?.addEventListener('click', () => {
      clearAutoAdvance()
      if (currentIndex > 0) {
        currentIndex--
        renderQuestion()
      }
    })

    document.getElementById('timer-pause-btn').addEventListener('click', () => {
      const btn = document.getElementById('timer-pause-btn')
      if (timerPaused) {
        startTimer(timerPausedElapsed)
        btn.textContent = '⏸'
        btn.title = 'Pause'
      } else {
        timerPausedElapsed = getElapsed()
        timerPaused = true
        if (timerInterval) {
          clearInterval(timerInterval)
          timerInterval = null
        }
        clearAutoAdvance()
        btn.textContent = '▶'
        btn.title = 'Resume'
      }
    })

    return
  }

  // Order question type (e.g., OSI layers): user builds a sequence and validates it.
  if (q && q.type === 'order') {
    app.innerHTML = `
      <div class="screen question">
        <button class="quiz-exit" type="button" id="quiz-exit-btn" title="Back to modules">← Modules</button>
        <div class="progress-row">
          <div class="progress">
            <span class="progress-text">Question ${currentIndex + 1} / ${currentQuestions.length}</span>
            <div class="progress-bar"><div class="progress-fill" style="width: ${((currentIndex + 1) / currentQuestions.length) * 100}%"></div></div>
          </div>
          <div class="timer-row">
            <span class="timer" id="timer-display">${formatTime(getElapsed())}</span>
            <button class="btn-timer" type="button" id="timer-pause-btn" title="${timerPaused ? 'Resume' : 'Pause'}">${timerPaused ? '▶' : '⏸'}</button>
          </div>
        </div>
        <p class="part">${escapeHtml(currentRevisionTitle)}</p>
        <h2 class="question-text">${escapeHtml(q.text)}</h2>

        <div class="order-container" id="order-container">
          <div class="order-bank" id="order-bank"></div>
          <div class="order-slots" id="order-slots">
            ${q.items.map(() => `<div class="order-slot"></div>`).join('')}
          </div>
          <div class="order-actions">
            <button class="btn" type="button" id="order-clear-btn" ${existingAnswer ? 'disabled' : ''}>Clear</button>
            <button class="btn btn-primary" type="button" id="order-submit-btn" ${existingAnswer ? 'disabled' : q.items.length === 0 ? 'disabled' : ''} disabled>Validate</button>
          </div>
        </div>

        <div class="feedback hidden" id="feedback">
          <p class="feedback-result" id="feedback-result"></p>
          <p class="feedback-hint" id="feedback-hint"></p>
        </div>

        <div class="question-nav">
          <button class="btn-arrow" id="prev-btn" type="button" ${!showBack ? ' disabled' : ''} title="Previous">←</button>
          <button class="btn-arrow" id="next-btn" type="button" ${!existingAnswer ? ' disabled' : ''} title="${currentIndex + 1 >= currentQuestions.length ? 'See result' : 'Next'}">→</button>
        </div>
      </div>
    `

    const bankEl = document.getElementById('order-bank')
    const slotsEl = document.getElementById('order-slots')
    const feedbackEl = document.getElementById('feedback')
    const feedbackResult = document.getElementById('feedback-result')
    const feedbackHint = document.getElementById('feedback-hint')
    const nextBtn = document.getElementById('next-btn')
    const prevBtn = document.getElementById('prev-btn')
    const clearBtn = document.getElementById('order-clear-btn')
    const submitBtn = document.getElementById('order-submit-btn')
    const slotEls = Array.from(slotsEl.querySelectorAll('.order-slot'))

    let orderAnswer = existingAnswer
    let sequence = orderAnswer?.sequence || []

    function setSlot(i, value, lock) {
      const slot = slotEls[i]
      slot.innerHTML = ''
      slot.dataset.index = String(i)

      if (!value) {
        slot.classList.add('order-slot--empty')
        return
      }

      slot.classList.remove('order-slot--empty')
      slot.classList.remove('order-slot--correct', 'order-slot--wrong')

      const item = document.createElement('span')
      item.className = 'order-slot-item'
      item.textContent = value
      slot.appendChild(item)

      if (!lock) {
        const removeBtn = document.createElement('button')
        removeBtn.type = 'button'
        removeBtn.className = 'order-slot-remove'
        removeBtn.title = 'Remove'
        removeBtn.textContent = '×'
        removeBtn.addEventListener('click', () => {
          // Remove the slot value and allow reordering.
          sequence = sequence.filter((_, idx) => idx !== i)
          renderAll()
        })
        slot.appendChild(removeBtn)
      }
    }

    function renderSlots({ lockSlots } = {}) {
      for (let i = 0; i < slotEls.length; i++) {
        const val = sequence[i]
        setSlot(i, val, Boolean(lockSlots))
      }
    }

    function renderBank({ lockBank } = {}) {
      bankEl.innerHTML = ''
      const used = new Set(sequence)

      q.items.forEach((item) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'order-item'
        btn.textContent = item
        btn.dataset.item = item

        const isUsed = used.has(item)
        btn.disabled = lockBank || isUsed || (sequence.length >= q.items.length && !isUsed)

        if (lockBank && orderAnswer) {
          btn.classList.add(orderAnswer.correct ? 'order-item--correct' : 'order-item--neutral')
        }

        btn.addEventListener('click', () => {
          if (sequence.length >= q.items.length) return
          if (used.has(item)) return
          sequence.push(item)
          renderAll()
        })

        bankEl.appendChild(btn)
      })
    }

    function validateSequence() {
      if (sequence.length !== q.correctOrder.length) return false
      for (let i = 0; i < q.correctOrder.length; i++) {
        if (sequence[i] !== q.correctOrder[i]) return false
      }
      return true
    }

    function renderAll() {
      const lock = Boolean(orderAnswer)
      renderSlots({ lockSlots: lock })
      renderBank({ lockBank: lock })

      clearBtn.disabled = lock
      // Enable submit only when fully filled (and not already answered).
      submitBtn.disabled = lock || sequence.length !== q.items.length
    }

    function showFeedback(isCorrect) {
      feedbackResult.textContent = isCorrect ? '✓ Correct!' : '✗ Wrong'
      feedbackResult.className = 'feedback-result ' + (isCorrect ? 'ok' : 'ko')
      feedbackHint.textContent = q.hint
      feedbackEl.classList.remove('hidden')

      // Highlight each slot vs expected.
      for (let i = 0; i < slotEls.length; i++) {
        const expected = q.correctOrder[i]
        const got = sequence[i]
        if (got && got === expected) slotEls[i].classList.add('order-slot--correct')
        else slotEls[i].classList.add('order-slot--wrong')
      }
    }

    // Build initial UI
    renderAll()

    // Already answered state
    if (orderAnswer) {
      submitBtn.disabled = true
      clearBtn.disabled = true
      feedbackEl.classList.remove('hidden')
      showFeedback(orderAnswer.correct)
      nextBtn.disabled = false
    } else {
      submitBtn.disabled = sequence.length !== q.items.length
      clearBtn.disabled = false

      submitBtn.addEventListener('click', () => {
        const correct = validateSequence()
        answers.push({ questionIndex: currentIndex, sequence: [...sequence], correct })

        // lock UI + feedback
        orderAnswer = { correct, sequence: [...sequence] }
        renderAll()
        showFeedback(correct)
        nextBtn.disabled = false
        nextBtn.focus()

        if (correct && !timerPaused) {
          clearAutoAdvance()
          autoAdvanceTimeout = setTimeout(goToNextOrResult, 3000)
        }
      })
    }

    clearBtn.addEventListener('click', () => {
      if (orderAnswer) return
      sequence = []
      renderAll()
      feedbackEl.classList.add('hidden')
    })

    document.getElementById('next-btn').addEventListener('click', () => {
      clearAutoAdvance()
      goToNextOrResult()
    })

    document.getElementById('prev-btn').addEventListener('click', () => {
      clearAutoAdvance()
      if (currentIndex > 0) {
        currentIndex--
        renderQuestion()
      }
    })

    document.getElementById('timer-pause-btn').addEventListener('click', () => {
      const btn = document.getElementById('timer-pause-btn')
      if (timerPaused) {
        startTimer(timerPausedElapsed)
        btn.textContent = '⏸'
        btn.title = 'Pause'
      } else {
        timerPausedElapsed = getElapsed()
        timerPaused = true
        if (timerInterval) {
          clearInterval(timerInterval)
          timerInterval = null
        }
        clearAutoAdvance()
        btn.textContent = '▶'
        btn.title = 'Resume'
      }
    })

    document.getElementById('quiz-exit-btn')?.addEventListener('click', exitQuiz)
    return
  }

  app.innerHTML = `
    <div class="screen question">
      <button class="quiz-exit" type="button" id="quiz-exit-btn" title="Back to modules">← Modules</button>
      <div class="progress-row">
        <div class="progress">
          <span class="progress-text">Question ${currentIndex + 1} / ${currentQuestions.length}</span>
          <div class="progress-bar"><div class="progress-fill" style="width: ${((currentIndex + 1) / currentQuestions.length) * 100}%"></div></div>
        </div>
        <div class="timer-row">
          <span class="timer" id="timer-display">${formatTime(getElapsed())}</span>
          <button class="btn-timer" type="button" id="timer-pause-btn" title="${timerPaused ? 'Resume' : 'Pause'}">${timerPaused ? '▶' : '⏸'}</button>
        </div>
      </div>
      <p class="part">${escapeHtml(currentRevisionTitle)}</p>
      <h2 class="question-text">${escapeHtml(q.text)}</h2>
      <div class="options" id="options">
        ${q.options
          .map(
            (opt, i) => `
          <button class="option" data-index="${i}" type="button">
            <span class="option-label">${labels[i]}</span>
            <span class="option-text">${escapeHtml(opt)}</span>
          </button>
        `
          )
          .join('')}
      </div>
      <div class="feedback hidden" id="feedback">
        <p class="feedback-result" id="feedback-result"></p>
        <p class="feedback-hint" id="feedback-hint"></p>
      </div>
      <div class="question-nav">
        <button class="btn-arrow" id="prev-btn" type="button" ${!showBack ? ' disabled' : ''} title="Previous">←</button>
        <button class="btn-arrow" id="next-btn" type="button" ${!existingAnswer ? ' disabled' : ''} title="${currentIndex + 1 >= currentQuestions.length ? 'See result' : 'Next'}">→</button>
      </div>
    </div>
  `

  const optionsEl = document.getElementById('options')
  const feedbackEl = document.getElementById('feedback')
  const feedbackResult = document.getElementById('feedback-result')
  const feedbackHint = document.getElementById('feedback-hint')
  const nextBtn = document.getElementById('next-btn')

  // Already answered: show answered state
  if (existingAnswer) {
    optionsEl.querySelectorAll('.option').forEach((b) => (b.disabled = true))
    const chosenBtn = optionsEl.querySelector(`[data-index="${existingAnswer.chosen}"]`)
    chosenBtn.classList.add('chosen', existingAnswer.correct ? 'correct' : 'wrong')
    if (!existingAnswer.correct) {
      const correctBtn = optionsEl.querySelector(`[data-index="${q.correct}"]`)
      correctBtn.classList.add('correct')
    }
    feedbackResult.textContent = existingAnswer.correct ? '✓ Correct!' : '✗ Wrong'
    feedbackResult.className = 'feedback-result ' + (existingAnswer.correct ? 'ok' : 'ko')
    feedbackHint.textContent = q.hint
    feedbackEl.classList.remove('hidden')
  } else {
    optionsEl.querySelectorAll('.option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosen = parseInt(btn.dataset.index, 10)
        const correct = q.correct === chosen
        answers.push({ questionIndex: currentIndex, chosen, correct })

        optionsEl.querySelectorAll('.option').forEach((b) => (b.disabled = true))
        btn.classList.add('chosen', correct ? 'correct' : 'wrong')
        const correctBtn = optionsEl.querySelector(`[data-index="${q.correct}"]`)
        if (!correct) correctBtn.classList.add('correct')

        feedbackResult.textContent = correct ? '✓ Correct!' : '✗ Wrong'
        feedbackResult.className = 'feedback-result ' + (correct ? 'ok' : 'ko')
        feedbackHint.textContent = q.hint
        feedbackEl.classList.remove('hidden')
        document.getElementById('next-btn').disabled = false
        document.getElementById('next-btn').focus()
        if (correct && !timerPaused) {
          clearAutoAdvance()
          autoAdvanceTimeout = setTimeout(goToNextOrResult, 3000)
        }
      })
    })
  }

  document.getElementById('next-btn').addEventListener('click', () => {
    clearAutoAdvance()
    goToNextOrResult()
  })

  document.getElementById('prev-btn').addEventListener('click', () => {
    clearAutoAdvance()
    if (currentIndex > 0) {
      currentIndex--
      renderQuestion()
    }
  })

  document.getElementById('timer-pause-btn').addEventListener('click', () => {
    const btn = document.getElementById('timer-pause-btn')
    if (timerPaused) {
      startTimer(timerPausedElapsed)
      btn.textContent = '⏸'
      btn.title = 'Pause'
    } else {
      timerPausedElapsed = getElapsed()
      timerPaused = true
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
      clearAutoAdvance()
      btn.textContent = '▶'
      btn.title = 'Resume'
    }
  })

  document.getElementById('quiz-exit-btn')?.addEventListener('click', exitQuiz)
}

function renderResult() {
  stopTimer()
  const correctCount = answers.filter((a) => a.correct).length
  const total = currentQuestions.length
  const pct = Math.round((correctCount / total) * 100)
  const wrong = answers.filter((a) => !a.correct)
  const elapsed = getElapsed()
  if (currentRevisionId) saveStats(currentRevisionId, pct, elapsed)

  app.innerHTML = `
    <div class="screen result">
      <button class="quiz-exit" type="button" id="quiz-exit-btn" title="Back to modules">← Modules</button>
      <h1>Result</h1>
      <p class="result-time">Time: ${formatTime(elapsed)}</p>
      <div class="score-box">
        <span class="score-number">${correctCount}</span>
        <span class="score-sep">/</span>
        <span class="score-total">${total}</span>
      </div>
      <p class="score-pct">${pct}%</p>
      ${
        wrong.length
          ? `
        <details class="wrong-answers">
          <summary>View ${wrong.length} wrong answer(s)</summary>
          <ul>
            ${wrong
              .map(
                (a) => {
                  const q = currentQuestions[a.questionIndex]
                  let correctText = ''
                  if (q.type === 'order') {
                    correctText = q.correctOrder?.join(' -> ') || '—'
                  } else if (q.type === 'input') {
                    correctText = Array.isArray(q.accepted) ? q.accepted.join(' / ') : '—'
                  } else {
                    correctText = labels[q.correct]
                  }
                  return `<li><strong>Q${a.questionIndex + 1}:</strong> ${escapeHtml(q.text)} — Correct: ${escapeHtml(correctText)}. ${escapeHtml(q.hint || '')}</li>`
                }
              )
              .join('')}
          </ul>
        </details>
      `
          : '<p class="perfect">Perfect! 🎉</p>'
      }
      <button class="btn btn-primary" id="restart-btn">Choose another module</button>
    </div>
  `

  document.getElementById('restart-btn').addEventListener('click', () => {
    exitQuiz()
  })
  document.getElementById('quiz-exit-btn')?.addEventListener('click', exitQuiz)
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

renderStart()

// Reset menu (gear dropdown)
const resetGearEl = document.getElementById('reset-progress-gear')
const resetMenuEl = document.getElementById('reset-progress-menu')
const resetActionEl = document.getElementById('reset-progress-action')

function closeResetMenu() {
  if (!resetMenuEl) return
  resetMenuEl.hidden = true
}

resetGearEl?.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (!resetMenuEl) return
  resetMenuEl.hidden = !resetMenuEl.hidden
})

resetActionEl?.addEventListener('click', (e) => {
  e.preventDefault()
  closeResetMenu()
  localStorage.removeItem(STORAGE_KEY)
  renderStart()
})

const myStatsActionEl = document.getElementById('my-stats-action')

function showMyStatsModal() {
  const stats = getStats()
  const modules = revisions.filter((r) => r.upcoming !== true)
  const totalTimeMs = modules.reduce((acc, r) => acc + (stats[r.id]?.totalMs || 0), 0)
  const totalAttempts = modules.reduce((acc, r) => acc + (stats[r.id]?.attempts || 0), 0)
  const totalPctSum = modules.reduce((acc, r) => acc + (stats[r.id]?.totalPct || 0), 0)
  const avgPct = totalAttempts ? Math.round(totalPctSum / totalAttempts) : 0

  let rows = ''
  modules.forEach((r) => {
    const s = stats[r.id]
    const bestPct = s?.bestPct ?? 0
    const attempts = s?.attempts ?? 0
    const totalMs = s?.totalMs ?? 0
    const lastMs = s?.lastMs ?? 0
    const moduleAvgPct = attempts ? Math.round((s?.totalPct || 0) / attempts) : 0
    rows += `
      <tr>
        <td>${escapeHtml(r.title)}</td>
        <td>${bestPct ? `${bestPct}%` : '—'}</td>
        <td>${attempts ? `${moduleAvgPct}%` : '—'}</td>
        <td>${attempts ? String(attempts) : '—'}</td>
        <td>${totalMs ? escapeHtml(formatDuration(totalMs)) : '—'}</td>
        <td>${lastMs ? escapeHtml(formatDuration(lastMs)) : '—'}</td>
      </tr>
    `
  })

  const modal = document.createElement('div')
  modal.id = 'stats-modal'
  modal.className = 'stats-modal-overlay'
  modal.innerHTML = `
    <div class="stats-modal">
      <div class="stats-modal-header">
        <h2>My stats</h2>
        <button type="button" class="stats-modal-close" aria-label="Close">✕</button>
      </div>
      <p class="stats-modal-subtitle">
        Total time across modules: <strong>${escapeHtml(formatDuration(totalTimeMs))}</strong>
        · Average score: <strong>${totalAttempts ? `${avgPct}%` : '—'}</strong>
      </p>
      <div class="stats-modal-table-wrap">
        <table class="stats-modal-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Best</th>
              <th>Average</th>
              <th>Attempts</th>
              <th>Total time</th>
              <th>Last</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `

  modal.querySelector('.stats-modal-close')?.addEventListener('click', () => {
    modal.remove()
  })

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) modal.remove()
  })

  document.body.appendChild(modal)
}

myStatsActionEl?.addEventListener('click', (e) => {
  e.preventDefault()
  closeResetMenu()
  showMyStatsModal()
})

document.addEventListener('click', () => {
  closeResetMenu()
})
