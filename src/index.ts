import { staticPlugin } from "@elysiajs/static";
import { Elysia, redirect, t } from "elysia";
import { render } from "./STE.js";
import { PostModel } from "./models.js";

const db_path_name = "./test.db";

const app = new Elysia()
	.use(staticPlugin({ assets: "./src/static", prefix: "/static" }))
	.decorate("db", new PostModel(db_path_name))

	.get("/", () => Bun.file("./src/static/html/index.html"))
	.get(
		"/post/:id",
		(ctx) => {
			const postText = ctx.db.getPost(ctx.params.id).post;
			ctx.set.headers["Content-Type"] = "text/html;charset=utf-8";
			return render("./src/templates/show_post.html", [postText]);
		},
		{ params: t.Object({ id: t.Numeric() }) },
	)

	.post(
		"/post/create",
		(ctx) => {
			const id = ctx.db.savePost(Bun.escapeHTML(ctx.body));
			return id;
		},
		{ body: t.String() },
	)
	.listen(7000);

console.log(
	`TextHost is running at http://${app.server?.hostname}:${app.server?.port}`,
);
