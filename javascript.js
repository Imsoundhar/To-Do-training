/* The above code is a to-do list application. It allows the user to create a category, add a task to a
category, and add notes to a task. */
import { getCategories, addCategories, savedTask, getTask } from "./backend.js";

(function () {

    const categoryItem = document.getElementById("user-list-un-order").getElementsByTagName("li");
    const userSelectedTask = document.getElementById("user-selected-task");
    const categoryInput = document.getElementById("new-list-item");
    const categoryList = document.getElementById("user-list-un-order");
    const taskInput = document.getElementById("center-task-input");
    const taskList = document.getElementById("user-task-ul");
    const taskInfo = document.getElementById("task-info");
    const centerRightContainer = document.getElementById("center-right-container");
    const addButtonForTask = document.getElementById("add-button");
    const inputForAddNote = document.getElementById("add-note-input");
    const detailedTaskContainer = document.getElementById("task-detail-container");
    const userTaskInfo = document.getElementsByClassName("user-task-info");
    const sidePanelCloseButton = document.getElementById("close-side-panel");
    const taskRadioTickButton = document.getElementsByClassName("task-radio");
    const starIcon = document.getElementsByClassName("star-icon");
    const userTaskContainer = document.getElementById("user-task-container");
    const taskStatusHeaderContainer = document.getElementsByClassName("task-status-header");

    let listOfCategories = [];
    let listOfTask = [];
    let selectedCategory;
    let selectedTask;

    /**
     * This method will initialize all the variables and methods.
     */
    function init() {
        getCategory();
        eventListener();
        getSelectedCategoryTitle(1);
        close();
    }

    /**
     * When the user clicks on a task, the task is displayed in the side panel.
     */
    function eventListener() {
        categoryInput.addEventListener("keypress", addCategory);
        taskInput.addEventListener("keypress", addTask);
        inputForAddNote.addEventListener("blur", addNotes);
        addButtonForTask.addEventListener("click", addTask);
        sidePanelCloseButton.addEventListener("click", closeSidePanel);

        for (let index = 0; index < userTaskInfo.length; index++) {
            userTaskInfo[index].addEventListener("click", userSpecificTask);
        }

        for (let index = 0; index < taskRadioTickButton.length; index++) {
            taskRadioTickButton[index].addEventListener("click", markCompletedTick);
        }

        for (let index = 0; index < starIcon.length; index++) {
            starIcon[index].addEventListener("click", markAsImportant);
        }

        for (let index = 0; index < categoryItem.length; index++) {
            categoryItem[index].addEventListener("click", showSelectedCategory);
        }
    }

    function showSelectedCategory(event) {
        getSelectedCategoryTitle(event.currentTarget.id);
        closeSidePanel(event);
    }

    /**
     * If the user presses the enter key and the category input field is not empty, then create a new
     * category object, add it to the database, and clear the category input field.
     * @param event - the event that triggered the function
     */
    function addCategory(event) {
        if (event.key === "Enter" && categoryInput.value != 0) {
            let newUserCategory = {
                name: categoryInput.value,
                iconClass: "fa-solid fa-list",
            };
            let addedCategoryId = addCategories(newUserCategory, "POST", "category");
            addedCategoryId.then(addedCategoryId => {
                getCategory();
                getSelectedCategoryTitle(addedCategoryId);
            });
            categoryInput.value = "";
        }
        eventListener();
    }


    /**
     * GetCategory() is a function that gets the categories from the database and renders them to the
     * page.
     */
    function getCategory() {
        let existingCategories = getCategories("categories");
        existingCategories.then((categories) => {
            categoryList.innerHTML = "";
            categories.forEach((element) => {
                listOfCategories.push(element);
                renderCategory(element);
            })
        });
    }

    /**
     * It creates a list item, adds an icon and a text node to it, and then appends it to the list.
     */
    function renderCategory(category) {
        selectedCategory = category;
        const li = document.createElement("li");
        li.id = category.id;
        const div = document.createElement("div");
        div.className = "user-list";
        const i = document.createElement("i");
        i.className = category.iconClass;
        const p = document.createElement("p");
        p.className = "left-notes-title";
        const node = document.createTextNode(category.name);
        p.innerHTML = node.textContent;
        div.appendChild(i);
        div.appendChild(p);
        li.appendChild(div);
        categoryList.appendChild(li);
        if (category.id == 5) {
            categoryList.appendChild(document.createElement("hr"));
        }
        if (category.id > 5) {
            categoryList.insertBefore(li, categoryList.children[6]);
        }
    }

    /**
     * Get the categories from the API, then for each category, if the category id matches the id
     * passed in, render the category title on the right side of the page.
     * @param id - the id of the category that is clicked on the left side
     */
    function getSelectedCategoryTitle(id) {
        let existingCategories = getCategories("categories");
        existingCategories.then((categories) => {
            categories.forEach((element) => {
                if (element.id == id) {
                    taskInfo.innerHTML = "";
                    renderSelectedCategoryTitle(element);
                }
            })
        });
        eventListener();
    }

    /**
     * This method is used to create title on center while click on the left side.
     * Then it will give the task details elaborately.
     */
    function renderSelectedCategoryTitle(category) {
        selectedCategory = category;
        const taskTitle = document.createElement("div");
        taskTitle.className = "task-title";
        const i = document.createElement("i");
        i.className = category.iconClass;
        const taskName = document.createElement("p");
        const taskNameNode = document.createTextNode(category.name);
        taskName.innerHTML = taskNameNode.textContent;
        const dotsNearTitle = document.createElement("p");
        const dotsNearTitleNode = document.createTextNode("...");
        dotsNearTitle.innerHTML = dotsNearTitleNode.textContent;
        taskTitle.appendChild(i);
        taskTitle.appendChild(taskName);
        taskTitle.appendChild(dotsNearTitle);
        taskInfo.appendChild(taskTitle);
        if (1 == category.id) {
            taskInfo.appendChild(currentDate());
        }
        renderTaskForCategory();
    }



    /**
     * If the event is a click or enter key press and the task input value is not 0, then create a task
     * object and send it to the server.
     * @param event - the event that triggered the function
     */
    function addTask(event) {
        if ((event.type === "click" || event.key === "Enter") && taskInput.value != 0) {
            let importantStatus;
            if (selectedCategory.id == 2) {
                importantStatus = true;
            } else {
                importantStatus = false;
            }
            let categoryIds = [];
            categoryIds.push(selectedCategory.id)
            let task = {
                name: taskInput.value,
                categoryIds: categoryIds,
                notes: "",
                isCompleted: false,
                isImportant: importantStatus
            };
            let addedTask = savedTask(task, "POST", "task");
            addedTask.then(renderTaskForCategory());
            selectedTask = task;
        }
        eventListener();
    }


    /**
     * If the selected category is 2, render the important tasks, otherwise render all tasks.
     */
    function renderTaskForCategory() {
        taskInput.value = "";
        switch (selectedCategory.id) {
            case 2:
                renderImportantTask();
                break;

            default:
                renderAllTask();
                break;
        }
        eventListener();
    }

    /**
     * It gets all the tasks from the local storage, then it loops through the tasks and if the task's
     * categoryIds is equal to the selectedCategory.id, it renders the task.
     */
    function renderAllTask() {
        let existingTasks = getTask("tasks");
        taskList.innerHTML = "";
        existingTasks.then((tasks) => {
            listOfTask = tasks;
            tasks.forEach((element) => {
                if (element.categoryIds == selectedCategory.id) {
                    renderTask(element);
                }
            })
        });
        eventListener();
    }

    /**
     * It gets the tasks from the local storage, then it loops through the tasks and if the task is
     * important, it renders it.
     */
    function renderImportantTask() {
        let existingTasks = getTask("tasks");
        taskList.innerHTML = "";
        existingTasks.then((tasks) => {
            listOfTask = tasks;
            tasks.forEach((element) => {
                if (element.isImportant && element.isCompleted == false) {
                    renderTask(element);
                }
            })
        });
        eventListener();
    }

    /**
     * It creates a div element, adds a class name, adds a paragraph element, adds a text node, adds a
     * child element, calls a function, creates another div element, adds a class name, adds a child
     * element, adds another child element, adds another child element, adds a child element, and calls a
     * function.
     * @param task - {
     */
    function renderTask(task) {
        const userTaskInfoDiv = document.createElement("div");
        userTaskInfoDiv.id = task.id;
        userTaskInfoDiv.className = "user-task-info";
        const taskName = document.createElement("p");
        const taskNameNode = document.createTextNode(task.name);
        taskName.innerHTML = taskNameNode.textContent;
        userTaskInfoDiv.appendChild(taskName);
        getTypeOfCategory(userTaskInfoDiv);
        const userTaskItem = document.createElement("div");
        userTaskItem.id = task.id;
        userTaskItem.className = "user-task-items";
        userTaskItem.appendChild(generateCompletedTask(task));
        userTaskItem.appendChild(userTaskInfoDiv);
        userTaskItem.appendChild(generateImportantTask(task));
        if (task.isCompleted) {
            taskList.insertAdjacentElement("beforeend", displayCompleted());
            taskList.appendChild(userTaskItem);
        } else {
            taskList.appendChild(userTaskItem);
            taskList.insertBefore(userTaskItem, taskList.children[0]);
        }
        eventListener();
    }

    /**
     * If the selected category is not 5, then create a paragraph element and append it to the
     * userTaskInfoDiv.
     * @param userTaskInfoDiv - the div that the userTaskInfo is being appended to
     */
    function getTypeOfCategory(userTaskInfoDiv) {
        if (selectedCategory.id != 5) {
            const defaultTaskLabel = document.createElement("p");
            const defaultTaskLabelNode = document.createTextNode("task");
            defaultTaskLabel.innerHTML = defaultTaskLabelNode.textContent;
            userTaskInfoDiv.appendChild(defaultTaskLabel);
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
            for (let index = 0; index < listOfTask.length; index++) {
                if (listOfTask[index].id == event.currentTarget.id) {
                    if (listOfTask[index].isCompleted == false) {
                        listOfTask[index].isCompleted = true;
                        let addedTask = savedTask(listOfTask[index], "POST", "task");
                        addedTask.then(renderTaskForCategory());
                    } else {
                        listOfTask[index].isCompleted = false;
                        let addedTask = savedTask(listOfTask[index], "POST", "task");
                        addedTask.then(renderTaskForCategory());
                    }
                }
            }
        }
        // eventListener();
    }


    function displayCompleted() {
        let completedCount = 0;
        for (let index = 0; index < listOfTask.length; index++) {
            if (listOfTask[index].isCompleted == true) {
                completedCount++;
            }
        }
        if (completedCount > 0) {
            return displayCompletedTaskHeader(completedCount);
        } else {
            completedCount = 0;
        }
        eventListener();
    }

    function displayCompletedTaskHeader(completedCount) {
        const taskStatusHeaderContainer = document.createElement("div");
        taskStatusHeaderContainer.className = "task-status-header";
        const i = document.createElement('i');
        i.className = "fa-solid fa-caret-right";
        const taskStatusHeaderName = document.createElement("p");
        taskStatusHeaderName.innerHTML = "completed " +  completedCount;
        taskStatusHeaderContainer.appendChild(i);
        taskStatusHeaderContainer.appendChild(taskStatusHeaderName);
        return taskList.appendChild(taskStatusHeaderContainer);
    }

    /**
     * If the event type is a click, then loop through the tasks array and if the event target id is
     * equal to the task id, then if the task isImportant is false, then set it to true, otherwise set
     * it to false.
     * @param event - the event that was triggered
     */
    function markAsImportant(event) {
        if (event.type == "click") {
            for (let index = 0; index < listOfTask.length; index++) {
                if (listOfTask[index].id == event.currentTarget.id) {
                    if (listOfTask[index].isImportant == false) {
                        listOfTask[index].isImportant = true;
                        let addedTask = savedTask(listOfTask[index], "POST", "task");
                        addedTask.then(renderTaskForCategory());
                    } else {
                        listOfTask[index].isImportant = false;
                        let addedTask = savedTask(listOfTask[index], "POST", "task");
                        addedTask.then(renderTaskForCategory());
                    }
                }
            }
        }
        eventListener();
    }

    /**
     * It creates a div element with a class of "star-icon" and an id of the task id. It then creates an
     * i element with the same id. If the task is important, it adds a class of "star-icon-mark" to the
     * div and a class of "fa-solid fa-star" to the i element. Otherwise, it adds a class of "fa-regular
     * fa-star" to the i element. It then appends the i element to the div element and returns the div
     * element.
     * @param task - the task object
     * @returns the starIconContainer.
     */
    function generateImportantTask(task) {
        const starIconContainer = document.createElement("div");
        starIconContainer.id = task.id;
        starIconContainer.className = "star-icon";
        const i = document.createElement("i");
        i.id = task.id;
        if (task.isImportant == true) {
            starIconContainer.classList.add("star-icon-mark");
            i.className = "fa-solid fa-star";
        } else {
            i.className = "fa-regular fa-star";
        }
        starIconContainer.appendChild(i);
        return starIconContainer;
    }

    /**
     * If the task is completed, add the class 'task-radio-mark' and the innerHTML of the radio button
     * container will be a check mark, otherwise, the innerHTML will be a circle.
     * @param index - the index of the task in the tasks array
     * @returns The radioButtonContainer is being returned.
     */
    function generateCompletedTask(task) {
        const radioButtonContainer = document.createElement("div");
        radioButtonContainer.id = task.id;
        radioButtonContainer.className = "task-radio";
        const i = document.createElement("i");
        i.id = task.id;
        if (task.isCompleted == true) {
            radioButtonContainer.classList.add("task-radio-mark");
            i.className = "fa-sharp fa-solid fa-circle-check";
            taskStatusHeaderContainer.innerHTML = "";
        } else {
            i.className = "fa-regular fa-circle";
        }
        radioButtonContainer.appendChild(i);
        return radioButtonContainer;
    }

    /**
     * It takes the id of the task that was clicked on and then compares it to the id of each task in the
     * tasks array. If the id of the task that was clicked on matches the id of a task in the tasks
     * array, then the task that was clicked on is assigned to the selectedTask variable.
     * @param event - The event that triggered the function.
     */
    function userSpecificTask(event) {
        for (let index = 0; index < listOfTask.length; index++) {
            if (listOfTask[index].id == event.currentTarget.id) {
                selectedTask = listOfTask[index];
                openSidePanel(selectedTask);
            }
        }
        eventListener();
    }

    /**
     * When the user clicks on a task, the task's details are displayed in the right panel.
     */
    function openSidePanel(selectedTask) {
        detailedTaskContainer.id = "task-detail-container";
        centerRightContainer.className = "center-container";
        userSelectedTask.value = selectedTask.name;
        inputForAddNote.value = selectedTask.note;
        let addedTask = savedTask(selectedTask, "POST", "task");
        addedTask.then(renderTaskForCategory());
        eventListener();
    }

    /**
     * The function adds notes to the selected task.
     * @param event - the event that triggered the function
     */
    function addNotes() {
        selectedTask.note = inputForAddNote.value;
        let addedTask = savedTask(selectedTask, "POST", "task");
        addedTask.then(renderTaskForCategory());
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
     * It's a function that hides the detailed task container when the user clicks the close button.
     */
    function close() {
        detailedTaskContainer.id = "task-detail-container-hide-display";
        eventListener();
    }

    /**
     * It will give the current date for user in the center container.
     * @returns Date
     */
    function currentDate() {
        const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const date = new Date();
        let day = weekdays[date.getDay()];
        let month = months[date.getMonth()];
        let currentDate = day + ", " + month + " " + date.getDate();
        const dateElementId = document.createElement("div");
        dateElementId.id = "day";
        dateElementId.innerHTML = currentDate;
        return dateElementId;
    }

    init();
})();
