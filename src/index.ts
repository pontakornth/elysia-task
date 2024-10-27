import { Elysia } from "elysia";
import { db } from "./db/database";
import { taskTable } from "./db/schema";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.listen(3000)
	.group("/tasks", (app) => {
		return app.get("/", () => {
			const tasks = db.select().from(taskTable);
			return tasks;
		});
	});
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
