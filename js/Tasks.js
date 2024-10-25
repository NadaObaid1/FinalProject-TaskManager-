document.addEventListener('DOMContentLoaded', function () {
    const tasksTable = document.getElementById('task-list');
    const tableBody = document.querySelector('#task-list tbody');

    if (tasksTable && tableBody) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const renderTasks = () => {
            tableBody.innerHTML = ''; 
            tasks.forEach((task, index) => {
                const newRow = document.createElement('tr');
                newRow.className = 'task-item';

                const nameCell = document.createElement('td');
                nameCell.className = 'task-name';
                nameCell.textContent = task.name;
                newRow.appendChild(nameCell);

                const dateCell = document.createElement('td');
                dateCell.className = 'task-deadline';
                dateCell.textContent = `${task.date} ${task.time}`;
                newRow.appendChild(dateCell);

                const statusCell = document.createElement('td');
                statusCell.className = 'task-status';
                statusCell.textContent = task.status;
                newRow.appendChild(statusCell);

                const actionCell = document.createElement('td');
                actionCell.className = 'task-actions';

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.className = 'edit-task';
                actionCell.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-task';
                deleteBtn.addEventListener('click', () => deleteTask(index));
                actionCell.appendChild(deleteBtn);

                const toggleBtn = document.createElement('button');
                toggleBtn.textContent = 'Toggle Status';
                toggleBtn.className = 'toggle-task';
                toggleBtn.addEventListener('click', () => toggleTaskStatus(index));
                actionCell.appendChild(toggleBtn);

                newRow.appendChild(actionCell);

                // حساب وعرض الوقت المتبقي
                const timeLeftCell = document.createElement('td');
                const taskDateTime = new Date(`${task.date}T${task.time}`);
                const now = new Date();
                const timeDiff = taskDateTime - now;

                if (timeDiff > 0) {
                    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    timeLeftCell.textContent = `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
                } else {
                    timeLeftCell.textContent = 'Overdue';
                    newRow.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // لون أحمر فاتح بشفافية

                }
                
                newRow.appendChild(timeLeftCell);
                tableBody.appendChild(newRow);

            });
        };

        const deleteTask = (index) => {
            tasks.splice(index, 1); 
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); 
        };

        const toggleTaskStatus = (index) => {
            tasks[index].status = tasks[index].status === 'Pending' ? 'Completed' : 'Pending'; 
            localStorage.setItem('tasks', JSON.stringify(tasks)); 
            renderTasks(); 
        };

        renderTasks();
    } else {
        console.error("Task table or table body not found");
    }
});
