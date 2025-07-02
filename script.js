const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add a new task
function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  const span = document.createElement("span");
  span.innerHTML = "\u00d7"; // × symbol for delete
  li.appendChild(span);

  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();
}

// Handle clicks on task items (complete/delete)
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

// Save tasks to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from localStorage on page load
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();

// Download tasks as plain text file
function downloadTasks() {
  const tasks = document.querySelectorAll("#list-container li");

  if (tasks.length === 0) {
    alert("No tasks to export!");
    return;
  }

  let content = "";
  tasks.forEach(task => {
    const taskText = task.textContent.replace("×", "").trim();
    const status = task.classList.contains("checked") ? "[✔] " : "[ ] ";
    content += status + taskText + "\n";
  });

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "my-todo-list.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}

// Toggle light/dark theme
function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

// Optional: Add task on pressing Enter key
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
