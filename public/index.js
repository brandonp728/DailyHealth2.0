

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
  // .then(response => {
  //   console.log("here");

  //   console.log(response.status);// to get the respose in nice text the function could be async and use await vid 2.3// or it could be another then in the client
  // });
  const callback = await resp.json();
  if(callback.status == true){
    location.replace("http://localhost:3000/home.html")
  }
  console.log(callback);

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
//     console.log("here")
//     console.log(response.body);// to get the respose in nice text the function could be async and use await vid 2.3// or it could be another then in the client
// });


//video 2.3 send and receive data
//video 2.4 database