document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const categoryButtons = document.querySelectorAll(".category-btn");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const renderTasks = (filter = "all") => {
      taskList.innerHTML = "";
      tasks
        .filter((task) => filter === "all" || task.category === filter)
        .forEach((task, index) => {
          const li = document.createElement("li");
          li.className = "task-item";
          li.innerHTML = `
            <span>${task.text}</span>
            <span class="timestamp">${task.timestamp}</span>
            <button onclick="toggleComplete(${index})">✔️</button>
            <button onclick="deleteTask(${index})">❌</button>
          `;
          taskList.appendChild(li);
        });
    };
  
    const saveTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    addTaskBtn.addEventListener("click", () => {
      if (!taskInput.value) return;
      const timestamp = new Date().toLocaleString();
      tasks.push({ text: taskInput.value, timestamp, category: "all" });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    });
  
    categoryButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
        renderTasks(btn.dataset.category);
      })
    );
  
    window.toggleComplete = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    renderTasks();
  });
  