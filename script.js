/* SELECT HTML ELEMENTS */
//TASK FORM
console.log("Smart To-Do Javascript connected!");
/* DARK MODE / LIGHT MODE */
const themeToggle=document.getElementById("themeToggle");
//Apply selected theme
function setTheme(theme) {
    document.documentElement.dataset.theme=theme;
    themeToggle.textContent=theme==="dark" ? "☀️" : "🌙";
    //Save selected theme
    localStorage.setItem("smartTodoTheme", theme);
}
//Get previously saved theme
const savedTheme=localStorage.getItem("smartTodoTheme") || "dark";
//Apply saved theme when dashboard opens
setTheme(savedTheme);
//Toggle between themes
themeToggle.addEventListener("click", function() {
    const currentTheme=document.documentElement.dataset.theme;
    const newTheme=currentTheme==="dark" ? "light" : "dark";
    setTheme(newTheme);
});
const taskForm=document.getElementById("taskForm");
const taskTitle=document.getElementById("taskTitle");
const taskPriority=document.getElementById("taskPriority");
const taskDueDate=document.getElementById("taskDueDate");
const taskDescription = document.getElementById("taskDescription");
//TASK LIST
const taskList=document.getElementById("taskList");
const searchInput=document.getElementById("searchInput");
const filterButtons=document.querySelectorAll(".filter-btn");
let currentFilter="all";
//Statistics
const totalTasks=document.getElementById("totalTasks");
const pendingTasks=document.getElementById("pendingTasks");
const completedTasks=document.getElementById("completedTasks");
const highPriorityTasks=document.getElementById("highPriorityTasks");
/* TASK ARRAY */
//store all tasks
let tasks=JSON.parse(localStorage.getItem("smartTodoTasks")) || [];
/* SAVE TASKS TO LOCAL STORAGE */
function saveTasks() {
    localStorage.setItem("smartTodoTasks",JSON.stringify(tasks));
}
/* ADD TASK FUNCTIONALITY */
taskForm.addEventListener("submit", function(event){
    //prevents page refresh
    event.preventDefault();
    //get input values
    const title=taskTitle.value.trim();
    const priority=taskPriority.value;
    const dueDate=taskDueDate.value;
    const description = taskDescription.value.trim();
    //Create new task object
    const newTask= {
        id: Date.now(),
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        completed: false

    };
    //add task to array
    tasks.push(newTask);
    saveTasks();
    //Display task on dashboard
    renderTasks();
    //Display tasks in console
    console.log(tasks);
    //Clear form
    taskForm.reset();


});
/* SEARCH FUNCTIONALITY */
searchInput.addEventListener("input",function() {
    renderTasks();

});
/* FILTER FUNCTIONALITY */
filterButtons.forEach(function(button) {
    button.addEventListener("click",function() {
        //Get selected filter
        currentFilter=button.dataset.filter;
        console.log("Selected Filter:", currentFilter);
        //Remove active class from all buttons
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        //Add active class to selected button
        button.classList.add("active");
        //Refresh task List
        renderTasks();
    });
});
/* DISPLAY TASKS ON DASHBOARD */
function renderTasks() {

    // Clear task list
    taskList.innerHTML = "";

    // Get search text
    const searchText = searchInput.value.toLowerCase().trim();

    // Filter tasks
    const filteredTasks = tasks.filter(function(task) {

        // Search by task title
        const matchesSearch = task.title.toLowerCase().includes(searchText);

        // Check selected filter
        let matchesFilter = true;

        if (currentFilter === "pending") {
            matchesFilter = !task.completed;
        }
        else if (currentFilter === "completed") {
            matchesFilter = task.completed;
        }
        else if (currentFilter === "high") {
            matchesFilter = task.priority === "High";
        }

        return matchesSearch && matchesFilter;

    });

    // Display filtered tasks
    filteredTasks.forEach(function(task) {

        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        // Check whether the task is overdue
        // Check whether the task is overdue
const today = new Date();
today.setHours(0, 0, 0, 0);

const taskDueDateValue = task.dueDate
    ? new Date(task.dueDate + "T00:00:00")
    : null;

const isOverdue = taskDueDateValue !== null &&
                  taskDueDateValue < today &&
                  !task.completed;

// Apply overdue styling
if (isOverdue) {
    taskCard.classList.add("overdue-task");
}

        if (task.completed) {
            taskCard.classList.add("completed");
        }

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        const title = document.createElement("h3");
        title.classList.add("task-title");
        title.textContent = task.title;

        const details = document.createElement("div");
        details.classList.add("task-meta");

        const priority = document.createElement("span");
        priority.classList.add(
            "task-priority",
            "priority-" + task.priority.toLowerCase()
        );
        priority.textContent = task.priority;

        const dueDate = document.createElement("span");
        dueDate.textContent = "Due: " + task.dueDate;

        details.appendChild(priority);
        details.appendChild(dueDate);

        taskInfo.appendChild(title);
        // Display task description
if (task.description) {
    const descriptionElement = document.createElement("p");

    descriptionElement.textContent = task.description;
    descriptionElement.classList.add("task-description");

    taskInfo.appendChild(descriptionElement);
}
        taskInfo.appendChild(details);
        // Display overdue label
if (isOverdue) {
    const overdueLabel = document.createElement("p");

    overdueLabel.textContent = "⚠️ OVERDUE";

    overdueLabel.classList.add("overdue-label");

    taskInfo.appendChild(overdueLabel);
}

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Complete button
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("task-action-btn", "complete-btn");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.classList.add("task-action-btn", "edit-btn");
        editBtn.textContent = "Edit";

       editBtn.addEventListener("click", function() {

    // Update task title
    const updatedTitle = prompt(
        "Enter updated task title:",
        task.title
    );

    if (updatedTitle === null || updatedTitle.trim() === "") {
        return;
    }

    // Update task priority
    const updatedPriority = prompt(
        "Enter priority (Low, Medium, High):",
        task.priority
    );

    if (updatedPriority === null) {
        return;
    }

    // Validate priority
    const validPriorities = ["Low", "Medium", "High"];

    if (!validPriorities.includes(updatedPriority.trim().toLowerCase().replace(/^./, char => char.toUpperCase()))) {
        alert("Please enter Low, Medium, or High.");
        return;
    }

    // Update due date
    const updatedDueDate = prompt(
        "Enter due date (YYYY-MM-DD):",
        task.dueDate
    );

    if (updatedDueDate === null) {
        return;
    }

    // Update task details
    task.title = updatedTitle.trim();
    task.priority = updatedPriority.trim().toLowerCase().replace(/^./, char => char.toUpperCase());
    task.dueDate = updatedDueDate.trim();

    // Save updated task
    saveTasks();

    // Refresh dashboard
    renderTasks();

});

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("task-action-btn", "delete-btn");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
        tasks = tasks.filter(function(item) {
            return item.id !== task.id;
        });

        saveTasks();
        renderTasks();
    }

});

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        taskCard.appendChild(taskInfo);
        taskCard.appendChild(actions);

        taskList.appendChild(taskCard);

    });

    // Update statistics
    updateStatistics();
}

function updateStatistics() {
    //Calculate total tasks
    totalTasks.textContent=tasks.length;
    //Calculate completed tasks
    const completedCount=tasks.filter(function(task) {
        return task.completed==true;
    }).length;
    //Calculate pending tasks
    const pendingCount=tasks.length-completedCount;
    //Calculate high priority tasks
    const highPriorityCount =tasks.filter(function(task) {
        return task.priority=="High";
    }).length;
    //Display updated statistics
    completedTasks.textContent=completedCount;
    pendingTasks.textContent=pendingCount;
    highPriorityTasks.textContent=highPriorityCount;

}
//Load saved tasks when dashboard opens
renderTasks();