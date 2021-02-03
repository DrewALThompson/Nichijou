
// CALENDAR FUNCTIONS

let tblbody = document.getElementById('calbody'),
  crntDate = new Date(),
  crntMonth = crntDate.getMonth(),
  crntYear = crntDate.getFullYear(),
  sltYr = document.getElementById('year'),
  sltMnth = document.getElementById('month');

function next(){
  if (sltMnth.value === '11'){
      nxtY = parseInt(sltYr.value) + 1;
      nxtM = 0;
  } else {
      nxtM = parseInt(sltMnth.value) + 1;
      nxtY = parseInt(sltYr.value);
  }
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
    console.log('this is working')
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
            if (crntYear == parseInt(sltYr.value) && crntMonth == parseInt(sltMnth.value) && date == crntDate.getDate()){
                block.setAttribute('id', 'today');
            }
            block.appendChild(blockDate);
            tblRow.appendChild(block);
            date++;
          }
      }
      tblbody.appendChild(tblRow);
    }
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(json => {
      eraser();
      json.forEach((jsonE) =>{
          buildEvent(jsonE);
      })
    })
}

// CALENDAR FUNCTIONS

// LOGIN BUTTON

let userButton = document.getElementsByClassName('userbtn')[0],
    loginModal = document.getElementById('login'),
    logoutModal = document.getElementById('logout'),
    x1 = document.getElementsByClassName("close")[0],
    x2 = document.getElementsByClassName("close")[1],
    loginSub = document.getElementById('loginForm'),
    signupSub = document.getElementById('signupForm'),
    logoutSubY = document.getElementById('logoutYes'),
    logoutSubN = document.getElementById('logoutNo'),
    eButton = document.getElementById('ebtn'),
    addEModal = document.getElementById('addEModal'),
    addEClose = document.getElementById('aEC')

eButton.onclick = () => {
    addEModal.style.display = 'block';
}

function loginCloser(){
    loginModal.style.display = 'none';
}

x1.onclick = loginCloser;

x2.onclick = function(){
    logoutModal.style.display = 'none';
}

addEClose.onclick = function(){
    addEModal.style.display = 'none';
}

window.onclick = function(e) {
    if (e.target == loginModal) {
      loginModal.style.display = "none";
      userButton.setAttribute('id', 'loginbtn');
    } else if (e.target == logoutModal){
      logoutModal.style.display = 'none';
      userButton.setAttribute('id', 'logoutbtn');
    } else if (e.target == addEModal){
        addEModal.style.display = 'none';
    }
  }

function loginForm(){
    loginModal.style.display = 'block';
}

function logoutForm(){
    logoutModal.style.display = 'block';
}


userButton.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (userButton.id === 'loginbtn'){
        loginForm();
    } else if (userButton.id === 'logoutbtn'){
        logoutForm();
    }
}

loginSub.addEventListener('submit', (e) => {
    e.preventDefault();
    let lUsername = document.getElementById('loginUsername').value,
        lPassword = document.getElementById('loginPassword').value;
    let user = new UserLoginData(lUsername, lPassword);
    fetch('http://localhost:3000/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        window.localStorage.setItem('id', data.id);
        console.log(window.localStorage.getItem('id'));
        loginCloser();
        calendar(parseInt(crntYear), parseInt(crntDate.getMonth()));
    })
    .catch((error) => {
        console.error(error);
    })

})
    

signupSub.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let sUsername = document.getElementById('signupUsername').value,
        sPassword = document.getElementById('signupPassword').value,
        sPasswordConfirmation = document.getElementById('passwordConfirmation').value;
    let user = new UserSignupData(sUsername, sPassword, sPasswordConfirmation);
    console.log(user)
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        window.localStorage.setItem('id', data.id)
    })
    .catch((error) => {
        console.error(error);
    })
})


