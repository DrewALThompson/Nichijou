
// CALENDAR FUNCTIONS

let tblbody = document.getElementById('calbody'),
  crntDate = new Date(),
  crntMonth = crntDate.getMonth(),
  crntYear = crntDate.getFullYear();
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
  calendar(crntMonth, crntYear);
}

function previous(){
    if (crntMonth === 0){
        crntYear--;
        crntMonth = 11;
    } else {
        crntMonth--;
    }
    calendar(crntMonth, crntYear);
}

function year(){
    crntYear = parseInt(sltYr.value);
    calendar(crntMonth, crntYear);
}

function Month(){
    crntMonth = parseInt(sltMnth.value);
    calendar(crntMonth, crntYear);
}

function previousDateDays(){
  if (crntMonth === 0){
    crntMonth = 12;  
    return new Date(crntYear, crntMonth, 0).getDate();
  } else {
      crntMonth -= 2;
      return new Date(crntYear, crntMonth, 0).getDate();
  }
}

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

function calendar(mth, yr){
    let calDate = new Date(yr, mnth);
    let dOW = calDate.getDay();
    // day of week
    let dIM = new Date(yr, (mnth + 1), 0).getDate();
    let prev = previousDateDays();
    let date = 1;
    tblbody = '';
    for(let i = 0; i < 5; i++){
      let tblRow = document.createElement('tr');
      for(let ii = 0; ii < 7; ii++){
          let pM = prev - dOW + 1;
          if(i === 0 && ii < dOW){
              let block = document.createElement('td');
              let blockDate = document.createTextNode(pM);
              block.appendChild(blockDate);
              tblRow.appendChild(block);
              pM++
          } else if (date > dIM){
              date = 0;
              let block = document.createElement('td');
              let blockDate = document.createTextNode(date);
              block.appendChild(blockDate);
              tblRow.appendChild(block);
              date++
          } else {
            let block = document.createElement('td');
            let blockDate = document.createTextNode(date);
            if (yr === crntYear && mth === crntMonth && calDate.getDate() === crntDate.getDate()){
                block.classList.add('today');
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
  
})

// DOMLOAD FUNCTION
