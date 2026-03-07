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

function saveStats(id, pct) {
  const stats = getStats()
  const prev = stats[id] || { bestPct: 0, passed: false }
  const bestPct = Math.max(prev.bestPct, pct)
  const passed = prev.passed || pct >= PASS_PCT
  stats[id] = { bestPct, passed }
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
          <h1 class="title-row">Revisions <span class="info-wrap" title="Contributions welcome"><span class="info-i" aria-hidden="true">i</span><span class="info-msg">Spotted an error? Feel free to open a PR.</span></span></h1>
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
  const elapsed = quizStartTime ? Date.now() - quizStartTime : 0
  if (currentRevisionId) saveStats(currentRevisionId, pct)

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
                  return `<li><strong>Q${a.questionIndex + 1}:</strong> ${escapeHtml(q.text)} — Correct: ${labels[q.correct]}. ${escapeHtml(q.hint)}</li>`
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
