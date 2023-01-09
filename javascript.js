
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
    const userListUnOrder = document.getElementById("user-list-un-order");
    const centerTaskInput = document.getElementById("center-task-input");
    const userTaskUl = document.getElementById("user-task-ul");
    const taskInfo = document.getElementById("task-info");
    let categoryList = document.getElementById("user-list-un-order").getElementsByTagName('li');
    const centerRightContainer = document.getElementById("center-right-container");
    const addButtonForTask = document.getElementById("add-button");
    const addNoteInput = document.getElementById("add-note-input");
    const taskDetail = document.getElementById("task-detail");
    let userSelectedTask = document.getElementById("user-selected-task");
    let selectCategory = category[0];
    let tasks = [];
    let selectTask;
    const userTaskItems = document.getElementsByClassName("user-task-items");
    const closeSidePanelButton = document.getElementById("close-side-panel");

    /**
     * This method will initialize all the variables and methods.
     */
    function init() {
        renderCategory();
        centerTitleChangeListener();
        eventListener();
        defaultCategoryTitle();
        close();
    }

    function close() {
        taskDetail.id = "task-detail-container-hide-display";
    }

    function closeSidePanel(event) {
        if (event.type == "click") {
            taskDetail.id = "task-detail-container-hide-display";
            centerRightContainer.className = "center-right-container";
        }
    }

    function userSpecificTask(event) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == event.currentTarget.id) {
                selectTask = tasks[i];
                console.log("tasks[i].id : " + selectTask.id);
                console.log("select task id : " + selectTask.id);
                console.log("select task task name : " + selectTask["task-name"]);
                console.log("select task category id : " + selectTask["category-id"]);
                console.log("select task notes : " + selectTask["notes"]);
                openSidePanel();
            }
        }
        eventListener();
    }

    function openSidePanel() {
        taskDetail.id = "task-detail-container";
        centerRightContainer.className = "center-container";
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == selectTask.id) {
                userSelectedTask.value = selectTask["task-name"];
                console.log("tasks[i][task-name] : " + tasks[i]["task-name"]);
                getTask();
            }
            else {
                console.log("else working");
            }
            eventListener();
        }
    }

    function getTask() {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == selectTask.id) {
                userSelectedTask.value = selectTask["task-name"];
                addNoteInput.value = selectTask["notes"];
                console.log("tasks[i][task-name] : " + tasks[i]["task-name"]);
            }
            eventListener();
        }
    }

    /**
     * If user do something on the html element,
     * this method will listen and create respective event.
     */
    function eventListener() {
        userInputLeft.addEventListener('keypress', storeCategory);
        centerTaskInput.addEventListener('keypress', storeTask);
        addButtonForTask.addEventListener('click', storeTask);
        closeSidePanelButton.addEventListener('click', closeSidePanel);
        addNoteInput.addEventListener('keypress', addNotes);
        for (let i = 0; i < tasks.length; i++) {
            userTaskItems[i].addEventListener('click', userSpecificTask);
        }
    }


    function addNotes(event) {
        if (event.key == "Enter") {
            selectTask.notes = addNoteInput.value;
            for (let i = 0; i < tasks.length; i++) {
                if (selectTask.id == tasks[i].id) {
                    tasks[i].id = selectTask.id; 
                    tasks[i]["task-name"] = selectTask["task-name"];
                    tasks[i]["category-id"] = selectTask["category-id"];
                    tasks[i]["notes"] = selectTask["notes"];

                    console.log("tasks [i] : " + tasks[i].id);
                    console.log("tasks [i] : " + tasks[i]["task-name"]);
                    console.log("tasks [i] : " + tasks[i]["category-id"]);
                    console.log("tasks [i] : " + tasks[i]["notes"]);
                }
            }
            addNoteInput.value = "";
            console.log("select task notes " + selectTask["notes"]);
        }

    }

    /**
     * The function is called when the user presses the enter key. It creates a new object with the
     * user's input and pushes it to the category array. Then it calls the render Category function
     * to display the new category.
     * @param event - The event object is a JavaScript object that contains information about the event
     * that occurred.
     */
    function storeCategory(event) {
        if (event.key === 'Enter' && userInputLeft.value != 0) {
            let newUserCategory = {
                "id": category.length + 1,
                "category-name": userInputLeft.value,
                "icon": "<i class='fa-solid fa-list'/>"
            }
            category.push(newUserCategory);
            selectCategory = category[newUserCategory.id - 1];
            renderCategory();
            defaultCategoryTitle();
            userInputLeft.value = "";
            centerTitleChangeListener();
        }
    }

    /**
     * This method is used to render the category.
     */
    function renderCategory() {
        userListUnOrder.innerHTML = "";
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
            userListUnOrder.appendChild(li);
            if (i == 4) {
                userListUnOrder.appendChild(document.createElement('hr'));
            }
            if (i > 4) {
                userListUnOrder.insertBefore(li, userListUnOrder.children[6]);
            }
        }
    }
    
    /**
     * This method is used to create storage for user task.
     */
    function storeTask(event) {
        if ((event.type === "click" || event.key === 'Enter') && centerTaskInput.value != 0) {
            let task = {
                "id": tasks.length + 1,
                "task-name": centerTaskInput.value,
                "category-id": selectCategory.id,
                "notes": ""
            };
            selectTask = task;
            tasks.push(task);
            renderTask();
        }
        eventListener();
    }

    /**
     * This method is used to create new task and render each and every new task.
     */
    function renderTask() {
        userTaskUl.innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]["category-id"] == selectCategory.id) {
                const radioButtonDiv = document.createElement('div');
                radioButtonDiv.className = "task-radio";
                radioButtonDiv.innerHTML = " <i class='fa-regular fa-circle'></i>";
                const userTaskInfoDiv = document.createElement('div');
                userTaskInfoDiv.id = tasks[i].id;
                userTaskInfoDiv.className = "user-task-info";
                const taskName = document.createElement('p');
                const taskNameNode = document.createTextNode(tasks[i]["task-name"]);
                taskName.innerHTML = taskNameNode.textContent;
                const defaultTaskLabel = document.createElement('p');
                const defaultTaskLabelNode = document.createTextNode("task");
                defaultTaskLabel.innerHTML = defaultTaskLabelNode.textContent;
                userTaskInfoDiv.appendChild(taskName);
                userTaskInfoDiv.appendChild(defaultTaskLabel);
                const starIcon = document.createElement('div');
                starIcon.className = "star-icon";
                starIcon.innerHTML = "<i class='fa-regular fa-star'></i>";
                const userTaskItems = document.createElement('div');
                userTaskItems.id = tasks[i].id;
                userTaskItems.className = "user-task-items";
                userTaskItems.appendChild(radioButtonDiv);
                userTaskItems.appendChild(userTaskInfoDiv);
                userTaskItems.appendChild(starIcon);
                userTaskUl.appendChild(userTaskItems);
                userTaskUl.insertBefore(userTaskItems, userTaskUl.children[0]);
                centerTaskInput.value = "";
            }
        }
    }

    /**
     * This method is used to find an click event to change the cneter container.
     * The topic name will change while user click on their category.
     */
    function centerTitleChangeListener() {
        for (let i = 0; i < categoryList.length; i++) {
            categoryList[i].addEventListener('click', function (event) {
                selectCategory = category[event.currentTarget.id - 1];
                centerTitle();
            });
        }
    }

    /**
     * This method is used to show the default category in right side.
     */
    function defaultCategoryTitle() {
        centerTitle();
    }

    /**
     * This method is used to create title on center while click on the left side.
     * Then it will give the task details elaborately.
     */
    function centerTitle() {
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
        renderTask();
    }

    /**
     * It will give the current date for user in the center container.
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
        dateElementId.id = "day";
        dateElementId.innerHTML = currentDate;
        return dateElementId;
    }

    init();
})();



