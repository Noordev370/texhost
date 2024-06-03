import { Database } from "bun:sqlite";

export class PostModel {
	private db: Database;

	constructor(filename: string) {
		this.db = new Database(filename);
	}

	savePost(postText: string): number {
		const queryResult = this.db
			.query("INSERT INTO main (post) VALUES(?) RETURNING id")
			.get(postText) as { id: number };
		return queryResult.id;
	}

	getPost(id: number) {
		const query = this.db.query("SELECT * FROM main WHERE id = ?");
		return query.get(id) as { id: number; post: string };
	}
}
