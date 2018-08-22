(function () {
	"use strict";
}());
var mysql = require("mysql2");
const db_config = {
	host: "localhost",
	port: 3306,
	user: "webadmin",
	password: "dickdickhobig",
	database: "calculator"
};
class Database {
	constructor() {
		this.connection = mysql.createConnection(db_config);
	}
	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err)
					return reject(err);
				resolve(rows);
			});
		});
	}
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	}
}
module.exports.myDatabaseRequest = async (sql, parameter, flag) => {
	return new Promise((resolve, reject) => {
		// s = sql (pack) , d = data , f = flag
		let tempDB = new Database;
		let unaRows, dosRows;
		if (flag === 0) {
			tempDB.query(sql, parameter).then(rows => {
				unaRows = rows;
				return tempDB.close();
			}, err => {
				return tempDB.close().then(() => {
					throw err;
				});
			}).then(() => {
				return resolve(unaRows);
			}).catch(err => {
				//logger.error("Database: " + err)
				return reject(err);
			});
		} else if (flag === 1) {
			tempDB.query(sql.s1, parameter.p1).then(rows => {
				unaRows = rows;
				return tempDB.query(sql.s2, parameter.p2);
			}).then(rows => {
				dosRows = rows;
				return tempDB.close();
			}, err => {
				return tempDB.close().then(() => {
					throw err;
				});
			}).then(() => {
				return resolve({
					r1: unaRows,
					r2: dosRows
				});
			}).catch(err => {
				//logger.error("Database: " + err)
				return reject(err);
			});
		}
	});
};
/*
create database calculator;
grant select , insert, update on calculator.* to 'webadmin'@'localhost';
CREATE TABLE machineRecord (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     username CHAR(8) NOT NULL,
	 val FLOAT NOT NULL,
     PRIMARY KEY (id)
);
CREATE TABLE machineHistory (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     ip CHAR(15) NOT NULL default '0.0.0.0',
     operate CHAR(8) NOT NULL default '=',
     rid MEDIUMINT NOT NULL,
	 val FLOAT default 0,
	 time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (id)
);
Insert into machineRecord VALUES (null, 'nick', 0.0);
*
*/
