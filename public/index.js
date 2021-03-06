var has_symptoms = false;
// let UserId = []

var currentDate = new Date().toISOString().slice(0, 10);
if (document.getElementById("activityCalendar")) {
  document.getElementById("activityCalendar").min = currentDate;
}

function showOptions(activityType) {
  closeOpenOptions();
  let option = document.getElementById(activityType);
  if (option.hidden === true) {
    option.hidden = false;
  } else {
    option.hidden = true;
  }
}

function closeOpenOptions() {
  let typeArray = [eventOptions, courseOptions, workOptions];
  typeArray.forEach((type) => {
    if (type.hidden === false) {
      type.hidden = true;
    }
  });
}



///////////////////////////////////////////////////////////////////////// Assessment
function sendAssesment() {
  let response = {};
  // let inputs = document
  //   .getElementById("questions")
  //   .getElementsByTagName("input");
  let inputs = document.getElementsByClassName("checkbox");

  var listOfSymtoms = "";
  [...inputs].forEach((element) => {
    response[element.id] = element.checked;
    if(element.checked){
      listOfSymtoms = listOfSymtoms+element.id+" | "

    }
  });

  let failedAssessment = Object.values(response).includes(true);

  console.log(listOfSymtoms);
  console.log(has_symptoms);
  console.log(localStorage.getItem("userId"));
  
  // Conditions to run when Backend response is returned
  if (document.getElementById("no_symptoms").checked == true) {
    sendSelftAssessment(has_symptoms, listOfSymtoms);
    
    window.location.href = "./Greencard.html";
  } else if (failedAssessment) {
    sendSelftAssessment(has_symptoms, listOfSymtoms);
    // call function to send notifications
    createNotification();
    window.location.href = "./Redcard.html";
  } else {
    alert("No Items are selected");
  }
}

function sendSelftAssessment(has_symptoms, listOfSymtoms){
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const timeNow = today.toUTCString();

  const credential ={
    userId: localStorage.getItem("userId"),
    date: timeNow,
    haveSymptoms: has_symptoms,
    listSymtoms: listOfSymtoms
  }

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credential)
  };

  fetch('/assessment', options);

}

//////////////////////////////medical history/////////////////////////////
async function addMedicalHistory() {
    let hashMap = {};
    let inputs = document.getElementsByClassName("checkbox");
    let other = document.getElementById("condition").value;
    [...inputs].forEach((element) => {
        hashMap[element.id] = element.checked;
    });

    console.log(hashMap);

    const credential = {
        userId: localStorage.getItem("userId"),
        medicalHistory: hashMap,
        other: other
    };
    
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credential)
    };
    console.log(options);

    const res = await fetch('/medical', options);
    alert("Thank you for submitting your medical history!");
    window.location.href = "./home.html";
}

//////////////////////////////////////////////////////////////////////////



//////////////////////////////create notifications////////////////////////

function createNotification(){
  //get all the activities the user has been to
      //SELECT activityId from activity where userId=id // return list of activities
  //get all the users who have been to the same activities
      //for each activity get list of users   select 
  //create database table
  //record new notification for all of these users

  //notifications: userId, activityId, viewed, date, 
  console.log("sending notification");

  const credential ={
    userId: localStorage.getItem("userId")
  }

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credential)
  };

  fetch('/notification', options);


}

async function getnotification(){
  // console.log("in getNotification")
  const credential ={
    userId: localStorage.getItem("userId")
    
  }

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credential)
  };

  const resp = await fetch('/getnotification', options);
  
  const callback = await resp.json();
  // console.log("in callback: "+callback.status);
  // console.log("ans: "+callback.body);
  // let len = callback.body.length;
  // console.log(len);
  let msj ="";
    // len=0;

    try {
      if (typeof callback.body[0].userId !== "undefined") {
        let len = callback.body.length;
        for(let i=0; i<len; i++){
          msj= msj+"Someone at the activity '"+callback.body[i].activityId+"' have presented suspicious symptoms on "+callback.body[i].timeDate+". \n\n";
        }
        msj = msj + "\nIf you present any symptoms report it immediately. \n";
        
      }
    } catch (err) {
      // noti.push(result);
      msj="You have 0 notifications";
 
    }

  // if(len>0){
    
  //   for(let i=0; i<len; i++){
  //     msj= msj+"Someone at the activity '"+callback.body[i].activityId+"' have presented suspicious symptoms on "+callback.body[i].timeDate+". \n\n";
  //   }
  //   msj = msj + "\nIf you present any symptoms report it immediately. \n";
  //   // console.log(msj);
  // }else{
  //    msj="You have 0 notifications";
  // }

  document.getElementById("notiId").value = msj;
  



}


