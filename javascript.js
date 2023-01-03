
(function () {

    var category = [
        {
            "category-name": "My day",
            "icon": "<i class='fa-regular fa-sun'></i>"
        },

        {
            "category-name": "Important",
            "icon": "<i class='fa-regular fa-star'></i>"
        },

        {
            "category-name": "Planned",
            "icon": "<i class='fa-regular fa-calendar'></i>"
        },

        {
            "category-name": "Assigned to me",
            "icon": "<i class='fa-regular fa-user'></i>"
        },

        {
            "category-name": "Task",
            "icon": "<i class='fa-solid fa-house-user'></i>"
        }
    ];

    const userInputLeft = document.getElementById("new-list-item");
    const userListUnorder = document.getElementById("user-list-unorder");
    // const addTaskContainer = document.getElementById("add-task-container");
    const rightTaskInput = document.getElementById("right-task-input");
    const userTask = document.getElementById("user-task");

    function init() {
        currentDate();
        renderingCategory();
        newList();
        newTask();
    }

    function currentDate() {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        let day = weekdays[date.getDay()];
        let month = months[date.getMonth()];
        let currentDate = day + ", " + month + " " + date.getDate();
        document.getElementById('day').innerHTML = currentDate;
    }

    function renderingCategory() {
        for (i = 0; i < category.length; i++) {
            const li = document.createElement("li");
            const div = document.createElement("div");
            div.className = "user-list";
            div.innerHTML = category[i].icon;
            const p = document.createElement("p");
            p.className = "left-notes-title";
            const node = document.createTextNode(category[i]["category-name"]);
            p.innerHTML = node.textContent;
            div.appendChild(p);
            li.appendChild(div);
            userListUnorder.appendChild(li);
        }
        userListUnorder.appendChild(document.createElement('hr'));
    }

    function newList() {
        userInputLeft.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                const li = document.createElement('li');
                const div = document.createElement('div');
                div.className = 'user-list';
                div.innerHTML = '<i class="fa-solid fa-list"/>';
                const p = document.createElement('p');
                p.className = 'left-notes-title';
                const node = document.createTextNode(userInputLeft.value);
                p.innerHTML = node.textContent;
                div.appendChild(p);
                li.appendChild(div);
                userListUnorder.appendChild(li);
            }
        });
    }

    function newTask() {
        rightTaskInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                const addTaskInputContainer = document.createElement('div');
                addTaskInputContainer.className = "add-task-input-container";
                const radioButton = document.createElement('div');
                radioButton.className = 'task-radio';
                radioButton.innerHTML = '<i class="fa-regular fa-circle"></i>';
                addTaskInputContainer.appendChild(radioButton);
                const taskInput = document.createElement('div');
                taskInput.className = "task-input-container";
                userTask.appendChild(addTaskInputContainer);
            }
        });
    }
    init();
})();



