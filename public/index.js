var currentDate = new Date().toISOString().slice(0, 10);
document.getElementById("activityCalendar").min = currentDate;

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
function redirect() {
  let q1 = document.getElementById("question1").checked;
  let q2 = document.getElementById("question2").checked;

  let failed = q1 || q2;

  console.warn(q1, q2);

  if (document.getElementById("no_symptoms").checked == true)
    window.location.href = "./Greencard.html";
  else if (failed) window.location.href = "./Redcard.html";
  else alert("No Items are selected");
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
