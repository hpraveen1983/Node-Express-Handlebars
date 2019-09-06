// Import MySQL connection.
const connection = require("../config/connection.js");

const tableName = "burgers";



function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}


const orm = {

  selectAll : (tableName,callback) => {

    let queryStatement = `SELECT * FROM ${tableName};`;

    connection.query(queryStatement, (err, result)=>{
      if (err) throw err;
      callback(result);
    });

  },

  insertOne: (tableName, cols, vals, callback) => {

    let queryStatement = `INSERT INTO  ${tableName} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;

    connection.query(queryStatement, vals, (err, result) => {
      if (err) throw err;
      console.log("Sucesfully Added");
      callback(result);
    });

  },

  updateOne : (tableName, cols, vals, condition, callback) =>{

    let queryStatement = `UPDATE ${tableName} SET ${cols.toString()} = ? WHERE ${condition}`;

    connection.query(queryStatement, vals, (err, result) => {
      if (err) throw err;
      console.log("Sucesfully Updated");
      console.log("Executing Third Declared CallBack");
      callback(result);
    });

  }

}


module.exports = orm;