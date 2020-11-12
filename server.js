const { request, response } = require('express');
const express = require('express');
const mariadb = require('mariadb');
const app = express();

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));//this is to receive json data


const pool = mariadb.createPool({
  host: 'dailyhealthdb.ccmgc85klflk.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password!',
  database: 'dailyhealthdb'
  //  connectionLimit: 5
});

app.post('/api', (request, response) => {
  console.log(request.body);
  response.json({
    status: 'successPaola'
  });
});
// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);

app.post('/login', (request, response) => {
  const data = request.body;
  const user = data.username;
  const pass = data.password;

  // console.log(user);

  const db = check(user, pass).then(arr => {

    const auxResponse = aux.pop();
    console.log("status: "+auxResponse.status);
    console.log("userId "+ auxResponse.userId);
    response.json({
      status: auxResponse.status,
      userId: auxResponse.userId
    })
  });
});

app.post('/assessment', (request, response) => {
  const data = request.body;
  const user = data.userId;
  const date = data.date;
  const hasSymptoms = data.haveSymptoms;
  const listSymtoms = data.listSymtoms;

  // console.log(user);

  const assess = assessment(user, date, hasSymptoms, listSymtoms).then(arr=>{
      response.json({
      status: true
    })
  }
  );
});

/**
 * addActivityData={
 * userId
      activityType: activityType,
      isOnline: isOnline,
      activityId: eventName,
      timeStart: timeStart,
      timeEnd: timeEnd
    }
 */

app.post('/activity', (request, response) => {
  const data = request.body;
  const userId = data.userId;
  const typeofactivity = data.activityType;
  const online = data.isOnline;
  const activityId = data.activityId;
  const timeStart = data.timeStart;
  const timeEnd = data.timeEnd;

  console.log(data);
  console.log("activity type "+typeofactivity);

  //save in database and respond to client
  const assess = addactivity(userId, typeofactivity, online, activityId, timeStart, timeEnd).then(arr=>{
      response.json({
      status: true
    })
  }
  );
});

app.post('/notification', (request, response) => {
  const data = request.body;
  const userId = data.userId;

  // console.log(user);
  //get all the notification for this user
  console.log("called create notification");

  const notification = createNotification(userId).then(arr => {    
    response.json({
      status: true,
    })
  });
});

app.post('/medical', (request, response) => {
  const data = request.body;
  const userId = data["userId"];
  const medicalHistory = data['medicalHistory'];
  const other = data["other"];

  const history = addMedicalHistory(userId, medicalHistory, other).then(arr=>{
    response.json({
    status: true
    })
  });
});

const dbcredentials = {
  host: 'dailyhealthdb.ccmgc85klflk.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password!',
  database: 'dailyhealthdb'
  //  connectionLimit: 5
}
let aux = []

async function addactivity(userId, typeofactivity, online, activityId, timeStart, timeEnd){
  let conn;
  try {
    conn = await pool.getConnection();
    // const select = "INSERT INTO myTable value (?, ?)"
    // const rows = await conn.query(select);
    	const res = await conn.query("INSERT INTO activity value (?, ?, ?, ?, ?, ?)", [userId, typeofactivity, online, activityId, timeStart, timeEnd]);
	    console.log(res); 

  } catch (err) {
    console.log(err);
    throw err;

  } finally {
    if (conn) return conn.end();
  }

}