///////////////////////////////////////////////////////////////////////////////////////////////
function questionCheck(params) {
  if (document.getElementById(params).checked === true) {
    document.getElementById("no_symptoms").disabled = true;
  } else {
    document.getElementById("no_symptoms").disabled = false;
  }
}


function symptomCheck() {
  if(has_symptoms===false){
     has_symptoms = true;
  }else{
    has_symptoms = false;
  }
  console.log(has_symptoms);
  let inputs = document
    .getElementById("questions")
    .getElementsByTagName("input");

  if (document.getElementById("no_symptoms").checked === true) {
    [...inputs].forEach((element) => {
      element.checked = false;//remove this and they stay checked?
      element.disabled = true;
    });
  } else {
    [...inputs].forEach((element) => {
      element.disabled = false;
    });
  }
}
////////////////////////add activity///////////////
function addActivity(){
  var allCheck = true;
  
  var event = document.getElementById('Event').checked;
  var course = document.getElementById('Course').checked;
  var work = document.getElementById('Work').checked;

  var isOnlineNo = document.getElementById('No').checked;
  var isOnlineYes = document.getElementById('Yes').checked;
  var activityType
  var eventName = ""
  var timeStart = ""
  var timeEnd = ""

  // console.log('event'+event+'course'+course+"work"+work+""+isOnlineYes+""+isOnlineNo);
  // (event===true || course===true || work===true) &&

  if((event===false && course===false && work===false) ){
    // alert("Check all fields before submitting");
    allCheck = false;
  }
  if((isOnlineNo===false && isOnlineYes===false)){
    allCheck = false;
  }
  if(event===true){
    
    activityType='event'
    eventName = document.getElementById('inputValueEvent').value;
    timeStart = document.getElementById('activityCalendar').value;
    timeEnd = document.getElementById('timeEndEvent').value;
    

  }
  if(course===true){
    eventName = document.getElementById('inputValueCourse').value;
    // timeStart = document.getElementById('activityCalendar').value;
    // timeEnd = document.getElementById('timeEndCourse').value;
    activityType='course'
    console.log(activityType);
  }
  if(work===true){
    eventName = document.getElementById('inputValueWork').value;
    // timeStart = document.getElementById('activityCalendar').value;
    // timeEnd = document.getElementById('timeEndWork').value;
    activityType='work'
    console.log(activityType)
  }

  if(eventName === ""){
    allCheck = false;
  }

  
  // console.log(eventName+""+timeStart+""+timeEnd);
  if(allCheck===false){
    alert("Check all fields before submitting");
  }
  else{
    
    var isOnline
    if(isOnlineYes===false){
      isOnline = false;
    }
    else{
      isOnline = true;
    }
    
    addActivityData={
      userId: localStorage.getItem("userId"),
      activityType: activityType,
      isOnline: isOnline,
      activityId: eventName,
      timeStart: timeStart,
      timeEnd: timeEnd
    }

    sendActivity(addActivityData);
    alert("Activity added successfully");
    location.replace("http://localhost:3000/home.html");
  }
}


function sendActivity(credential){

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credential)
  };

  fetch('/activity', options);

}

///////////////////////////////////////////////////////////////////////////////
var user;
var pass;
async function myFunction() {
  console.log("hey");
  user = document.getElementById("username").value;
 
  pass = document.getElementById("password").value;
  

  if (pass == "" || user == "") {
    alert("Username and password must be filled out");
    return false;
  }

  credential = {
    username: user,
    password: pass
  }

  //pass to server to check in database
  // const response = await fetch('/login' );
  // const myresponse = await response.json();
  // console.log(myresponse);

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credential)
  };

  const resp = await fetch('/login', options);
  
  const callback = await resp.json();
  if(callback.status == true){
    // UserId.push(callback.userId);
    // console.log(UserId[0]);
    localStorage.setItem("userId",callback.userId);
    location.replace("http://localhost:3000/home.html")
  }
  else{
    alert("Username or Password no valid");
  }
  // console.log(callback);

}

// function sendAssesment() {
//   console.log("hello");
// }

// const test = 1.3;


// const test2 = 5.5;
// const data = { user, test2 };
// const options = {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
// };
// fetch('/api', options).then(response => {
//     console.log("here")
//     console.log(response.body);// to get the respose in nice text the function could be async and use await vid 2.3// or it could be another then in the client
// });


//video 2.3 send and receive data
//video 2.4 database