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
  let inputs = document
    .getElementById("questions")
    .getElementsByTagName("input");

  [...inputs].forEach((element) => {
    response[element.id] = element.checked;
  });

  let failedAssessment = Object.values(response).includes(true);

  console.warn(response); // response sent to backend

  // Conditions to run when Backend response is returned
  if (document.getElementById("no_symptoms").checked == true) {
    window.location.href = "./Greencard.html";
  } else if (failedAssessment) {
    window.location.href = "./Redcard.html";
  } else {
    alert("No Items are selected");
  }
}

function questionCheck(params) {
  if (document.getElementById(params).checked === true) {
    document.getElementById("no_symptoms").disabled = true;
  } else {
    document.getElementById("no_symptoms").disabled = false;
  }
}

function symptomCheck() {
  let inputs = document
    .getElementById("questions")
    .getElementsByTagName("input");

  if (document.getElementById("no_symptoms").checked === true) {
    [...inputs].forEach((element) => {
      element.checked = false;
      element.disabled = true;
    });
  } else {
    [...inputs].forEach((element) => {
      element.disabled = false;
    });
  }
}

var user;
var pass;
function myFunction() {
  user = document.getElementById("username").value;
  console.log(user);
  pass = document.getElementById("password").value;
  console.log(pass);

  if (pass == "" || user == "") {
    alert("Username and password must be filled out");
    return false;
  }
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
//     console.log(response);// to get the respose in nice text the function could be async and use await vid 2.3
// });
