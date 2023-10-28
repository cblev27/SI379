// Define the cache duration in milliseconds (e.g., 1 hour)
const cacheDuration = 1000 * 60 * 60;

const apiUrl = 'https://the-trivia-api.com/v2/questions';
const container = document.querySelector('.container');
const questionText = document.getElementById('question');
const answersList = document.getElementById('answers');
const feedbackText = document.getElementById('feedback');
const scoreText = document.getElementById('score');
const nextButton = document.getElementById('next-button');
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Function to fetch data
function fetchWithCache(url, options = {}, cacheDuration = 1000 * 60 * 60) {
    // Utility function to create a Response object from data (like fetch() would)
    function getResponseObject(data) {
        return new Response(new Blob([JSON.stringify(data)]));
    }

    const cachedData = localStorage.getItem(url);

    if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);

        if (Date.now() - timestamp < cacheDuration) {
            return Promise.resolve(getResponseObject(data));
        } else {
            localStorage.removeItem(url);
        }
    }

    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem(url, JSON.stringify({
                timestamp: Date.now(),
                data
            }));
            return getResponseObject(data);
        });
}

// Function to shuffle an array
function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Function to load and display a new question
// Function to load and display a new question
function loadQuestion() {
    stopTimer(); // Stop the previous timer if there was one

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        console.log('Current Question:', currentQuestion);
        questionText.textContent = currentQuestion.question.text; // Access the question property

        answersList.innerHTML = '';
        const allAnswers = [currentQuestion.correct, ...currentQuestion.incorrectAnswers];
        const shuffledAnswers = shuffleArray(allAnswers);

        shuffledAnswers.forEach(answer => {
            const li = document.createElement('li');
            li.textContent = answer;
            li.addEventListener('click', () => checkAnswer(answer));
            answersList.appendChild(li);
        });

        feedbackText.textContent = '';

        startTimer(30, () => {
            // Handle when the timer for the question expires
            // For example, mark the question as incorrect and move to the next question
            checkAnswer('Time is up');
        });
    } else {
        // Display the final score or a message
        questionText.textContent = 'Quiz Completed';
        answersList.innerHTML = '';
        feedbackText.textContent = `Your final score is ${score} out of ${questions.length}`;
    }
}


// Function to check the selected answer
function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct) {
        feedbackText.textContent = 'Correct!';
        score++;
    } else {
        feedbackText.textContent = 'Incorrect. The correct answer is: ' + currentQuestion.correct;
    }
    currentQuestionIndex++;
    scoreText.textContent = score;
    nextButton.style.display = 'block';
}

// Function to fetch questions from the API with caching
// Function to fetch questions from the API with caching
function fetchQuestions() {
    // Use the fetchWithCache function to fetch and cache the data
    fetch(apiUrl, {}, cacheDuration)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch questions. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                questions = data.map(questionData => {
                    return {
                        question: questionData.question, // Access the question property
                        correct: questionData.correctAnswer, // Access the correctAnswer property
                        incorrectAnswers: questionData.incorrectAnswers // Access the incorrectAnswers property
                    };
                });
                loadQuestion();
            } else {
                throw new Error('API response does not contain valid questions data.');
            }
        })
        .catch(error => {
            console.error('Error fetching questions: ', error);
            feedbackText.textContent = 'Error loading questions. Please try again later.';
        });
}
const timerElement = document.getElementById('timer'); // Reference to the timer element
let countdown; // Variable to hold the countdown interval

// Function to start a timer for a specific duration (in seconds)
function startTimer(durationInSeconds, onTimeout) {
    let remainingTime = durationInSeconds;

    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    updateTimerDisplay();

    countdown = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(countdown);
            timerElement.textContent = ''; // Clear the timer display
            if (typeof onTimeout === 'function') {
                onTimeout();
            }
        } else {
            remainingTime--;
            updateTimerDisplay();
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(countdown);
}



nextButton.addEventListener('click', () => {
    nextButton.style.display = 'none';
    loadQuestion();
});

fetchQuestions();


