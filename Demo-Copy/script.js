const correctAnswers = {
    q1: '4',
    q2: 'Paris',
    q3: 'Blue'
  };
  
  const questionTimes = {};
  let currentQuestionIndex = 0;
  let startTime = performance.now();
  
  function nextQuestion() {
    const now = performance.now();
    const currentQuestion = document.querySelectorAll('.question')[currentQuestionIndex];
    const questionName = currentQuestion.querySelector('input[type="radio"]').name;
  
    // Store time taken
    questionTimes[questionName] = now - startTime;
  
    // Hide current question
    currentQuestion.classList.remove('active');
  
    // Show next question
    currentQuestionIndex++;
    const next = document.querySelector(`.question[data-index="${currentQuestionIndex}"]`);
    if (next) {
      next.classList.add('active');
      startTime = performance.now(); // reset start time for next question
    }
  }
  
  function submitTest() {
    const now = performance.now();
    const currentQuestion = document.querySelectorAll('.question')[currentQuestionIndex];
    const questionName = currentQuestion.querySelector('input[type="radio"]').name;
  
    // Store time taken for final question
    questionTimes[questionName] = now - startTime;
  
    const form = document.getElementById('testForm');
    const formData = new FormData(form);
  
    let score = 0;
    let total = Object.keys(correctAnswers).length;
  
    const resultLines = [];
  
    for (const [key, correct] of Object.entries(correctAnswers)) {
      const userAnswer = formData.get(key);
      const isCorrect = userAnswer === correct;
      if (isCorrect) score++;
  
      const time = questionTimes[key] ? Math.round(questionTimes[key]) : 'N/A';
      resultLines.push(
        `<li>
          Question ${key.replace('q', '')}: 
          Your answer: <strong>${userAnswer || 'None'}</strong> - 
          <span style="color:${isCorrect ? 'green' : 'red'}">
            ${isCorrect ? 'Correct' : 'Incorrect'}
          </span> 
          (Time: ${time} ms)
        </li>`
      );
    }
  
    document.getElementById('testForm').style.display = 'none';
    document.getElementById('results').innerHTML = `
      <h2>Results</h2>
      <p><strong>Score:</strong> ${score} / ${total}</p>
      <ul>${resultLines.join('')}</ul>
    `;
  }
  