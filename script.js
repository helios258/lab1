const quizData = [
  { question: "Який оператор використовується для суворого порівняння за значенням і типом?", options: ["==", "=", "===", "!="], correct: 2 },
  { question: "Який метод додає новий елемент в кінець масиву?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
  { question: "Що повертає вираз typeof null?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correct: 2 },
  { question: "Яка змінна має блочну область видимості (block scope)?", options: ["var", "let", "глобальна", "жодна з перелічених"], correct: 1 },
  { question: "Яке з ключових слів використовується для створення константи?", options: ["var", "const", "let", "static"], correct: 1 }
];

let currentIndex = 0;
let score = 0;

class QuizQuestion extends HTMLElement {
  connectedCallback() {
    const q = quizData[currentIndex];
    this.innerHTML = `
      <h1>Запитання ${currentIndex + 1} з ${quizData.length}</h1>
      <p class="question-title">${q.question}</p>
      <div class="options-list">
        ${q.options.map((opt, i) => `
          <label class="option-label">
            <input type="radio" name="answer" value="${i}" onchange="document.getElementById('next-btn').disabled = false">
            ${opt}
          </label>
        `).join('')}
      </div>
      <button class="btn" id="next-btn" disabled onclick="nextQuestion()">Далі</button>
    `;
  }
}

class QuizResult extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>Результат</h1>
      <p class="result-score">${score} із ${quizData.length} правильних відповідей</p>
      <button class="btn" onclick="restart()">Пройти знову</button>
    `;
  }
}

customElements.define('quiz-question', QuizQuestion);
customElements.define('quiz-result', QuizResult);

function render() {
  const app = document.getElementById('app');
  app.innerHTML = currentIndex < quizData.length 
    ? '<quiz-question></quiz-question>' 
    : '<quiz-result></quiz-result>';
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (selected && Number(selected.value) === quizData[currentIndex].correct) {
    score++;
  }
  currentIndex++;
  render();
}

function restart() {
  currentIndex = 0;
  score = 0;
  render();
}

render();