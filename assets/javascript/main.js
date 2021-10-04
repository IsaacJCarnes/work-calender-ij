console.log(moment());
console.log(moment("getHours"));
console.log(moment().utcOffset('+2000').format('YYYY-MM-DD HH:mm'));
const container = document.getElementById("container");
const currentDay = document.getElementById("currentDay");
currentDay.textContent = moment().format("dddd, MMMM Do");
