//let currentUser = null;
let tasks = [];
let currentUser = {
  username: "",
  profilePicture: null,

};

function loadContent() {

  console.log('Content loaded!');
}

function addTask() {
  const taskName = document.getElementById('task-name').value;
  const taskDescription = document.getElementById('task-description').value;
  const taskCategory = document.getElementById('task-category').value;
  const taskDueDate = document.getElementById('task-due-date').value;
  const taskReminder = document.getElementById('task-reminder').value;

  // Validate that a task name is provided
  if (!taskName) {
    alert('Please enter a task name.');
    return;
  }

  const newTask = {
    name: taskName,
    description: taskDescription,
    category: taskCategory,
    dueDate: taskDueDate,
    reminder: taskReminder, // New property for task reminder
    completed: false,
  };

  // Set up a reminder if a due date is provided
  if (taskDueDate) {
    scheduleReminder(newTask);
  }

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Update the tasks list on the page
  updateTasksList();
}


function updateProfile() {
  const newUsername = document.getElementById('profile-username').value;

  // Update the current user's username
  currentUser.username = newUsername;

  // Display the updated username on the page
  document.getElementById('user-username').innerText = currentUser.username;



  alert('Profile updated successfully!');
}

function previewProfilePicture() {
  const fileInput = document.getElementById('profile-picture');
  const previewImage = document.getElementById('profile-picture-preview-image');

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      previewImage.src = reader.result;
    };
    reader.readAsDataURL(file);

    // Update the current user's profile picture
    currentUser.profilePicture = file;
  } else {
    // Clear the preview if no file is selected
    previewImage.src = '';
    currentUser.profilePicture = null;
  }
}

function initUserProfile() {
  // Display the current username on the page
  document.getElementById('user-username').innerText = currentUser.username;

  // Display the current profile picture on the page
  const previewImage = document.getElementById('profile-picture-preview-image');
  if (currentUser.profilePicture) {
    previewImage.src = URL.createObjectURL(currentUser.profilePicture);
  }
}

// Load content on initial page load
window.addEventListener('load', loadContent);

initUserProfile();


function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

 
  if (username && password) {
    currentUser = {
      username,
      // Other user data...
    };
    document.getElementById('user-username').innerText = currentUser.username;
    showTasks();
  } else {
    document.getElementById('login-error').innerText = 'Invalid credentials';
  }
}

function showTasks() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('tasks-container').classList.remove('hidden');
  updateTasksList();
}

function addTask() {
  const taskName = document.getElementById('task-name').value;
  const taskCategory = document.getElementById('task-category').value;
  const taskDueDate = document.getElementById('task-due-date').value;

  if (taskName && taskCategory && taskDueDate) {
    const newTask = {
      name: taskName,
      category: taskCategory,
      dueDate: taskDueDate,
      completed: false,
    };

    tasks.push(newTask);
    updateTasksList();
  }
}

function updateTasksList() {
  const tasksListContainer = document.getElementById('tasks-list');
  tasksListContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <span>${task.name} - ${task.category} - Due: ${task.dueDate}</span>
      <button onclick="completeTask(${index})">Complete</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    tasksListContainer.appendChild(taskElement);
  });
}

function completeTask(index) {
  tasks[index].completed = true;
  updateTasksList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasksList();
}
// Add a new property 'completed' to the task object

// Function to mark a task as completed
function completeTask(index) {
  tasks[index].completed = true;
  updateTasksList();

  // Check if the task has a reminder and if it's in the future
  if (tasks[index].reminder && new Date(tasks[index].reminder) > new Date()) {
    scheduleReminder(tasks[index]);
  }

  // Send the completed task to the user's email
  sendCompletedTaskByEmail(tasks[index]);
}
const notifier = require('node-notifier');

function addTask() {
  const taskName = document.getElementById('task-name').value;
  const taskDescription = document.getElementById('task-description').value;
  const taskCategory = document.getElementById('task-category').value;
  const taskDueDate = document.getElementById('task-due-date').value;

  // Validate that a task name is provided
  if (!taskName) {
    alert('Please enter a task name.');
    return;
  }

  const newTask = {
    name: taskName,
    description: taskDescription,
    category: taskCategory,
    dueDate: taskDueDate,
    completed: false,
  };

  // Set up a reminder if a due date is provided
  if (taskDueDate) {
    scheduleReminder(newTask);
  }



  tasks.push(newTask);
  updateTasksList();
}

function scheduleReminder(task) {
  const now = new Date();
  const dueDate = new Date(task.dueDate);

  // Check if the due date is in the future
  if (dueDate > now) {
    const timeDifference = dueDate - now;

    // Use setTimeout to trigger the reminder
    task.reminder = setTimeout(() => {
      showReminder(task);
    }, timeDifference);
  }
}


 function showReminder(task) {
    if (Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: `${task.name} - ${task.category} is due now!`,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Task Reminder', {
            body: `${task.name} - ${task.category} is due now!`,
          });
        }
      });
    }
  }


// Function to send completed task to the user's email
function sendCompletedTaskByEmail(task) {

  const subject = `Task Completed: ${task.name}`;
  const body = `Congratulations! You have completed the task:\n\nName: ${task.name}\nCategory: ${task.category}\nDue Date: ${task.dueDate}`;
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Open the user's default email client
  window.location.href = mailtoLink;
}
function updateTasksList() {
  const tasksListContainer = document.getElementById('tasks-list');
  tasksListContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    taskElement.innerHTML = `
      <span>${task.name} - ${task.category} - Due: ${task.dueDate}</span>
      <button onclick="completeTask(${index})" ${task.completed ? 'disabled' : ''}>Complete</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    tasksListContainer.appendChild(taskElement);
  });
}


