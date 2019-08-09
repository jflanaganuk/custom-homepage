var container = document.querySelector('.floatingTimerContainer');

setInterval(function(){
    getTime();
}, 1000);
getTime();

function getTime(){
    var timespan = countdown(new Date(2019, 8, 26, 23));
    container.innerHTML = `WoW Classic Global release in: ${timespan.days} days ${timespan.hours} hours ${timespan.minutes} minutes ${timespan.seconds} seconds`;
}