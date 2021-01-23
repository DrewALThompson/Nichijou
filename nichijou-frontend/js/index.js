
// CALENDAR FUNCTIONS

let tblbody = document.getElementById('calbody'),
  crntDate = new Date(),
  month = crntDate.getMonth(),
  year = crntDate.getFullYear();
  sltYr = document.getElementById('year'),
  sltMnth = document.getElementById('month'),
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function next() => {
  if (month === 11){
      year++;
      month = 0;
  } else {
      month++;
  }
  calendar(month, year);
}

function previous() => {
    if (month === 0){
        year--;
        month = 11;
    } else {
        month--;
    }
    calendar(month, year);
}

function year() => {
    year = parseInt(sltYr.value);
    calendar(month, year);
}

function month() => {
    month = parseInt(sltMnth.value);
    calendar(month, year);
}

function calendar(month, year){

}

// CALENDAR FUNCTIONS

// DOMLOAD FUNCTION

document.addEventListener('DOMContentLoaded', () =>{
  
})

// DOMLOAD FUNCTION
