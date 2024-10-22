document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#task-date", {
        dateFormat: "Y-m-d"
    });

    const addTaskBtn = document.getElementById('add-task-btn');

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function (event) {
            event.preventDefault();

            const taskName = document.getElementById('task-name').value;
            const taskDate = document.getElementById('task-date').value;

            if (taskName === '' || taskDate === '') {
                alert('Task Name and Date are required!');
                return;
            }

            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ name: taskName, date: taskDate, status: 'Pending' });
            localStorage.setItem('tasks', JSON.stringify(tasks));

            alert('Task added successfully!');
            window.location.href = '../html/task.html'; 
        });
    } else {
        console.error("Add Task button not found");
    }
});
