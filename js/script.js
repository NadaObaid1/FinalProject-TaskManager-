flatpickr("#task-date", {
    dateFormat: "Y-m-d" //  Date Format
});

const addTaskBtn = document.getElementById('add-task-btn');

addTaskBtn.addEventListener('click', function() {
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const tasksTable = document.getElementById('task-list');
    const tableBody = document.querySelector('#task-list tbody');
    if (taskName === '' || taskDate === '') {
        alert('Task Name and Date are required!');
        return;
    }
    const newRow = document.createElement('tr');
    newRow.className = 'task-item';
    tableBody.appendChild(newRow);
    const nameCell = document.createElement('td');
    nameCell.className = 'task-name';
    nameCell.textContent = taskName;
    newRow.appendChild(nameCell);
    const dateCell = document.createElement('td');
    dateCell.className = 'task-deadline';
    dateCell.textContent = taskDate;
    newRow.appendChild(dateCell);
    const status = document.createElement('td');
    status.className = 'task-status';
    newRow.appendChild(status);
    const actionCell = document.createElement('td');
    actionCell.className = 'task-actions';
    newRow.appendChild(actionCell);
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-task';
    actionCell.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-task';
    actionCell.appendChild(deleteBtn);
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Status';
    toggleBtn.className = 'toggle-task';
    actionCell.appendChild(toggleBtn);
    tasksTable.appendChild(tableBody);
});