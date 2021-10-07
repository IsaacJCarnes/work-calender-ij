console.log(moment());
console.log(moment().utcOffset('+2000').format('YYYY-MM-DD HH:mm'));
const container = document.getElementById("container");
const currentDay = document.getElementById("currentDay");
currentDay.textContent = moment().format("dddd, MMMM Do");

const workDay = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var taskMessages = ["", "", "", "", "", "", "", "", ""];
var stringMessages = localStorage.getItem("messages");

if(stringMessages == null){
    updateDataset(); //Creates string version of taskMessages in localstorage
} else {
    //Sets message array to their local storage counterparts
    taskMessages = JSON.parse(stringMessages);
}

function updateDataset(){
    stringMessages = JSON.stringify(taskMessages);
    localStorage.setItem("messages", stringMessages);
    console.log(localStorage.getItem('messages'));
}

function base24To12(time){
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
    timeBlock.classList = "time-block row";

    var hour = document.createElement("div");
    hour.classList = "hour col-1";
    hour.textContent = base24To12(workDay[i]);

    var taskBlock = document.createElement("textarea");
    if(workDay[i] < Number(moment().format("HH"))){
        taskBlock.classList = "past col-6";
    } else if(workDay[i] == Number(moment().format("HH"))){
        taskBlock.classList = "present col-6";
    } else {
        taskBlock.classList = "future col-6";
    }
    taskBlock.value = taskMessages[i];
    taskBlock.id = i;

    var saveBtn = document.createElement("button");
    saveBtn.classList = "saveBtn col-1";
    saveBtn.dataset.position = i;

    saveBtn.onclick = function(){
        taskMessages[this.dataset.position] = document.getElementById(this.dataset.position).value;
        updateDataset();
    };

    timeBlock.appendChild(hour);
    timeBlock.appendChild(taskBlock);
    timeBlock.appendChild(saveBtn);
    container.appendChild(timeBlock);
}
