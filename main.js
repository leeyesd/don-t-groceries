function promptAddTask(quadrantId) {
  const taskText = prompt("새로운 작업을 입력하세요:");
  
  if (taskText === null || taskText.trim() === "") {
    return;
  }

  const taskItem = createTaskElement(taskText.trim());
  const targetQuadrant = document.getElementById(quadrantId).querySelector('.task-list');
  targetQuadrant.appendChild(taskItem);
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
  const quadrant = ev.target.closest('.quadrant');
  if (quadrant) {
    const target = quadrant.querySelector('.task-list');
    target.appendChild(taskElement);
  }
}
