document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render tasks based on filter
  const renderTasks = (filter = "all") => {
    taskList.innerHTML = "";
    tasks
      .filter((task) => filter === "all" || task.category === filter)
      .forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <span>${task.text}</span>
          <span class="timestamp">${task.timestamp}</span>
          <button class="mark-complete">${task.completed ? "❌" : "✔️"}</button>
          <button class="delete-task">🗑️</button>
        `;
        taskList.appendChild(li);

        // Mark task as completed
        li.querySelector(".mark-complete").addEventListener("click", () => {
          task.completed = !task.completed;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderTasks();
        });

        // Delete task
        li.querySelector(".delete-task").addEventListener("click", () => {
          tasks.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderTasks();
        });
      });
  };

  // Handle task input and creation
  addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;

    const task = {
      text: taskInput.value,
      category: "work", // Default category, can be added to task form
      timestamp: new Date().toLocaleString(),
      completed: false,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  });

  // Filter tasks by category
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderTasks(button.dataset.category);
    });
  });

  // Toggle theme
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });

  // Initialize the app
  renderTasks();
});
