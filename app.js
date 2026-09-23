// Task Management App

// Array that stores all task objects
let tasks = [];

// Get elements from the page
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const statusInput = document.getElementById("status");
const taskList = document.getElementById("taskList");

// Function to check for overdue tasks
function checkOverdueTasks() {

    const today = new Date();

    // Set time to midnight so we compare dates only
    today.setHours(0, 0, 0, 0);

    tasks.forEach(function (task) {

        const deadlineDate = new Date(task.deadline + "T00:00:00");

        if (
            deadlineDate < today &&
            task.status !== "Completed"
        ) {
            task.status = "Overdue";
        }
    });
}

// Function to display tasks on the page
function displayTasks() {

    checkOverdueTasks();

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty-message">No tasks added yet.</p>';

        return;
    }

    tasks.forEach(function (task, index) {

        const taskItem = document.createElement("div");

        taskItem.classList.add("task-item");

        taskItem.innerHTML = `
            <h3>${task.name}</h3>

            <div class="task-details">
                <p><strong>Category:</strong> ${task.category}</p>
                <p><strong>Deadline:</strong> ${task.deadline}</p>
                <p><strong>Status:</strong> ${task.status}</p>
            </div>

            <div class="task-status-control">

                <label for="status-${index}">
                    Update Status
                </label>

                <select
                    id="status-${index}"
                    class="task-status-select"
                    data-index="${index}"
                >

                    <option
                        value="In Progress"
                        ${task.status === "In Progress" ? "selected" : ""}
                    >
                        In Progress
                    </option>

                    <option
                        value="Completed"
                        ${task.status === "Completed" ? "selected" : ""}
                    >
                        Completed
                    </option>

                    <option
                        value="Overdue"
                        ${task.status === "Overdue" ? "selected" : ""}
                    >
                        Overdue
                    </option>

                </select>

            </div>
        `;

        taskList.appendChild(taskItem);
    });

    addStatusListeners();
}

// Function to add event listeners to status dropdowns
function addStatusListeners() {

    const statusSelects =
        document.querySelectorAll(".task-status-select");

    statusSelects.forEach(function (select) {

        select.addEventListener("change", function () {

            const taskIndex = select.dataset.index;

            const newStatus = select.value;

            tasks[taskIndex].status = newStatus;

            console.log(tasks);

            displayTasks();
        });
    });
}

// Listen for form submission
taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Create a new task object
    const newTask = {
        name: taskNameInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    };

    // Add task object to array
    tasks.push(newTask);

    console.log(tasks);

    // Display updated list
    displayTasks();

    // Clear the form
    taskForm.reset();
});