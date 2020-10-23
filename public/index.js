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

function sendAssesment() {
  console.log("hello");
}
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
