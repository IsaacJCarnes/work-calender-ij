const container = document.getElementById("container");
const currentDay = document.getElementById("currentDay");
currentDay.textContent = moment().format("dddd, MMMM Do");

const workDay = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var taskMessages = ["", "", "", "", "", "", "", "", ""];
var stringMessages = localStorage.getItem("messages");

if(stringMessages == null){
    updateStorage(); //Creates string version of taskMessages in localstorage
} else {
    //Sets message array to their local storage counterparts
    taskMessages = JSON.parse(stringMessages);
}

function updateStorage(){ //updates stringMessages and localStorage to reflect taskMessages
    stringMessages = JSON.stringify(taskMessages);
    localStorage.setItem("messages", stringMessages);
}

function base24To12(time){ //Changes base 24 time to base 12 time with 'AM' or 'PM'
    if(time < 12){
        return time + "AM";
    } else if(time == 12){
        return time + "PM";
    } else {
        return time%12 + "PM";
    }
}

for(i = 0; i < workDay.length; i++){
    var timeBlock = document.createElement("div");
    timeBlock.classList = "time-block row"; //css class and width data

    var hour = document.createElement("div");
    hour.classList = "hour col-1"; //css class and width data
    hour.textContent = base24To12(workDay[i]);

    var taskBlock = document.createElement("textarea"); //textarea so it can be written in
    if(workDay[i] < Number(moment().format("HH"))){ //Displays hour with suffix
        taskBlock.classList = "past col-6"; //css class and width data
    } else if(workDay[i] == Number(moment().format("HH"))){
        taskBlock.classList = "present col-6"; //css class and width data
    } else {
        taskBlock.classList = "future col-6"; //css class and width data
    }
    taskBlock.value = taskMessages[i];
    taskBlock.id = i; //id set so it can be refrenced later

    var saveBtn = document.createElement("button");
    saveBtn.classList = "saveBtn col-1"; //css class and width data
    saveBtn.dataset.position = i;

    saveBtn.onclick = function(){
        //Changes the taskMessages array to hold the new text
        taskMessages[this.dataset.position] = document.getElementById(this.dataset.position).value;
        //Update localstorage
        updateStorage();
    };

    timeBlock.appendChild(hour);
    timeBlock.appendChild(taskBlock);
    timeBlock.appendChild(saveBtn);
    container.appendChild(timeBlock);
}
