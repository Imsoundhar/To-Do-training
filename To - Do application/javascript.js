
function currentDate() {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date();
    let day = weekdays[date.getDay()];
    let month = months[date.getMonth()];
    let currentDate = day + ", " + month + " " + date.getDate();
   
    document.getElementById('day').innerHTML = currentDate;
}

var userListInput = document.getElementById("new-list-item");
userListInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const divListElement = document.createElement('div');
        const newListTag = document.createElement('li');
        const node = document.createTextNode(userListInput.value);
        divListElement.innerHTML = '<i class="fa-solid fa-list"/>';
        divListElement.appendChild(node);
        newListTag.appendChild(divListElement);
        var list = document.getElementById("my-list");
        list.appendChild(newListTag);
        list.insertBefore(newListTag, list.children[0]);
    }});

function leftContent() {
    const mydayTest = document.getElementById("test");
    if (mydayTest.innerHTML === document.getElementById("right-myday").innerHTML) {
        document.getElementById("right-myday").innerHTML = mydayTest.innerHTML;
    } else {
        console.log("else if working");
    }
}