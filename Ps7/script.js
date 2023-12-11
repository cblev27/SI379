document.addEventListener('DOMContentLoaded', function () {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let selectedTaskIndex = null;
    let workDuration = 25;
    let breakDuration = 5;
    let timerInterval;
    let sessionInProgress = false;
    // let secondsLeft = 0;


    function updateTaskList() {
        const taskListElement = document.getElementById('taskList');
        taskListElement.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="editable" contenteditable="true" onblur="updateTaskName(${index}, this)">${task.name}</span> - 
                <span class="editable" onclick="editTaskDescription(${index})">${task.description}</span> 
                (${task.workSessions} sessions)
                <button class="removeButton" data-index="${index}">Remove</button>
                <button class="selectButton" data-index="${index}">Select</button>
            `;
            taskListElement.appendChild(li);
        });
    }

    function addTask() {
        const taskNameInput = document.getElementById('taskName');
        const taskDescriptionInput = document.getElementById('taskDescription');
        const taskName = taskNameInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
    
        if (taskName !== '') {
            tasks.push({ name: taskName, description: taskDescription, workSessions: 0 });
            updateTaskList();
            taskNameInput.value = '';
            taskDescriptionInput.value = '';
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    
    

    function removeTask(index) {
        tasks.splice(index, 1);
        updateTaskList();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskName(index, element) {
        tasks[index].name = element.textContent.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function editTaskDescription(index) {
        const newDescription = prompt('Enter a new description for the task:', tasks[index].description);

        if (newDescription !== null) {
            tasks[index].description = newDescription.trim();
            updateTaskList();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    function selectTask(index) {
        selectedTaskIndex = index;
        secondsLeft = 0; // Reset remaining seconds when selecting a task
    }

    function startSession() {
        if (selectedTaskIndex === null) {
            alert('Please select a task before starting a session.');
            return;
        }

        const timerElement = document.getElementById('timerDisplay');
        const sessionStatusLabel = document.getElementById('sessionStatus');
        const workDurationInput = document.getElementById('workDuration');

        workDuration = parseInt(workDurationInput.value, 10) || 25;

        if (!sessionInProgress) {
            if (secondsLeft === 0) {
                // Only reset timer if it's a new session
                timerElement.textContent = formatTime(workDuration * 60);
                sessionStatusLabel.textContent = 'Work Session';
                secondsLeft = workDuration * 60; // Reset secondsLeft for a new session
            }

            timerInterval = setInterval(() => {
                timerElement.textContent = formatTime(secondsLeft);
                if (secondsLeft === 0) {
                    clearInterval(timerInterval);
                    startBreak();
                }
                secondsLeft--;
            }, 1000);

            sessionInProgress = true;
        }
    }

   

    function startSession() {
        if (selectedTaskIndex === null) {
            alert('Please select a task before starting a session.');
            return;
        }

        const timerElement = document.getElementById('timerDisplay');
        const sessionStatusLabel = document.getElementById('sessionStatus');
        const workDurationInput = document.getElementById('workDuration');

        workDuration = parseInt(workDurationInput.value, 10) || 25;

        if (!sessionInProgress) {
            if (secondsLeft === 0) {
                // Only reset timer if it's a new session
                timerElement.textContent = formatTime(workDuration * 60);
                sessionStatusLabel.textContent = 'Work Session';
                secondsLeft = workDuration * 60; // Reset secondsLeft for a new session
            }

            timerInterval = setInterval(() => {
                timerElement.textContent = formatTime(secondsLeft);
                if (secondsLeft === 0) {
                    clearInterval(timerInterval);
                    startBreak();
                }
                secondsLeft--;
            }, 1000);

            sessionInProgress = true;
        }
    }

    function startBreak() {
        const timerElement = document.getElementById('timerDisplay');
        const sessionStatusLabel = document.getElementById('sessionStatus');
    
        timerElement.textContent = formatTime(breakDuration * 60);
        sessionStatusLabel.textContent = 'Take a break';
    
        tasks[selectedTaskIndex].workSessions += 1;
        updateTaskList();
        addLemonIcon();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    
        selectedTaskIndex = null;
        sessionInProgress = false; // Reset sessionInProgress
    
        // Play the tone when the work session is done
        playTone();
    
        let secondsLeft = breakDuration * 60;
        timerInterval = setInterval(() => {
            timerElement.textContent = formatTime(secondsLeft);
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
                startSession();
            }
            secondsLeft--;
        }, 1000);
    }
    
    function playTone() {
       
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
    }
    
    function stopSession() {
        clearInterval(timerInterval);
        sessionInProgress = false;
    }

    function stopSession() {
        clearInterval(timerInterval);
        sessionInProgress = false; // Reset sessionInProgress
        selectedTaskIndex = null;
    }

    function addLemonIcon() {
        const lemonIcon = document.createElement('i');
        lemonIcon.className = 'fas fa-lemon';
        lemonIcon.style.color = '#fff824';

        const lemonIconContainer = document.getElementById('lemonIcons');
        if (lemonIconContainer) {
            lemonIconContainer.appendChild(lemonIcon);
        } else {
            console.error('Error: Lemon icon container not found.');
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    document.getElementById('addTaskButton').addEventListener('click', addTask);
    document.getElementById('startButton').addEventListener('click', startSession);
    document.getElementById('stopButton').addEventListener('click', stopSession);

    // Additional event listeners for other buttons
    document.getElementById('taskList').addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const index = target.getAttribute('data-index');
            if (target.classList.contains('removeButton')) {
                removeTask(index);
            } else if (target.classList.contains('selectButton')) {
                selectTask(index);
            }
        }
    });

    
    updateTaskList();

});
