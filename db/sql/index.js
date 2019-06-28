const mysql = require('mysql');
const mysqlConfig = require('../../config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log('mysql connected!');
  }
});
module.exports = connection;
