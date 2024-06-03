// command line utility

import { Database } from "bun:sqlite";
import { unlinkSync } from "node:fs";

const db_path_name = "./test.db";
function createDB() {
	const db = new Database(db_path_name, { create: true });
	db.close(true);
	console.log("DB created successfully");
}

function deleteDBFile() {
	unlinkSync(db_path_name);
	console.log("DB file deleted sucsessfully");
}

function doDBVacuum() {
	const db = new Database(db_path_name);
	db.run("VACUUM");
	db.close(true);
	console.log("vacuum done sucsessfully");
}

function initDB() {
	const db = new Database(db_path_name);
	db.run("CREATE TABLE main (id INTEGER PRIMARY KEY, post TEXT)");
	db.close(true);
	console.log("DB tables created sucsessfully");
}

function showDBData() {
	const db = new Database(db_path_name);
	const data = db.query("SELECT * FROM main").all();
	console.log(data);
}

const command = Bun.argv[2]; // third item is the command

switch (command) {
	case "create":
		createDB();
		break;

	case "delete":
		deleteDBFile();
		break;

	case "doVacuum":
		doDBVacuum();
		break;

	case "init":
		initDB();
		break;

	case "show":
		showDBData();
		break;

	default:
		console.log("no operation to do");
		break;
}
