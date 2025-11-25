// alert("helo");
// console.log("hy");
// Grab elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task));
};

// Add task on button click
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    saveTasks();
    taskInput.value = ""; // clear input
  }
});

// Function to create a task item
function addTask(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li span").forEach(span => {
    tasks.push(span.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}