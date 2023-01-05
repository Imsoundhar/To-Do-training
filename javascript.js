
(function () {

    let category = [
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
    let categoryList = document.getElementById("user-list-unorder").getElementsByTagName('li');
    let selectCategory = category[0];
    let tasks = [];

    /**
     * This method will initialize all the variables and methods.
     */
    function init() {
        renderingCategory();
        rightTitleChangeListener();
        eventListener();
        defaultCategory();
    }

    /**
     * If user do something on the html element,
     * this method will listen and create respective event.
     */
    function eventListener() {
        userInputLeft.addEventListener('keypress', storeCategory);
        rightTaskInput.addEventListener('keypress', storeTask);
    }

    /**
     * The function is called when the user presses the enter key. It creates a new object with the
     * user's input and pushes it to the category array. Then it calls the renderingCategory function
     * to display the new category.
     * @param event - The event object is a JavaScript object that contains information about the event
     * that occurred.
     */
    function storeCategory(event) {
        if (event.key === 'Enter') {
            let newUserCategory = {
                "id": category.length + 1,
                "category-name": userInputLeft.value,
                "icon": "<i class='fa-solid fa-list'/>"
            }
            category.push(newUserCategory);
            selectCategory = category[newUserCategory.id - 1];
            renderingCategory();
            defaultCategory();
            userInputLeft.value = "";
            rightTitleChangeListener();
        }
    }

    /**
     * This method is used to render the category.
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
            if (i > 4) {
                userListUnorder.insertBefore(li, userListUnorder.children[6]);
            }
        }
    }

    /**
     * This method is used to find an click event to change the right side.
     * The topic name will change while user click on their category.
     */
    function rightTitleChangeListener() {
        for (let i = 0; i < categoryList.length; i++) {
            categoryList[i].addEventListener('click', function (event) {
                selectCategory = category[this.id - 1];
                rightTitle();
                // userTaskUl.innerHTML = "";
            });
        }
    }

    /**
     * This method is used to show the default side category.
     * @param {event} event 
     */
    function defaultCategory(event) {
        if (event == null) {
            rightTitle();
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
        taskTitle.innerHTML = selectCategory.icon;
        const taskName = document.createElement('p');
        const taskNameNode = document.createTextNode(selectCategory["category-name"]);
        taskName.innerHTML = taskNameNode.textContent;
        const dotsNearTitle = document.createElement('p');
        const dotsNearTitleNode = document.createTextNode("...");
        dotsNearTitle.innerHTML = dotsNearTitleNode.textContent;
        taskTitle.appendChild(taskName);
        taskTitle.appendChild(dotsNearTitle);
        taskInfo.appendChild(taskTitle);
        if (category[0].id == selectCategory.id) {
            taskInfo.appendChild(currentDate());
        }
        renderingTask();
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
     * This method is used to create storage for user task.
     */
    function storeTask(event) {
        if (event.key === 'Enter' && rightTaskInput.value != 0) {
            let task = {
                "id": tasks.length + 1,
                "task-name": rightTaskInput.value,
                "category-id": selectCategory.id
            };
            tasks.push(task);
            renderingTask();
        }
    }

    /**
     * This method is used to create new task and render for each every new task.
     */
    function renderingTask() {
        userTaskUl.innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]["category-id"] == selectCategory.id) {
                const radioButtonDiv = document.createElement('div');
                radioButtonDiv.className = "task-radio";
                radioButtonDiv.innerHTML = " <i class='fa-regular fa-circle'></i>";
                const userTaskInfoDiv = document.createElement('div');
                userTaskInfoDiv.className = "user-task-info";
                const taskName = document.createElement('p');
                const taskNameNode = document.createTextNode(tasks[i]["task-name"]);
                taskName.innerHTML = taskNameNode.textContent;
                const defaultTask = document.createElement('p');
                const defaultTaskNode = document.createTextNode("task");
                defaultTask.innerHTML = defaultTaskNode.textContent;
                userTaskInfoDiv.appendChild(taskName);
                userTaskInfoDiv.appendChild(defaultTask);
                const starIcon = document.createElement('div');
                starIcon.className = "star-icon";
                starIcon.innerHTML = "<i class='fa-regular fa-star'></i>";
                const userTaskItems = document.createElement('div');
                userTaskItems.className = "user-task-items";
                userTaskItems.appendChild(radioButtonDiv);
                userTaskItems.appendChild(userTaskInfoDiv);
                userTaskItems.appendChild(starIcon);
                userTaskUl.appendChild(userTaskItems);
                userTaskUl.insertBefore(userTaskItems, userTaskUl.children[0]);
                rightTaskInput.value = "";
            }
        }
    }

    init();
})();



