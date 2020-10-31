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
  // console.log(response);
  // console.warn(response); // response sent to backend

  /////send to backend
  // const timeElapsed = Date.now();
  // const today = new Date(timeElapsed);
  // const timeNow = today.toUTCString();

  // const credential ={
  //   userId: localStorage.getItem("userId"),
  //   date: timeNow,
  //   haveSymptoms: has_symptoms,
  //   listSymtoms: listOfSymtoms
  // }

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(credential)
  // };

  // fetch('/assessment', options);



  // Conditions to run when Backend response is returned
  if (document.getElementById("no_symptoms").checked == true) {
    sendSelftAssessment(has_symptoms, listOfSymtoms);
    console.log("sent");
    window.location.href = "./Greencard.html";
  } else if (failedAssessment) {
    sendSelftAssessment(has_symptoms, listOfSymtoms);
    console.log("sent2");
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
///////////////////////////////////////////////////////////////////////////////
var user;
var pass;
async function myFunction() {
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