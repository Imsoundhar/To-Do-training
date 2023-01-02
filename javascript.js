
(function() {

    // var category = [
    //     {"id" : "user-list",
    //     "name" : "My day"},
    //     {"id" : "user-list", 
    //     "name" : "Important"}, 
    //     {"id" : "user-list", 
    //     "name" :"Planned"}, 
    //     {"id" : "user-list",
    //     "name" : "Assigned to me"}, 
    //     {"id" : "user-list",
    //     "name" : "Task"}
    // ];
    function init() {
        currentDate();
    }

    function currentDate() {
        const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date = new Date();
        let day = weekdays[date.getDay()];
        let month = months[date.getMonth()];
        let currentDate = day + ", " + month + " " + date.getDate();
        document.getElementById('day').innerHTML = currentDate;
    }
init();
})();


// const userInputLeft = document.getElementById("new-list-item");
// const userListUnorder = document.getElementById("user-list-unorder");
// const rightTaskInput = document.getElementById("right-task-input");

// userInputLeft.addEventListener('keypress', function(event) { 
//     if (event.key === 'Enter') {
//         const li = document.createElement('li');
//         const div = document.createElement('div');
//         div.className = 'user-list';
//         div.innerHTML =  '<i class="fa-solid fa-list"/>';
//         const p = document.createElement('p');
//         p.className = 'left-notes-title';
//         const node = document.createTextNode(userInputLeft.value);
//         p.innerHTML = node.textContent;
//         div.appendChild(p);
//         li.appendChild(div);
//         userListUnorder.appendChild(li);
//     } 
//     else {
//         console.log("else working");
//     }
// });

// rightTaskInput.addEventListener('keypress', function(event) {
//     if (event.key === 'Enter') {
//     }
// });



// function createLeftSideElement(userInputLeft) {
//     const div = document.createElement('div');
//     div.className = 'user-list';
//     div.innerHTML =  '<i class="fa-solid fa-list"/>';
//     const p = document.createElement('p');
//     p.className = 'left-notes-title';
//     const node = document.createTextNode(userInputLeft.value);
//     p.innerHTML = node.textContent;
//     div.appendChild(p);
//     li.appendChild(div);
// }
