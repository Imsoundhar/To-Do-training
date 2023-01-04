
(function () {

    var category = [
        {
            "id": 1,
            "category-name": "My day",
            "icon": "<i class='fa-regular fa-sun'></i>"
        },

        {
            "id": 2,
            "category-name": "Important",
            "icon": "<i class='fa-regular fa-star'></i>"
        },

        {
            "id": 3,
            "category-name": "Planned",
            "icon": "<i class='fa-regular fa-calendar'></i>"
        },

        {
            "id": 4,
            "category-name": "Assigned to me",
            "icon": "<i class='fa-regular fa-user'></i>"
        },

        {
            "id": 5,
            "category-name": "Task",
            "icon": "<i class='fa-solid fa-house-user'></i>"
        }
    ];

    const userInputLeft = document.getElementById("new-list-item");
    const userListUnorder = document.getElementById("user-list-unorder");
    const rightTaskInput = document.getElementById("right-task-input");
    const userTaskUl = document.getElementById("user-task-ul");
    const taskInfo = document.getElementById("task-info");
    let selectCategory = 0;
    let tasks = [];

    function init() {
        renderingCategory();
        // newCategory();
        // newTask();
        rightTitleChangeListener();
        eventListener();
    }

    function eventListener() {
        userInputLeft.addEventListener('keypress', newCategory);
        rightTaskInput.addEventListener('keypress', newTask);
    }

    /**
     * It will give the current date for user in the right side container.
     * @returns Date
     */
    function currentDate() {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        let day = weekdays[date.getDay()];
        let month = months[date.getMonth()];
        let currentDate = day + ", " + month + " " + date.getDate();
        const dateElementId = document.createElement('div');
        dateElementId.classList.add("day");
        dateElementId.innerHTML = currentDate;
        return dateElementId;
    }

    /**
     * This method is used to render the default category 
     */
    function renderingCategory() {
        userListUnorder.innerHTML = "";
        for (i = 0; i < category.length; i++) {
            console.log(category);
            const li = document.createElement("li");
            li.id = category[i].id;
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
            if (i == 4) {
                userListUnorder.appendChild(document.createElement('hr'));
            }
        }
    }

    function renderingTask() {
        const radioButtonDiv = document.createElement('div');
        radioButtonDiv.className = "task-radio";
        radioButtonDiv.innerHTML = " <i class='fa-regular fa-circle'></i>";
        const userTaskInfoDiv = document.createElement('div');
        userTaskInfoDiv.className = "user-task-info";
        const p1 = document.createElement('p');
        const p1node = document.createTextNode(rightTaskInput.value);
        p1.innerHTML = p1node.textContent;
        const p2 = document.createElement('p');
        const p2node = document.createTextNode("task");
        p2.innerHTML = p2node.textContent;
        userTaskInfoDiv.appendChild(p1);
        userTaskInfoDiv.appendChild(p2);
        const staricon = document.createElement('div');
        staricon.className = "star-icon";
        staricon.innerHTML = "<i class='fa-regular fa-star'></i>";
        const userTaskItems = document.createElement('div');
        userTaskItems.className = "user-task-items";
        userTaskItems.appendChild(radioButtonDiv);
        userTaskItems.appendChild(userTaskInfoDiv);
        userTaskItems.appendChild(staricon);
        userTaskUl.appendChild(userTaskItems);
        userTaskUl.insertBefore(userTaskItems, userTaskUl.children[0]);
        storeTask();
        rightTaskInput.value = "";
    }

    /*
     * This method is used to create new category for user.
     */
    function newCategory(event) {
        // userInputLeft.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let newUserCategory = {
                "id": category.length + 1,
                "category-name": userInputLeft.value,
                "icon": "<i class='fa-solid fa-list'/>"
            }
            category.push(newUserCategory);
            renderingCategory();
            userInputLeft.value = "";
        }
        // });
    }

    /**
     * This method is used to create new task for user.
     */
    function newTask(event) {
        // rightTaskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            // storeTask();
            renderingTask();

        }
        // });
    }

    /**
     * This method is used to create storage for user task.
     */
    function storeTask() {
        let task = {
            "id": tasks.length + 1,
            "task-name": rightTaskInput.value,
            "category-id": selectCategory
        };
        tasks.push(task);
        getTask();
    }

    /**
     * This method is used to get task for devloper reference.
     */
    function getTask() {
        for (var i = 0; i < tasks.length; i++) {
            console.log("category id by get task method " + tasks[i]["category-id"]);
            console.log("task id : " + tasks[i]["id"]);
            console.log("task name : " + tasks[i]["task-name"]);
        }
    }

    /**
     * This method is used to find an click event to change the right side.
     * The topic name will change while user click on their category.
     */
    function rightTitleChangeListener() {
        var list = document.getElementById("user-list-unorder").getElementsByTagName('li');
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function (event) {
                selectCategory = this.id - 1;
                rightTitle();
            });
        }
    }

    /**
     * This method is used to create title on right side while click on the left side.
     * Then it will give the task details elaboratly.
     */
    function rightTitle() {
        taskInfo.innerHTML = "";
        const taskTitle = document.createElement("div");
        taskTitle.className = "task-title";
        taskTitle.innerHTML = category[selectCategory].icon;
        const p1 = document.createElement('p');
        const p1node = document.createTextNode(category[selectCategory]["category-name"]);
        p1.innerHTML = p1node.textContent;
        const p2 = document.createElement('p');
        const p2node = document.createTextNode("...");
        p2.innerHTML = p2node.textContent;
        taskTitle.appendChild(p1);
        taskTitle.appendChild(p2);
        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(currentDate());
        storeTask();
    }

    init();
})();



