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
    console.log("db response: " + auxResponse);
    response.json({
      status: auxResponse,
      send: "paola"
    })
  });
  // console.log("database: " + loginStatus)

  // response.json({
  //   status: aux[0]
  // });



  // let conn;
  // try {
  // conn = await pool.getConnection();
  // // const rows = await conn.query("SELECT 1 as val");
  // // console.log(rows); //[ {val: 1}, meta: ... ]
  // const res = await conn.query("INSERT INTO Account value (?, ?, ?)", [1000, user, pass]);
  // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  // } catch (err) {
  // throw err;
  // } finally {
  // if (conn) return conn.end();
  // }
  // response.json({ test: 123 });

});

const dbcredentials = {
  host: 'dailyhealthdb.ccmgc85klflk.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password!',
  database: 'dailyhealthdb'
  //  connectionLimit: 5
}
let aux = []
const check = async function login(user, pass) {
  // const select = "SELECT Id FROM Account where Email='"+user+"' AND Password='"+pass+"'";
  // mariadb.createConnection(dbcredentials)
  //   .then(conn => {
  //     conn.query(select)
  //       .then(rows => {
  //         console.log("rows ");
  //         console.log(rows); // [{ "1": 1 }]
  //         conn.end();
  //         return rows;
  //       })
  //       .catch(err => { 
  //         //handle query error
  //       });
  //   })
  //   .catch(err => {
  //     //handle connection error
  //     console.log("error conecting to the database")
  //   });




  //working login
  let conn;
  try {
    conn = await pool.getConnection();
    const select = "SELECT Id FROM Account where Email='" + user + "' AND Password='" + pass + "'";
    const rows = await conn.query(select);
    // console.log(rows); //[ {val: 1}, meta: ... ]
    // const res = await conn.query("INSERT INTO Account (Id, Email, Password) value (?, ?, ?)", [1000, user, pass]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    try {
      if (typeof rows[0].Id !== "undefined") {
        aux.push(true);
        console.log("has id of: " + rows[0].Id);
      }
    } catch (err) {
      aux.push(false);
      console.log("Credentials invalid")
    }

    // console.log("array[0]: "+aux[0]);



  } catch (err) {
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


