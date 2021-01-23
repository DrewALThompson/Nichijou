
// CALENDAR FUNCTIONS

let tblbody = document.getElementById('calbody'),
  crntDate = new Date(),
  crntMonth = crntDate.getMonth(),
  crntYear = crntDate.getFullYear(),
  sltYr = document.getElementById('year'),
  sltMnth = document.getElementById('month'),
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function next(){
  if (crntMonth === 11){
      crntYear++;
      crntMonth = 0;
  } else {
      crntMonth++;
  }
  calendar(crntYear, crntMonth);
}

function previous(){
    if (crntMonth === 0){
        crntYear--;
        crntMonth = 11;
    } else {
        crntMonth--;
    }
    calendar(crntYear, crntMonth);
}

function year(){
    crntYear = parseInt(sltYr.value);
    calendar(crntYear, crntMonth);
}

function Month(){
    crntMonth = parseInt(sltMnth.value);
    calendar(crntMonth, crntYear);
}

function previousDateDays(){
  if (crntMonth === 0){
    let m = 12;  
    //for  whatever reason this was going global and changing crntMonth to 12;
    return new Date(crntYear, m, 0).getDate();
  } else {
      crntMonth -= 2;
      return new Date(crntYear, crntMonth, 0).getDate();
  }
}

function calVal(yr, mth){
    if (mth === undefined || yr === undefined){
        tblbody.innerHTML = 'Please enter a month and a year';
        return console.log('error')
    }
}

function calendar(yr, mth){
    calVal(yr, mth);
    let calDate = new Date(yr, mth);
    let dOW = calDate.getDay();
    // day of week
    let dIM = new Date(yr, (mth + 1), 0).getDate();
    let prev = previousDateDays();
    let date = 1;
    let pM = prev - dOW + 1;
    tblbody.innerHTML = '';
    for(let i = 0; i < 5; i++){
      let tblRow = document.createElement('tr');
      for(let j = 0; j < 7; j++){
          if(i === 0 && j < dOW){
              let block = document.createElement('td');
              let blockDate = document.createTextNode(pM);
              block.appendChild(blockDate);
              tblRow.appendChild(block);
              pM++;
          } else if (date > dIM){
              date = 1;
              let block = document.createElement('td');
              let blockDate = document.createTextNode(date);
              block.appendChild(blockDate);
              tblRow.appendChild(block);
              date++
          } else {
            let block = document.createElement('td');
            let blockDate = document.createTextNode(date);
            if (yr === crntYear && mth === crntMonth && date === crntDate.getDate()){
                block.setAttribute('id', 'today');
            }
            block.appendChild(blockDate);
            tblRow.appendChild(block);
            date++;
          }
      }
      tblbody.appendChild(tblRow);
    }
}

// CALENDAR FUNCTIONS

// DOMLOAD FUNCTION

document.addEventListener('DOMContentLoaded', () =>{
  calendar(crntYear, crntMonth);
})

// DOMLOAD FUNCTION

// Possible Useful functions

// function futureDateDays(){
//     let mnth;
//     if (crntMonth === 11){
//       crntMoth = 1;
//       return new Date(crntYear, crntMonth, 0).getDate();
//     } else {
//         crntMonth += 2;
//         return new Date(crntYear, crntMonth, 0).getDate();
//     }
// }
// realized I don't need this keeping in case
