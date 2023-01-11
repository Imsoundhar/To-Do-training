
(function () {

    let category = [
        {
            id: 1,
            categoryName: "My day",
            icon: "<i class='fa-regular fa-sun'></i>"
        },

        {
            id: 2,
            categoryName: "Important",
            icon: "<i class='fa-regular fa-star'></i>"
        },

        {
            id: 3,
            categoryName: "Planned",
            icon: "<i class='fa-regular fa-calendar'></i>"
        },

        {
            id: 4,
            categoryName: "Assigned to me",
            icon: "<i class='fa-regular fa-user'></i>"
        },

        {
            id: 5,
            categoryName: "Task",
            icon: "<i class='fa-solid fa-house-user'></i>"
        }
    ];

    const categoryInput = document.getElementById("new-list-item");
    const categoryList = document.getElementById("user-list-un-order");
    const taskInput = document.getElementById("center-task-input");
    const taskList = document.getElementById("user-task-ul");
    const taskInfo = document.getElementById("task-info");
    let categoryItem = document.getElementById("user-list-un-order").getElementsByTagName('li');
    const centerRightContainer = document.getElementById("center-right-container");
    const addButtonForTask = document.getElementById("add-button");
    const inputForAddNote = document.getElementById("add-note-input");
    const detailedTaskContainer = document.getElementById("task-detail-container");
    let userSelectedTask = document.getElementById("user-selected-task");
    let selectedCategory = category[0];
    let tasks = [];
    let selectedTask;
    const userTaskItem = document.getElementsByClassName("user-task-items");
    const userTaskInfo = document.getElementsByClassName("user-task-info");
    const sidePanelCloseButton = document.getElementById("close-side-panel");
    const taskRadioTickButton = document.getElementsByClassName("task-radio");

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

    /**
     * When the user clicks on a task, the task is displayed in the side panel.
     */
    function eventListener() {
        categoryInput.addEventListener('keypress', storeCategory);
        taskInput.addEventListener('keypress', storeTask);
        addButtonForTask.addEventListener('click', storeTask);
        sidePanelCloseButton.addEventListener('click', closeSidePanel);
        inputForAddNote.addEventListener('keypress', addNotes);

        for (let index = 0; index < userTaskInfo.length; index++) {
            userTaskInfo[index].addEventListener('click', userSpecificTask);
        }

        for (let index = 0; index < taskRadioTickButton.length; index++) {
            taskRadioTickButton[index].addEventListener('click', markCompletedTick);
        }
    }

    /**
     * If the event type is a click, then loop through the tasks array and if the event target id is
     * equal to the task id, then if the task is completed, set it to false and add the class
     * task-radio-mark, otherwise set it to true.
     * @param event - The event object that is passed to the event handler.
     */
    function markCompletedTick(event) {
        if (event.type == "click") {
            for (let index = 0; index < tasks.length; index++) {
                if (event.currentTarget.id == tasks[index].id) {
                    if (tasks[index].isCompleted == true) {
                        tasks[index].isCompleted = false;
                        // taskRadioTickButton[index].classList.add("task-radio-mark");
                    } else {
                        tasks[index].isCompleted = true;
                    }
                    console.log(tasks[index]);
                }
            }
            renderTask();
            // eventListener();
        }
        eventListener();
    }

    /**
     * It's a function that hides the detailed task container when the user clicks the close button.
     */
    function close() {
        detailedTaskContainer.id = "task-detail-container-hide-display";
        eventListener();
    }

    /**
     * If the event type is a click, then change the id of the detailedTaskContainer to
     * task-detail-container-hide-display and change the class of the centerRightContainer to
     * center-right-container.
     * @param event - the event that is being listened for
     */
    function closeSidePanel(event) {
        if (event.type == "click") {
            detailedTaskContainer.id = "task-detail-container-hide-display";
            centerRightContainer.className = "center-right-container";
        }
        eventListener();
    }

    /**
     * It takes the id of the task that was clicked on and then compares it to the id of each task in the
     * tasks array. If the id of the task that was clicked on matches the id of a task in the tasks
     * array, then the task that was clicked on is assigned to the selectedTask variable.
     * @param event - The event that triggered the function.
     */
    function userSpecificTask(event) {
        for (let index = 0; index < tasks.length; index++) {
            if (tasks[index].id == event.currentTarget.id) {
                selectedTask = tasks[index];
                openSidePanel();
            }
        }
        eventListener();
    }

    /**
     * When the user clicks on a task, the task's details are displayed in the right panel.
     */
    function openSidePanel() {
        detailedTaskContainer.id = "task-detail-container";
        centerRightContainer.className = "center-container";
        userSelectedTask.value = selectedTask.taskName;
        getTask();
    }

    /**
     * The function gets the task name and notes from the selected task and puts them in the input
     * fields.
     */
    function getTask() {
        userSelectedTask.value = selectedTask.taskName;
        inputForAddNote.value = selectedTask.notes;
    }

    /**
     * The function adds notes to the selected task.
     * @param event - the event that triggered the function
     */
    function addNotes(event) {
        if (event.key == "Enter") {
            selectedTask.notes = inputForAddNote.value;
            tasks[index].notes = selectedTask.notes;
            inputForAddNote.value = "";
            eventListener();
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
        if (event.key === 'Enter' && categoryInput.value != 0) {
            let newUserCategory = {
                id: category.length + 1,
                categoryName: categoryInput.value,
                icon: "<i class='fa-solid fa-list'/>"
            }
            category.push(newUserCategory);
            selectedCategory = category[newUserCategory.id - 1];
            renderCategory();
            defaultCategoryTitle();
            categoryInput.value = "";
            centerTitleChangeListener();
        }
    }

    /**
     * This method is used to render the category.
     */
    function renderCategory() {
        categoryList.innerHTML = "";
        for (index = 0; index < category.length; index++) {
            console.log(category);
            const li = document.createElement("li");
            li.id = category[index].id;
            const div = document.createElement("div");
            div.className = "user-list";
            div.innerHTML = category[index].icon;
            const p = document.createElement("p");
            p.className = "left-notes-title";
            const node = document.createTextNode(category[index].categoryName);
            p.innerHTML = node.textContent;
            div.appendChild(p);
            li.appendChild(div);
            categoryList.appendChild(li);
            if (index == 4) {
                categoryList.appendChild(document.createElement('hr'));
            }
            if (index > 4) {
                categoryList.insertBefore(li, categoryList.children[6]);
            }
        }
    }

    /**
     * This method is used to create storage for user task.
     */
    function storeTask(event) {
        if ((event.type === "click" || event.key === 'Enter') && taskInput.value != 0) {
            let task = {
                id: tasks.length + 1,
                taskName: taskInput.value,
                categoryId: selectedCategory.id,
                notes: "",
                isCompleted: false
            };
            selectedTask = task;
            tasks.push(task);
            // convertIntoTaskCategory(selectedTask);
            renderTask();
        }
        eventListener();
    }

    // function convertIntoTaskCategory(selectedTask) {
    //     for (let i = 0; i < category.length; i++) {
    //         if (selectedTask.id === ) {}

    //     }
    // }

    /**
     * This method is used to create new task and render each and every new task.
     */
    function renderTask() {
        taskList.innerHTML = "";
        for (let index = 0; index < tasks.length; index++) {
            if (tasks[index].categoryId == selectedCategory.id) {
                const userTaskInfoDiv = document.createElement('div');
                userTaskInfoDiv.id = tasks[index].id;
                userTaskInfoDiv.className = "user-task-info";
                const taskName = document.createElement('p');
                const taskNameNode = document.createTextNode(tasks[index].taskName);
                taskName.innerHTML = taskNameNode.textContent;
                userTaskInfoDiv.appendChild(taskName);
                getTypeOfCategory(userTaskInfoDiv);
                const starIcon = document.createElement('div');
                starIcon.className = "star-icon";
                starIcon.innerHTML = "<i class='fa-regular fa-star'></i>";
                const userTaskItem = document.createElement('div');
                userTaskItem.id = tasks[index].id;
                userTaskItem.className = "user-task-items";
                userTaskItem.appendChild(taskCompletedButton(index));
                userTaskItem.appendChild(userTaskInfoDiv);
                userTaskItem.appendChild(starIcon);
                taskList.appendChild(userTaskItem);
                taskList.insertBefore(userTaskItem, taskList.children[0]);
                taskInput.value = "";
            }
        }
        eventListener();
    }

    function taskCompletedButton(index) {
        const radioButtonContainer = document.createElement('div');
        radioButtonContainer.id = tasks[index].id;
        if (tasks[index].isCompleted == true) {
            radioButtonContainer.className = "task-radio-mark";
            radioButtonContainer.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
        } else {
            radioButtonContainer.className = "task-radio";
            radioButtonContainer.innerHTML = "<i class='fa-regular fa-circle'></i>";
        }
        return radioButtonContainer;
    }

    /**
     * If the id of the selected category is not equal to the id of the fourth element in the category
     * array, then create a paragraph element and append it to the userTaskInfoDiv.
     * @param userTaskInfoDiv - the div that the userTaskLabel will be appended to
     */
    function getTypeOfCategory(userTaskInfoDiv) {
        if (category[4].id != selectedCategory.id) {
            const defaultTaskLabel = document.createElement('p');
            const defaultTaskLabelNode = document.createTextNode("task");
            defaultTaskLabel.innerHTML = defaultTaskLabelNode.textContent;
            userTaskInfoDiv.appendChild(defaultTaskLabel);
        }
    }

    /**
     * This method is used to find an click event to change the cneter container.
     * The topic name will change while user click on their category.
     */
    function centerTitleChangeListener() {
        for (let index = 0; index < categoryItem.length; index++) {
            categoryItem[index].addEventListener('click', function (event) {
                selectedCategory = category[event.currentTarget.id - 1];
                centerTitle();
                closeSidePanel(event);
                eventListener();
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
        taskTitle.innerHTML = selectedCategory.icon;
        const taskName = document.createElement('p');
        const taskNameNode = document.createTextNode(selectedCategory.categoryName);
        taskName.innerHTML = taskNameNode.textContent;
        const dotsNearTitle = document.createElement('p');
        const dotsNearTitleNode = document.createTextNode("...");
        dotsNearTitle.innerHTML = dotsNearTitleNode.textContent;
        taskTitle.appendChild(taskName);
        taskTitle.appendChild(dotsNearTitle);
        taskInfo.appendChild(taskTitle);
        if (category[0].id == selectedCategory.id) {
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



