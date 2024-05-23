const questions = [
  {
    question: "What is the capital city of Australia?",
    answer: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Which is the longest river in the world?",
    answer: [
      { text: "Amazon River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
    ],
  },
  {
    question: "Mount Kilimanjaro is located in which country?",
    answer: [
      { text: "Kenya", correct: false },
      { text: "Tanzania", correct: true },
      { text: "Uganda", correct: false },
      { text: "Ethiopia", correct: false },
    ],
  },
  {
    question: "The Great Barrier Reef is found off the coast of which country?",
    answer: [
      { text: "Indonesia", correct: false },
      { text: "Philippines", correct: false },
      { text: "Australia", correct: true },
      { text: "Thailand", correct: false },
    ],
  },
  {
    question: "Which country has the largest population in the world?",
    answer: [
      { text: "India", correct: false },
      { text: "United States", correct: false },
      { text: "Indonesia", correct: false },
      { text: "China", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  reset();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answer.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", () => {
      if (answer.correct) {
        button.classList.add("success");
        score++;
      } else {
        button.classList.add("danger");
      }

      Array.from(answerButton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("success");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    });
  });
};
const reset = () => {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
};
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      reset();
      questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    }
  }
});
startQuiz();
