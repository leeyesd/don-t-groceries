function addTask() {
  const taskInput = document.getElementById('taskInput');
  const quadrantSelect = document.getElementById('quadrantSelect');
  const taskText = taskInput.value.trim();
  const quadrantId = quadrantSelect.value;

  if (taskText === "") {
    alert("작업 내용을 입력하세요.");
    return;
  }

  const taskItem = createTaskElement(taskText);
  const targetQuadrant = document.getElementById(quadrantId).querySelector('.task-list');
  targetQuadrant.appendChild(taskItem);

  taskInput.value = "";
}

function createTaskElement(text) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.draggable = true;
  li.id = 'task-' + Date.now();
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn" onclick="deleteTask(event)">삭제</button>
  `;
  
  li.addEventListener('dragstart', drag);
  return li;
}

function deleteTask(event) {
  const taskItem = event.target.closest('.task-item');
  taskItem.remove();
}

// Drag and Drop Logic
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const taskElement = document.getElementById(data);
  
  // Find the closest task-list or quadrant
  const target = ev.target.closest('.quadrant').querySelector('.task-list');
  target.appendChild(taskElement);
}

// Allow adding task with Enter key
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
