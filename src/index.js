document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.querySelector('#create-task-form');
  const taskList = document.querySelector('#tasks');
  const sortBtn = document.querySelector('#sort-tasks');
  const clearBtn = document.querySelector('#clear-tasks');

  let sortAscending = true;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const desc = document.querySelector('#new-task-description').value.trim();
    const user = document.querySelector('#task-user').value.trim();
    const duration = document.querySelector('#task-duration').value.trim();
    const dueDate = document.querySelector('#task-due-date').value;
    const priority = document.querySelector('#task-priority').value;

    if (!desc) return;

    const li = document.createElement('li');
    li.className = `task-item ${priority}`;
    li.dataset.priority = priority;

    const taskText = `${desc}`;
    const meta = ` [User: ${user || 'N/A'} | Duration: ${duration || 'N/A'} | Due: ${dueDate || 'N/A'}]`;

    li.innerHTML = `
      <span class="task-desc">${taskText}</span>
      <span class="task-meta">${meta}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
    form.reset();
  });

  // Delete functionality
  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.closest('li').remove();
    }

    // Edit functionality
    if (e.target.classList.contains('edit-btn')) {
      const li = e.target.closest('li');
      const desc = li.querySelector('.task-desc').textContent;
      const newDesc = prompt('Edit task description:', desc);
      if (newDesc !== null) {
        li.querySelector('.task-desc').textContent = newDesc.trim();
      }
    }
  });

  // Sort by priority (ascending/descending)
  sortBtn.addEventListener('click', () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };

    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const aPriority = priorityOrder[a.dataset.priority];
      const bPriority = priorityOrder[b.dataset.priority];
      return sortAscending ? aPriority - bPriority : bPriority - aPriority;
    });

    // Clear and re-append
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));

    sortAscending = !sortAscending;
  });

  // Clear all tasks
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) {
      taskList.innerHTML = '';
    }
  });
});