//MedicalHistory
// historyId INT
// userId INT
// diabetes BOOL 
// highBloodPressure BOOL
// highCholesterol BOOL
// hypothyroidism BOOL
// cancer BOOL
// epilepsy BOOL
// asthma BOOL
// heartProblems BOOL
// kidneyDisease BOOL
// leukemia BOOL
// psoriasis BOOL
// angina BOOL
// stroke BOOL
// anemia BOOL 
// other varchar(500)
async function addMedicalHistory(userId, medicalHistory, other) {
  let conn;
  console.log(medicalHistory);
  const diabetes = medicalHistory["diabetes"];
  const bloodPressure = medicalHistory["high_blood_pressure"];
  const cholesterol = medicalHistory["high_cholesterol"];
  const hypothyroidism = medicalHistory["hypothyroidism"];
  const cancer = medicalHistory["cancer"];
  const epilepsy = medicalHistory["epilepsy"];
  const asthma = medicalHistory["asthma"];
  const heartProblems = medicalHistory["heart_problems"];
  const kidneyDisease = medicalHistory["kidney_disease"];
  const leukemia = medicalHistory["leukemia"];
  const psoriasis = medicalHistory["psoriasis"];
  const angina = medicalHistory["angina"];
  const stroke = medicalHistory["stroke"];
  const anemia = medicalHistory["anemia"];
  try {
    conn = await pool.getConnection();
    const res = await conn.query("INSERT INTO MedicalHistory (userId, diabetes, highBloodPressure, highCholesterol, hypothyroidism, cancer, epilepsy, asthma, heartProblems, kidneyDisease, leukemia, psoriasis, angina, stroke, anemia, other) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [parseInt(userId), diabetes, bloodPressure, cholesterol, hypothyroidism, cancer, epilepsy, asthma, heartProblems, kidneyDisease, leukemia, psoriasis, angina, stroke, anemia, other]);
    console.log(res);
  } catch(err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

async function assessment(user, date, hasSymptoms, listSymtoms){
  let conn;
  try {
    conn = await pool.getConnection();
    // const select = "INSERT INTO myTable value (?, ?)"
    // const rows = await conn.query(select);
    	const res = await conn.query("INSERT INTO assessment value (?, ?, ?, ?)", [user, date, hasSymptoms, listSymtoms]);
	    console.log(res); 

  } catch (err) {
    console.log(err);
    throw err;

  } finally {
    if (conn) return conn.end();
  }

  // return rows[0].Id;//what is this for? will comment

}

const check = async function login(user, pass) {
  //working login
  let conn;
  try {
    conn = await pool.getConnection();
    const select = "SELECT Id FROM Account where Email='" + user + "' AND Password='" + pass + "'";
    const rows = await conn.query(select);
    
    try {
      if (typeof rows[0].Id !== "undefined") {
        const varId = rows[0].Id;
        const output = {
          status : true,
          userId : varId
        }
        // aux.push(true);
        aux.push(output);
        console.log("has id of: " + rows[0].Id);
      }
    } catch (err) {
      const output = {
        status : false,
        userId : 0
      }
      aux.push(output);
      console.log("Credentials invalid")
    }

    // console.log("array[0]: "+aux[0]);



  } catch (err) {
    throw err;

  } finally {
    if (conn) return conn.end();
  }

  return rows[0].Id;

}

////////////////////notification code//////////
async function createNotification(userIdp){
  // console.log("in not function");
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const timeNow = today.toUTCString();


  let conn;
  try {
    conn = await pool.getConnection();
    const select = "SELECT activityId FROM activity where userId=" + userIdp ;//and is online=no
    const rows = await conn.query(select);
    console.log("in database conection: ");
    for( i=0; i<rows.length; i++){
        
        const actName = rows[i].activityId;
        const selectUsers = "SELECT userId FROM activity where activityId ='"+actName+"'";//and is online = no
        const usersquery = await conn.query(selectUsers);
        
        // console.log(usersquery[0].userId);
        for (j=0; j<usersquery.length; j++){
          const currentUser = usersquery[j].userId;
          const res = await conn.query("INSERT INTO notification value (?, ?, ?, ?)", [currentUser, actName, 0, timeNow]);
          
          console.log(res);
          //if currentUser===userId = skip

        }
    }
    

  } catch (err) {
    console.log(err);
    throw err;

  } finally {
    if (conn) return conn.end();
  }

}

// async function asyncFunction() {
//   let conn;
//   try {
// 	conn = await pool.getConnection();
// 	const rows = await conn.query("SELECT 1 as val");
// 	console.log(rows); //[ {val: 1}, meta: ... ]
// 	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
// 	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }

// const dbs = check("php5185@rit.edus", "1234").then(arr => {
//   console.log("db response last line: " + aux[0])
// });


////////////////////////////get Notification
let noti = []
app.post('/getnotification', (request, response) => {
  const data = request.body;
  const userId = data.userId;

  // console.log(user);
  //get all the notification for this user
  // console.log("called create notification");

  const notification = getNotificationByUser(userId).then(arr => { 
    // console.log("in /getNotification"+arr);  
    let ans = noti.pop(); 
    response.json({
      status: true,
      body: ans
    })
  });
});


async function getNotificationByUser(userIds){
  let conn;
  let result;
  try {
    conn = await pool.getConnection();
    
      const selectNotification = "Select userId, activityId, timeDate from notification where userId="+userIds;//and is online = no
      result = await conn.query(selectNotification);
      // rows[0].Id
      // console.log("in the return selectNotification user "+result[0].userId+" date "+result[0].timeDate);
      
      // noti.push(result);
      try {
        if (typeof result[0].userId !== "undefined") {
          noti.push(result);

          // const varId = rows[0].Id;
          // const output = {
          //   status : true,
          //   userId : varId
          // }
          // // aux.push(true);
          // aux.push(output);
          // console.log("has id of: " + rows[0].Id);
        }
      } catch (err) {
        noti.push(result);
      }




  } catch (err) {
    console.log(err);
    // noti.push(result);
    throw err;

  } finally {
    if (conn) return conn.end();
    return selectNotificationñ
  }

}



//////////////////// Majed Code

app.post("/submitAssesment", (request, response) => {
  console.log(request.body);
  response.json({
    status: "successPaola",
  });
});

app.post("/submitActivity", (request, response) => {
  console.log(request.body);
  response.json({
    status: "successPaola",
  });
});

app.post("/submitNotifications", (request, response) => {
  console.log(request.body);
  response.json({
    status: "successPaola",
  });
});

