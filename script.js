/* SELECT HTML ELEMENTS */
//TASK FORM
console.log("Smart To-Do Javascript connected!");
const taskForm=document.getElementById("taskForm");
const taskTitle=document.getElementById("taskTitle");
const taskPriority=document.getElementById("taskPriority");
const taskDueDate=document.getElementById("taskDueDate");
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
let tasks=[];
/* ADD TASK FUNCTIONALITY */
taskForm.addEventListener("submit", function(event){
    //prevents page refresh
    event.preventDefault();
    //get input values
    const title=taskTitle.value.trim();
    const priority=taskPriority.value;
    const dueDate=taskDueDate.value;
    //Create new task object
    const newTask= {
        id: Date.now(),
        title: title,
        priority: priority,
        dueDate: dueDate,
        completed: false

    };
    //add task to array
    tasks.push(newTask);
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
        taskInfo.appendChild(details);

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Complete button
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("task-action-btn", "complete-btn");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.addEventListener("click", function() {
            task.completed = !task.completed;
            renderTasks();
        });

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.classList.add("task-action-btn", "edit-btn");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {
            const updatedTitle = prompt("Enter updated task title:", task.title);

            if (updatedTitle !== null && updatedTitle.trim() !== "") {
                task.title = updatedTitle.trim();
                renderTasks();
            }
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("task-action-btn", "delete-btn");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            renderTasks();
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