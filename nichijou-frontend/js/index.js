
// CALENDAR FUNCTIONS

let tblbody = document.getElementById('calbody'),
  crntDate = new Date(),
  crntMonth = crntDate.getMonth(),
  crntYear = crntDate.getFullYear(),
  sltYr = document.getElementById('year'),
  sltMnth = document.getElementById('month'),
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function next(){
  if (sltMnth.value === '11'){
      nxtY = parseInt(sltYr.value) + 1;
      nxtM = 0;
  } else {
      nxtM = parseInt(sltMnth.value) + 1;
      nxtY = parseInt(sltYr.value);
  }
  console.log(nxtM, nxtY)
  calendar(nxtY, nxtM);
}

function previous(){
    if (sltMnth.value === '0'){
        prvY = parseInt(sltYr.value) - 1;
        prvM = 11;
    } else {
        prvM = parseInt(sltMnth.value) - 1;
        prvY = parseInt(sltYr.value);
    }
    console.log(prvY)
    calendar(prvY, prvM);
}

function year(){
    let yrC = sltYr.value
    let mnthC = sltMnth.value;
    calendar(yrC, mnthC);
}

function month(){
    let mnthC = sltMnth.value;
    let yrC = sltYr.value;
    calendar(yrC, mnthC);
}

function previousDateDays(){
  if (sltMnth.value === '0'){
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

function monthAndDay(yr, mth){
    sltYr.value = yr;
    sltMnth.value = mth;
}

function calendar(yr, mth){
    monthAndDay(yr, mth);
    calVal(yr, mth);
    let calDate = new Date(yr, mth);
    let dOW = calDate.getDay();
    // day of week
    let dIM = new Date(yr, (mth + 1), 0).getDate();
    let prev = previousDateDays();
    let date = 1;
    let pM = prev - dOW + 1;
    tblbody.innerHTML = '';
    for(let i = 0; i < 6; i++){
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
