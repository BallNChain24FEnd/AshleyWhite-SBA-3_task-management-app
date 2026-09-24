// Task Management App

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkOverdue() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach(task => {
        const deadline = new Date(task.deadline + "T00:00:00");

        if (deadline < today && task.status !== "Completed") {
            task.status = "Overdue";
        }
    });

    saveTasks();
}

function displayTasks() {
    checkOverdue();

    const filteredTasks = tasks.filter(task =>
        (statusFilter.value === "All" || task.status === statusFilter.value) &&
        (categoryFilter.value === "All" || task.category === categoryFilter.value)
    );

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty-message">No matching tasks found.</p>';
        return;
    }

    filteredTasks.forEach(task => {
        const index = tasks.indexOf(task);

        taskList.innerHTML += `
            <div class="task-item">
                <h3>${task.name}</h3>

                <div class="task-details">
                    <p><strong>Category:</strong> ${task.category}</p>
                    <p><strong>Deadline:</strong> ${task.deadline}</p>
                    <p><strong>Status:</strong> ${task.status}</p>
                </div>

                <div class="task-status-control">
                    <label for="status-${index}">Update Status</label>

                    <select
                        id="status-${index}"
                        class="task-status-select"
                        data-index="${index}"
                    >
                        <option value="In Progress"
                            ${task.status === "In Progress" ? "selected" : ""}>
                            In Progress
                        </option>

                        <option value="Completed"
                            ${task.status === "Completed" ? "selected" : ""}>
                            Completed
                        </option>

                        <option value="Overdue"
                            ${task.status === "Overdue" ? "selected" : ""}>
                            Overdue
                        </option>
                    </select>
                </div>
            </div>
        `;
    });
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    tasks.push({
        name: document.getElementById("taskName").value,
        category: document.getElementById("category").value,
        deadline: document.getElementById("deadline").value,
        status: document.getElementById("status").value
    });

    saveTasks();
    displayTasks();
    taskForm.reset();
});

taskList.addEventListener("change", event => {
    if (event.target.classList.contains("task-status-select")) {
        tasks[event.target.dataset.index].status = event.target.value;

        saveTasks();
        displayTasks();
    }
});

statusFilter.addEventListener("change", displayTasks);
categoryFilter.addEventListener("change", displayTasks);

displayTasks();