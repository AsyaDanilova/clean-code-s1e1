// Document is the DOM and can be accessed in the console with document.window.
// Tree is from the top: html, body, p, etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.getElementsByClassName("todo__add-button")[0]; // first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New task list item
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    listItem.className = "todo__item";

    // input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    checkBox.type = "checkbox";
    checkBox.className = "todo__checkbox";

    // label
    var label = document.createElement("label");
    label.innerText = taskString;
    label.className = "todo__task-label";

    // input (text)
    var editInput = document.createElement("input"); // text
    editInput.type = "text";
    editInput.className = "todo__task-input";

    // button.edit
    var editButton = document.createElement("button"); // edit button
    editButton.innerText = "Edit";
    editButton.className = "todo__edit-button";

    // button.delete
    var deleteButton = document.createElement("button"); // delete button
    deleteButton.className = "todo__delete-button";

    // delete button image
    var deleteButtonImg = document.createElement("img"); // delete button image
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "todo__delete-icon";
    deleteButton.appendChild(deleteButtonImg);

    // append elements
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function () {
    console.log("Add Task...");
    // Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    // Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

// Edit an existing task
var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".todo__edit-button");
    var containsClass = listItem.classList.contains("todo__item--edit-mode");

    // If class of the parent is .todo__item--edit-mode
    if (containsClass) {
        // switch to .todo__item--edit-mode
        // label becomes the inputs value
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    // toggle .todo__item--edit-mode on the parent
    listItem.classList.toggle("todo__item--edit-mode");
}

// Delete task
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // Remove the parent list item from the ul
    ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");

    // Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    // var label = listItem.querySelector(".todo__item");
    listItem.classList.remove("todo__item--original-mode");
    listItem.classList.remove("todo__item--edit-mode");
    listItem.classList.add("todo__item--completed");
    var editBtn = listItem.querySelector(".todo__edit-button");
    editBtn.innerText = "Edit";

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark task incomplete
var taskIncomplete = function () {
    console.log("Incomplete Task...");
    // When the checkbox is unchecked
    // Remove the completed class from the label
    var listItem = this.parentNode;
    // var label = listItem.querySelector(".todo__task-label");
    // label.classList.remove("todo__task-label--completed");
    listItem.classList.remove("todo__item--completed");

    // Append the task list item to the #incomplete-tasks
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
    console.log("AJAX Request");
}

// The glue to hold it all together

// Set the click handler to the addTask function
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    // select ListItems children

    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".todo__edit-button");
    var deleteButton = taskListItem.querySelector(".todo__delete-button");

    // Bind editTask to edit button
    editButton.onclick = editTask;
    // Bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    // Bind taskCompleted to checkBoxEventHandler
    checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
// for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    // bind events to list items children (tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    // bind events to list items children (tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

// Prevent creation of empty tasks

// Change edit to save when you are in edit mode