class UserSignupData {
    constructor(username, password, password_confirmation){
        this.username = username;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
}

class UserLoginData {
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
}





// LOGIN BUTTON

// DOMLOAD FUNCTION

let notesbtn = document.getElementById('notesbtn');
let homebtn = document.getElementById('homebtn');
let drawbtn = document.getElementById('drawbtn');
let eventHolder = document.getElementById('wipe');
let tmpr;

function eraser(){
    if (eventHolder.hasChildNodes){
        while (eventHolder.hasChildNodes()) {
            eventHolder.removeChild(eventHolder.firstChild);
          }
    }
}


function buildEvent(jsonE){
    if (jsonE.user_id === parseInt(window.localStorage.getItem('id'))){
        let timeSpread = datetimeSpreader(jsonE),
        dTM = timeSpread[1],
        eventCont = document.createElement('div'),
        eventHeader = document.createElement('div'),
        timeCreated = document.createElement('div'),
        eventNotes = document.createElement('div'),
        deleteBtn = document.createElement('div');
        deleteBtn.classList.add('deleteBtn');
        eventHeader.classList.add('eHead');
        timeCreated.classList.add('timeC');
        eventNotes.classList.add('eNotes');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = (e) => {
            console.log('deletebtn click works')
        }
        eventHeader.innerHTML = `-${jsonE.title}-`;
        timeCreated.innerHTML = timeSpread[0];
        eventNotes.innerHTML = `${jsonE.notes}`;
        if (parseInt(dTM[0]) === parseInt(sltYr.value) && parseInt(dTM[1]) === parseInt(sltMnth.value) + 1){
            insertEvent(dTM, jsonE);  
        }
        eventCont.appendChild(eventHeader);
        eventCont.appendChild(eventNotes);
        eventCont.appendChild(timeCreated);
        eventCont.appendChild(deleteBtn);
        eventCont.classList.add('event');
        eventHolder.appendChild(eventCont);
    }
}

function insertEvent(dTM, jsonE){
    tmpr = parseInt(dTM[2]);
    let dateNode = document.getElementById(`date${tmpr}`);
    let dNP = dateNode.parentElement;
    let eventModal = document.getElementById(`modal${tmpr}`)
    if (dNP.contains(eventModal)){
        let calEdate = document.createElement('div');
        calEdate.innerHTML = `${jsonE.title}`;
        calEdate.classList.add('calDateEvent');
        eventModal.children[0].appendChild(calEdate);
    } else {
        let eModal = document.createElement('div'),
            eModalContent = document.createElement('div'),
            eModalClose = document.createElement('div'),
            eModalViewer = document.createElement('div'),
            calEdate = document.createElement('div');
        eModal.classList.add('eModal');
        eModalContent.classList.add('eModal-content');
        eModalClose.classList.add('eViewClose');
        eModalViewer.classList.add('eBtn');
        calEdate.classList.add('calDateEvent');
        eModal.setAttribute('id', `modal${tmpr}`);
        eModalClose.innerHTML = '&times;';
        eModalViewer.innerHTML = '&#x2b;';
        eModalViewer.onclick = (e) => {
            let parTd = e.target.parentElement;
            parTd.children[2].style.display = 'block';
        }
        eModal.onclick = (e) => {
            eModal.style.display = 'none';
        }
        eModalClose.onclick = (e) => {
            eModal.style.display = 'none';
        }
        calEdate.innerHTML = `${jsonE.title}`;
        eModalContent.appendChild(eModalClose);
        eModalContent.appendChild(calEdate);
        eModal.appendChild(eModalContent);
        dNP.appendChild(eModalViewer)
        dNP.appendChild(eModal);    
    }
}

function datetimeSpreader(jsonE){
    let time = jsonE.datetime_of;
    toString(time);
    let split = time.split('T');
    let dMY = split[0].split('-');
    let hM = split[1].split('.')[0].split(':');
    if (hM[0] == '00' && hM[1] == '00'){
        return [`${dMY[1]}/${dMY[2]}/${dMY[0]}`, dMY, hM]
    } else {
        return [`${dMY[1]}/${dMY[2]}/${dMY[0]} at ${hM[0]}:${hM[1]}`, dMY, hM]
    }
}


document.addEventListener('DOMContentLoaded', () =>{
  if (window.localStorage.getItem('id') !== null){
      calendar(crntYear, crntDate.getMonth());
  } else {
      loginForm();
  }
  console.log(window.localStorage)
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
