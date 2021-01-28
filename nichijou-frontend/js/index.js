
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
    let naDate = 1;
    let pM = prev - dOW + 1;
    tblbody.innerHTML = '';
    for(let i = 0; i < 6; i++){
      let tblRow = document.createElement('tr');
      for(let j = 0; j < 7; j++){
          if(i === 0 && j < dOW){
              let block = document.createElement('td');
              let blockDate = document.createElement('p');
              blockDate.innerHTML = pM;
              blockDate.setAttribute('id', `pdate${pM}`)
              blockDate.classList.add('dateNum');
              block.classList.add('naDate')
              block.appendChild(blockDate);
              tblRow.appendChild(block);
              pM++;
          } else if (date > dIM){
              let block = document.createElement('td');
              let blockDate = document.createElement('p');
              blockDate.innerHTML = naDate;
              blockDate.setAttribute('id', `fdate${naDate}`)
              blockDate.classList.add('dateNum');
              block.classList.add('naDate')
              block.appendChild(blockDate);
              tblRow.appendChild(block);
              naDate++
          } else {
            let block = document.createElement('td');
            let blockDate = document.createElement('p');
            blockDate.innerHTML = date;
            blockDate.setAttribute('id', `date${date}`)
            blockDate.classList.add('dateNum');
            if (yr === parseInt(sltYr.value) && mth === parseInt(sltMnth.value) && date === crntDate.getDate()){
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

// LOGIN BUTTON

let userButton = document.getElementsByClassName('userbtn')[0],
    loginModal = document.getElementById('login'),
    logoutModal = document.getElementById('logout'),
    x1 = document.getElementsByClassName("close")[0],
    x2 = document.getElementsByClassName("close")[1];


x1.onclick = function(){
    loginModal.style.display = 'none';
}

x2.onclick = function(){
    logoutModal.style.display = 'none';
}

window.onclick = function(e) {
    if (e.target == loginModal) {
      loginModal.style.display = "none";
      userButton.setAttribute('id', 'loginbtn');
    } else if (e.target == logoutModal){
      logoutModal.style.display = 'none';
      userButton.setAttribute('id', 'logoutbtn');
    }
  }

function loginForm(){
    loginModal.style.display = 'block';
    userButton.setAttribute('id', 'logoutbtn');
}

function logoutForm(){
    logoutModal.style.display = 'block';
    userButton.setAttribute('id', 'loginbtn')
}


userButton.onclick = (e) => {
    e.preventDefault;
    if (userButton.id === 'loginbtn'){
        loginForm();
    } else if (userButton.id === 'logoutbtn'){
        logoutForm();
    }
}


// LOGIN BUTTON

// DOMLOAD FUNCTION

let notesbtn = document.getElementById('notesbtn');
let homebtn = document.getElementById('homebtn');
let drawbtn = document.getElementById('drawbtn');
let eventHolder = document.getElementById('eventsholder');

function buildEvent(jsonE){
    let timeSpread = datetimeSpreader(jsonE);
    let eventCont = document.createElement('div');
    let eventHeader = document.createElement('div');
    let timeCreated = document.createElement('div');
    let eventNotes = document.createElement('div');
    eventHeader.classList.add('eHead');
    timeCreated.classList.add('timeC');
    eventNotes.classList.add('eNotes');
    eventHeader.innerHTML = `-${jsonE.title}-`;
    timeCreated.innerHTML = timeSpread;
    eventNotes.innerHTML = `${jsonE.notes}`;
    eventCont.appendChild(eventHeader);
    eventCont.appendChild(eventNotes);
    eventCont.appendChild(timeCreated);
    eventCont.classList.add('event');
    eventHolder.appendChild(eventCont);
}

function datetimeSpreader(jsonE){
    let time = jsonE.datetime_of;
    toString(time);
    let split = time.split('T');
    let dMY = split[0].split('-');
    let hM = split[1].split('.')[0].split(':');
    let timeString;
    if (hM[0] == '00' && hM[1] == '00'){
        return `${dMY[1]}/${dMY[2]}/${dMY[0]}`
    } else {
        return `${dMY[1]}/${dMY[2]}/${dMY[0]} at ${hM[0]}:${hM[1]}`
    }
}

document.addEventListener('DOMContentLoaded', () =>{
  calendar(crntYear, crntMonth);

  fetch('http://localhost:3000/events')
  .then(res => res.json())
  .then(json => {
      json.forEach((jsonE) =>{
          buildEvent(jsonE);
      })
  })
  
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
