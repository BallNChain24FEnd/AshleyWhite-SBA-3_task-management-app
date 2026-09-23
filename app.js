// Task Management App

// Array that will store all task objects
let tasks = [];

// Get elements from the page
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const statusInput = document.getElementById("status");
const taskList = document.getElementById("taskList");

// Function to display tasks on the page
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="empty-message">No tasks added yet.</p>';
        return;
    }

    tasks.forEach(function (task) {

        const taskItem = document.createElement("div");

        taskItem.classList.add("task-item");

        taskItem.innerHTML = `
            <h3>${task.name}</h3>
            <p><strong>Category:</strong> ${task.category}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            <p><strong>Status:</strong> ${task.status}</p>
        `;

        taskList.appendChild(taskItem);
    });
}

// Listen for form submission
taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Create a task object
    const newTask = {
        name: taskNameInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    };

    // Add the object to the tasks array
    tasks.push(newTask);

    console.log(tasks);

    // Display the updated list
    displayTasks();

    // Clear the form
    taskForm.reset();
});