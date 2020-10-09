const mysql = require('mysql')

const dbOptions = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'db_ours'
}

export const conn = mysql.createConnection(dbOptions)

module.exports = function query(strSql, arr) {
  return new Promise((resolve, reject) => {
    conn.query(strSql, arr, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}
