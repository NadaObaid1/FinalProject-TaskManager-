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
                editBtn.addEventListener('click', () => editTask(index));

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

                // Calculation of time left
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
                    timeLeftCell.textContent = 'No Time Left';
                    statusCell.textContent = 'Overdue';
                    newRow.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Light red color with opacity
                    editBtn.style.cursor = 'not-allowed';
                    toggleBtn.style.cursor = 'not-allowed';
                }
                if(tasks[index].status === 'Completed') {
                    newRow.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; // Light green color with opacity
                    timeLeftCell.innerHTML = `Task is Completed`;
                    editBtn.style.cursor = 'not-allowed';
                    nameCell.innerHTML = `<del>${task.name}</del>`;
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

        const editTask = (index) => {
            const whatToEdit = prompt('What you want to edit?');
            if(whatToEdit.includes('Name') || whatToEdit.includes('name')) {
                tasks[index].name = prompt('Enter new name:', tasks[index].name);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            }
            else if(whatToEdit.includes('Date') || whatToEdit.includes('date')) {
                tasks[index].date = prompt('Enter new date:', tasks[index].date);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            }
            else {
                alert('Invalid input! Please enter "Name" or "Date" to edit.');
            }
        };

        renderTasks();
    } else {
        console.error("Task table or table body not found");
    }
});
