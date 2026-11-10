/* SELECT HTML ELEMENTS */
//TASK FORM
console.log("Smart To-Do Javascript connected!");
const taskForm=document.getElementById("taskForm");
const taskTitle=document.getElementById("taskTitle");
const taskPriority=document.getElementById("taskPriority");
const taskDueDate=document.getElementById("taskDueDate");
//TASK LIST
const taskList=document.getElementById("taskList");
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
/* DISPLAY TASKS ON DASHBOARD */
function renderTasks() {
    //Clear the task List
    taskList.innerHTML="";
    //Display every task
    tasks.forEach(function(task) {
        //create a task card
        const taskCard=document.createElement("div");
        taskCard.classList.add("task-card");
        //create a task title
        const title=document.createElement("h3");
        title.classList.add("task-title");
        title.textContent=task.title;
        //create tasjk details
        const details=document.createElement("p");
        details.textContent="Priority: " + task.priority + " | Due Date: " + task.dueDate;
        //add title and details to card
        taskCard.appendChild(title);
        taskCard.appendChild(details);
        //Add card to dashboard
        taskList.appendChild(taskCard);

    });
}