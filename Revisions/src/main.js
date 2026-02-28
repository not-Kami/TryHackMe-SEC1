import { revisions } from './revisions/index.js'

const labels = ['A', 'B', 'C', 'D']
let currentQuestions = []
let currentRevisionTitle = ''
let currentIndex = 0
let answers = []

const app = document.getElementById('app')

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function renderStart() {
  app.innerHTML = `
    <div class="screen start">
      <h1 class="title-row">Revisions <span class="info-wrap" title="Contributions welcome"><span class="info-i" aria-hidden="true">i</span><span class="info-msg">Spotted an error? Feel free to open a PR.</span></span></h1>
      <p class="subtitle">Choose a module to review. Feedback after each answer and a score at the end.</p>
      <div class="part-grid" id="part-grid">
        ${revisions
          .map(
            (r) => `
          <button class="part-card" data-id="${r.id}" type="button">
            <span class="part-card-title">${escapeHtml(r.title)}</span>
            <span class="part-card-desc">${escapeHtml(r.description)}</span>
            <span class="part-card-count">${r.questions.length} questions</span>
          </button>
        `
          )
          .join('')}
      </div>
    </div>
  `

  app.querySelectorAll('.part-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rev = revisions.find((r) => r.id === btn.dataset.id)
      currentQuestions = shuffle(rev.questions)
      currentRevisionTitle = rev.title
      currentIndex = 0
      answers = []
      renderQuestion()
    })
  })
}

function renderQuestion() {
  const q = currentQuestions[currentIndex]

  app.innerHTML = `
    <div class="screen question">
      <div class="progress">
        <span class="progress-text">Question ${currentIndex + 1} / ${currentQuestions.length}</span>
        <div class="progress-bar"><div class="progress-fill" style="width: ${((currentIndex + 1) / currentQuestions.length) * 100}%"></div></div>
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
        <button class="btn btn-next" id="next-btn" type="button">Next</button>
      </div>
    </div>
  `

  const optionsEl = document.getElementById('options')
  const feedbackEl = document.getElementById('feedback')
  const feedbackResult = document.getElementById('feedback-result')
  const feedbackHint = document.getElementById('feedback-hint')
  const nextBtn = document.getElementById('next-btn')

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

      nextBtn.focus()
    })
  })

  nextBtn.addEventListener('click', () => {
    currentIndex++
    if (currentIndex >= currentQuestions.length) {
      renderResult()
    } else {
      renderQuestion()
    }
  })
}

function renderResult() {
  const correctCount = answers.filter((a) => a.correct).length
  const total = currentQuestions.length
  const pct = Math.round((correctCount / total) * 100)
  const wrong = answers.filter((a) => !a.correct)

  app.innerHTML = `
    <div class="screen result">
      <h1>Result</h1>
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

  document.getElementById('restart-btn').addEventListener('click', renderStart)
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

renderStart()
