import { Elysia, error, t } from "elysia";
import { db } from "./db/database";
import { taskTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-typebox";
import swagger from "@elysiajs/swagger";

const createTaskSchema = createInsertSchema(taskTable);

const app = new Elysia()
	.use(swagger())
	.get("/", () => "Hello Elysia")
	.group("/tasks", (app) => {
		return (
			app
				.get("/", async () => {
					const tasks = await db.select().from(taskTable);
					return tasks;
				})
				.post(
					"/",
					async ({ body }) => {
						const task = await db.insert(taskTable).values(body).returning();
						return task;
					},
					{
						body: createTaskSchema,
					},
				)
				// ID specific routes
				.guard({
					params: t.Object({
						// Params will be string no matter what so I cannot use t.Integer() here.
						id: t.Number(),
					}),
				})
				.post("/:id/complete", async ({ params: { id } }) => {
					const task = await db
						.update(taskTable)
						.set({ isComplete: true })
						.where(eq(taskTable.id, id))
						.returning();
					return task;
				})
				.post("/:id/uncomplete", async ({ params: { id } }) => {
					const task = await db
						.update(taskTable)
						.set({ isComplete: false })
						.where(eq(taskTable.id, id))
						.returning();
					return task;
				})

				.get("/:id", async ({ params: { id } }) => {
					const task = await db
						.select()
						.from(taskTable)
						.where(eq(taskTable.id, id));
					return task;
				})
				.delete("/:id", async ({ params: { id } }) => {
					await db.delete(taskTable).where(eq(taskTable.id, id));
					// It is kinda weird that it is called error. I don't understand why.
					return error(202);
				})
		);
	})
	.listen(3000);
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
