/* The above code is creating a to-do list application. */
import { saveCategories, saveTask, getCategories, getTask } from "./service-api.js";

(function () {

    const CATEGORY_ITEM = document.getElementById("user-list-un-order").getElementsByTagName("li");
    const CATEGORY_INPUT = document.getElementById("new-list-item");
    const CATEGORY_LIST = document.getElementById("user-list-un-order");
    const TASK_INPUT = document.getElementById("center-task-input");
    const TASK_LIST = document.getElementById("user-task-ul");
    const TASK_INFO = document.getElementById("task-info");
    const CENTER_RIGHT_CONTAINER = document.getElementById("center-right-container");
    const ADD_BUTTON_FOR_TASK = document.getElementById("add-button");
    const INPUT_FOR_ADD_NOTE = document.getElementById("add-note-input");
    const DETAILED_TASK_CONTAINER = document.getElementById("task-detail-container");
    const USER_TASK_INFO = document.getElementsByClassName("user-task-info");
    const SIDE_PANEL_CLOSE_BUTTON = document.getElementById("close-side-panel");
    const TASK_RADIO_BUTTON = document.getElementsByClassName("task-radio");
    const STAR_ICON = document.getElementsByClassName("star-icon");
    const TASK_DETAIL_HEADER_CONTAINER = document.getElementById("task-detail-header");
    const NAVIGATION_BAR = document.getElementsByClassName("navigation-bar");
    const LEFT_CONTAINER = document.getElementById("left-container");

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
        CATEGORY_INPUT.addEventListener("keypress", addCategory);
        TASK_INPUT.addEventListener("keypress", addTask);
        INPUT_FOR_ADD_NOTE.addEventListener("blur", addNotes);
        ADD_BUTTON_FOR_TASK.addEventListener("click", addTask);
        SIDE_PANEL_CLOSE_BUTTON.addEventListener("click", closeSidePanel);

        for (let index = 0; index < NAVIGATION_BAR.length; index++) {
            NAVIGATION_BAR[index].addEventListener("click", closeCategoryPanel);
        }

        for (let index = 0; index < USER_TASK_INFO.length; index++) {
            USER_TASK_INFO[index].addEventListener("click", userSpecificTask);
        }

        for (let index = 0; index < TASK_RADIO_BUTTON.length; index++) {
            TASK_RADIO_BUTTON[index].addEventListener("click", markAsCompleted);
        }

        for (let index = 0; index < STAR_ICON.length; index++) {
            STAR_ICON[index].addEventListener("click", markAsImportant);
        }

        for (let index = 0; index < CATEGORY_ITEM.length; index++) {
            CATEGORY_ITEM[index].addEventListener("click", showSelectedCategory);
        }
    }


    function openSidePanel(task) {
        if (CENTER_RIGHT_CONTAINER.className == "center-right-container" || CENTER_RIGHT_CONTAINER.className == "center-container") {
            CENTER_RIGHT_CONTAINER.className = "center-container"
        } else {
            CENTER_RIGHT_CONTAINER.className = "center-left-container";
        }
        DETAILED_TASK_CONTAINER.id = "task-detail-container";
        INPUT_FOR_ADD_NOTE.value = task.note;
        let addedTask = saveTask(task, "POST", "task");
        addedTask.then(renderAllTask());
    }


    function openCategoryPanel(event) {
        if (event.type == "click") {
            if (CENTER_RIGHT_CONTAINER.className == "center-full-container") {
                CENTER_RIGHT_CONTAINER.className = "center-right-container";
            } else {
                CENTER_RIGHT_CONTAINER.className = "center-container";
            }
            LEFT_CONTAINER.classList.remove("hide-left-container");
        }
    }

    /**
     * The function is called when a user clicks on a category in the side panel. The function then
     * gets the title of the category that was clicked on and then closes the side panel.
     * @param event - The event object that is passed to the function.
     */
    function showSelectedCategory(event) {
        getSelectedCategoryTitle(event.currentTarget.id);
        closeSidePanel(event);
    }

    /**
     * If the event type is a click, then hide the left container and change the class name of the
     * center-right container to center-full-container.
     * @param event - The event object.
     */
    function closeCategoryPanel(event) {
        if (event.type == "click") {
            LEFT_CONTAINER.classList.add("hide-left-container");
            if (CENTER_RIGHT_CONTAINER.className == "center-right-container") {
                CENTER_RIGHT_CONTAINER.className = "center-full-container";
            } else {
                CENTER_RIGHT_CONTAINER.className = "center-left-container";
            }
        }
    }

    /**
     * If the user presses the enter key and the category input field is not empty, then create a new
     * category object, add it to the database, and clear the category input field.
     * @param event - the event that triggered the function
     */
    function addCategory(event) {
        if (event.key === "Enter" && CATEGORY_INPUT.value != 0) {
            let newUserCategory = {
                name: CATEGORY_INPUT.value,
                iconClass: "fa-solid fa-list",
            };
            let addedCategoryId = saveCategories(newUserCategory, "POST", "category");
            addedCategoryId.then(addedCategoryId => {
                getCategory();
                getSelectedCategoryTitle(addedCategoryId);
            });
            CATEGORY_INPUT.value = "";
        }
    }

    /**
     * GetCategory() is a function that gets the categories from the database and renders them to the
     * page.
     */
    function getCategory() {
        let existingCategories = getCategories("categories");
        existingCategories.then((categories) => {
            CATEGORY_LIST.innerHTML = "";
            categories.forEach((category) => {
                listOfCategories.push(category);
                renderCategory(category);
            })
        });
    }

    /**
     * It creates a list item, adds an icon and a text node to it, and then appends it to the list.
     */
    function renderCategory(category) {
        selectedCategory = category;
        const li = createElement("li", { id: category.id, className: "" });
        const div = createElement("div", { id: "", className: "user-list" });
        const i = createElement("i", { id: "", className: category.iconClass });
        const p = createElement("p", { id: "", className: "left-notes-title" });
        p.innerHTML = category.name;
        div.appendChild(i);
        div.appendChild(p);
        li.appendChild(div);
        CATEGORY_LIST.appendChild(li);
        if (category.id == 5) {
            CATEGORY_LIST.appendChild(document.createElement("hr"));
        }
        if (category.id > 5) {
            CATEGORY_LIST.insertBefore(li, CATEGORY_LIST.children[6]);
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
            categories.forEach((category) => {
                if (category.id == id) {
                    TASK_INFO.innerHTML = "";
                    renderSelectedCategoryTitle(category);
                }
            })
        });
    }

    /**
     * This method is used to create title on center while click on the left side.
     * Then it will give the task details elaborately.
     */
    function renderSelectedCategoryTitle(category) {
        CENTER_RIGHT_CONTAINER.className = "center-right-container"
        selectedCategory = category;
        const taskTitle = createElement("div", { id: "", className: "task-title" });
        const i = createElement("i", { id: "categoryIcon", className: category.iconClass });
        i.addEventListener("click", openCategoryPanel);
        const taskName = document.createElement("p");
        taskName.innerHTML = category.name;
        const dotsNearTitle = document.createElement("p");
        dotsNearTitle.innerHTML = "...";
        taskTitle.appendChild(i);
        taskTitle.appendChild(taskName);
        taskTitle.appendChild(dotsNearTitle);
        TASK_INFO.appendChild(taskTitle);
        if (category.id == 1) {
            TASK_INFO.appendChild(currentDate());
        }
        renderAllTask();
    }



    /**
     * If the event is a click or enter key press and the task input value is not 0, then create a task
     * object and send it to the server.
     * @param event - the event that triggered the function
     */
    function addTask(event) {
        if ((event.type === "click" || event.key === "Enter") && TASK_INPUT.value != 0) {
            let categoryIds = [];
            categoryIds.push(selectedCategory.id);
            if (selectedCategory.id < 5) {
                categoryIds.splice(0, 0, 5);
            }
            let importantStatus;
            if (selectedCategory.id == 2) {
                importantStatus = true;
            } else {
                importantStatus = false;
            }
            let task = {
                name: TASK_INPUT.value,
                categoryIds: categoryIds,
                notes: "",
                isCompleted: false,
                isImportant: importantStatus
            };
            let addedTask = saveTask(task, "POST", "task");
            addedTask.then(renderAllTask());
            selectedTask = task;
        }
    }

    /**
     * It gets all the tasks from the local storage, then it loops through the tasks and if the task's
     * categoryIds is equal to the selectedCategory.id, it renders the task.
     */
    function renderAllTask() {
        let existingTasks = getTask("tasks");
        TASK_INPUT.value = "";
        TASK_LIST.innerHTML = "";
        let completedCount = 0;
        existingTasks.then((tasks) => {
            listOfTask = tasks;
            tasks.forEach((task) => {
                for (let index = 0; index < task.categoryIds.length; index++) {
                    if (task.categoryIds[index] == selectedCategory.id) {
                        if (task.isCompleted) {
                            if (selectedCategory.id != 2) {
                                if (completedCount == 0) {
                                    displayCompleted();
                                }
                                completedCount++;
                                renderTask(task, "beforeend");
                            }
                        } else {
                            renderTask(task, "afterbegin");
                        }
                    }
                }
            })
        });
    }


    /**
     * It creates a div element, appends a paragraph element to it, and then appends the div element to
     * a parent element.
     * </code>
     * @param task - is an object that contains the task information
     * @param alignOrder - "beforeend" or "afterbegin"
     */
    function renderTask(task, alignOrder) {
        const userTaskInfoDiv = createElement("div", { id: task.id, className: "user-task-info" });
        const taskName = document.createElement("p");
        taskName.innerHTML = task.name;
        userTaskInfoDiv.appendChild(generateCompletedTaskDecoration(task, taskName));
        getTypeOfCategory(userTaskInfoDiv);
        const userTaskItem = createElement("div", { id: task.id, className: "user-task-items" });
        userTaskItem.appendChild(generateCompletedTaskIcon(task));
        userTaskItem.appendChild(userTaskInfoDiv);
        userTaskItem.appendChild(generateImportantTaskIcon(task));
        TASK_LIST.appendChild(userTaskItem);
        TASK_LIST.insertAdjacentElement(alignOrder, userTaskItem);
        eventListener();
    }

    /**
     * If the task is completed, add the class "completed-text-strike" to the task name. Otherwise,
     * remove the class "completed-text-strike" from the task name.
     * @param task - the task object
     * @param taskName - the name of the task
     * @returns The taskName is being returned.
     */
    function generateCompletedTaskDecoration(task, taskName) {
        if (task.isCompleted) {
            taskName.classList.add("completed-text-strike");
        } else {
            taskName.classList.remove("completed-text-strike");
        }
        return taskName;
    }

    /**
     * It creates an element with the name you pass in, and then sets the id and class attributes if
     * you pass in a value for them.
     * @param elementName - The name of the element you want to create.
     * @param attributes - {
     * @returns The element that was created.
     */
    function createElement(elementName, attributes) {
        const element = document.createElement(elementName);

        if (attributes.id != "") {
            element.setAttribute('id', attributes.id);
        }
        if (attributes.className != "") {
            element.setAttribute('class', attributes.className);
        }
        return element;
    }

    /**
     * The function displayCompleted() returns the function displayCompletedTaskHeader() with the
     * argument completedCount.
     * @returns The function displayCompletedTaskHeader is being returned.
     */
    function displayCompleted() {
        let completedCount = 0;
        for (let index = 0; index < listOfTask.length; index++) {
            if (listOfTask[index].isCompleted == true) {
                completedCount++;
            }
        }
        return displayCompletedTaskHeader(completedCount);
    }

    /**
     * It creates a div, adds a class to it, creates an i element, adds a class to it, creates a p
     * element, adds text to it, appends the i element to the div, appends the p element to the div, and
     * then appends the div to the taskList element.
     * @param completedCount - the number of completed tasks
     * @returns the taskList.appendChild(taskStatusHeaderContainer);
     */
    function displayCompletedTaskHeader(completedCount) {
        const taskStatusHeaderContainer = createElement("div", { id: "", className: "task-status-header" });
        const i = createElement("i", { id: "", className: "fa-solid fa-caret-right" });
        const taskStatusHeaderName = document.createElement("p");
        taskStatusHeaderName.innerHTML = "completed " + completedCount;
        taskStatusHeaderContainer.appendChild(i);
        taskStatusHeaderContainer.appendChild(taskStatusHeaderName);
        return TASK_LIST.appendChild(taskStatusHeaderContainer);
    }

    /**
     * If the selected category is not 5, then create a paragraph element and append it to the
     * userTaskInfoDiv.
     * @param userTaskInfoDiv - the div that the userTaskInfo is being appended to
     */
    function getTypeOfCategory(userTaskInfoDiv) {
        if (selectedCategory.id != 5) {
            const defaultTaskLabel = document.createElement("p");
            defaultTaskLabel.innerHTML = "task";
            userTaskInfoDiv.appendChild(defaultTaskLabel);
        }
    }

    /**
     * If the event type is a click, then loop through the tasks array and if the event target id is
     * equal to the task id, then if the task is completed, set it to false and add the class
     * task-radio-mark, otherwise set it to true.
     * @param event - The event object that is passed to the event handler.
     */
    function markAsCompleted(event) {
        if (event.type == "click") {
            TASK_DETAIL_HEADER_CONTAINER.innerHTML = "";
            for (let index = 0; index < listOfTask.length; index++) {
                if (listOfTask[index].id == event.currentTarget.id) {
                    if (listOfTask[index].isCompleted == false) {
                        listOfTask[index].isCompleted = true;
                    } else {
                        listOfTask[index].isCompleted = false;
                    }
                    let addedTask = saveTask(listOfTask[index], "POST", "task");
                    addedTask.then(() => {
                        renderAllTask(),
                            renderTaskDetailContainer(listOfTask[index])
                    });
                }
            }
        }
    }


    /**
     * If the event type is a click, then loop through the tasks array and if the event target id is
     * equal to the task id, then if the task isImportant is false, then set it to true, otherwise set
     * it to false.
     * @param event - the event that was triggered
     */
    function markAsImportant(event) {
        if (event.type == "click") {
            TASK_DETAIL_HEADER_CONTAINER.innerHTML = "";
            for (let index = 0; index < listOfTask.length; index++) {
                if (listOfTask[index].id == event.currentTarget.id) {
                    if (listOfTask[index].isImportant == false) {
                        listOfTask[index].isImportant = true;
                        listOfTask[index].categoryIds.splice(0, 0, 2);
                    } else {
                        listOfTask[index].isImportant = false;
                        for (let i = 0; i < listOfTask[index].categoryIds.length; i++) {
                            if (listOfTask[index].categoryIds[i] == 2) {
                                listOfTask[index].categoryIds.splice(i, 1);
                            }
                        }
                    }
                    let addedTask = saveTask(listOfTask[index], "POST", "task");
                    addedTask.then(renderAllTask());
                    renderTaskDetailContainer(listOfTask[index]);
                }
            }
        }
    }

    /**
     * It creates a div element, then creates a child div element, then creates a child input element,
     * then creates a child div element, then creates a child div element, then appends the child div
     * element to the parent div element, then appends the child input element to the parent div
     * element, then appends the child div element to the parent div element, then appends the parent
     * div element to the parent div element.
     * @param task - {
     */
    function renderTaskDetailContainer(task) {
        const detailHeaderTitle = createElement("div", { id: "", className: "detail-header-title-wrapper" });
        const inputContainer = createElement("div", { id: "", className: "task-content" });
        const inputSpace = createElement("input", { id: "user-selected-task", className: "" });
        inputSpace.type = "input";
        inputSpace.value = task.name;
        generateCompletedTaskDecoration(task, inputSpace);
        inputContainer.appendChild(inputSpace);
        detailHeaderTitle.appendChild(generateCompletedTaskIcon(task));
        detailHeaderTitle.appendChild(inputContainer);
        detailHeaderTitle.appendChild(generateImportantTaskIcon(task));
        TASK_DETAIL_HEADER_CONTAINER.appendChild(detailHeaderTitle);
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
    function generateImportantTaskIcon(task) {
        const starIconContainer = createElement("div", { id: task.id, className: "star-icon" });
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
    function generateCompletedTaskIcon(task) {
        const radioButtonContainer = createElement("div", { id: task.id, className: "task-radio" });
        const i = document.createElement("i");
        i.id = task.id;
        if (task.isCompleted == true) {
            radioButtonContainer.classList.add("task-radio-mark");
            i.className = "fa-sharp fa-solid fa-circle-check";
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
        TASK_DETAIL_HEADER_CONTAINER.innerHTML = "";
        for (let index = 0; index < listOfTask.length; index++) {
            if (listOfTask[index].id == event.currentTarget.id) {
                selectedTask = listOfTask[index];
                openSidePanel(selectedTask);
                renderTaskDetailContainer(selectedTask);
            }
        }
    }

    /**
     * The function adds notes to the selected task.
     * @param event - the event that triggered the function
     */
    function addNotes() {
        selectedTask.note = INPUT_FOR_ADD_NOTE.value;
        let addedTask = saveTask(selectedTask, "POST", "task");
        addedTask.then(renderAllTask());
    }

    /**
     * If the event type is a click, then change the id of the DETAILED_TASK_CONTAINER to
     * task-detail-container-hide-display and change the class of the CENTER_RIGHT_CONTAINER to
     * center-right-container.
     * @param event - the event that is being listened for
     */
    function closeSidePanel(event) {
        if (event.type == "click") {
            if (CENTER_RIGHT_CONTAINER.className == "center-container") {
                CENTER_RIGHT_CONTAINER.className = "center-right-container";
            } else {
                CENTER_RIGHT_CONTAINER.className = "center-full-container";
            }
            DETAILED_TASK_CONTAINER.id = "task-detail-container-hide-display";
        }
    }

    /**
     * It's a function that hides the detailed task container when the user clicks the close button.
     */
    function close() {
        DETAILED_TASK_CONTAINER.id = "task-detail-container-hide-display";
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
