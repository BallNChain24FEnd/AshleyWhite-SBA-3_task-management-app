// Task Management App

console.log("Task Management App loaded successfully.");

// Get the task form
const taskForm = document.getElementById("taskForm");

// Listen for the form submission
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Add Task button clicked.");
});