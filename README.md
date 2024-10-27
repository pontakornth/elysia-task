# Elysia Task

This repository is a oversimplified todo list API done in Elysia.

## Getting started

1. Clone this repository
2. Use `bun install` to install dependencies.
3. Setup Postgres database using provided Docker Compose file or other methods
4. Set `DATABASE_URL` in `.env` file to match your Postgres setup. See `.env.example` for an example.
5. Use `bunx drizzle-kit migrate` to migrate the database.
6. Run your Postgres instance.
6. Run the application using `bun run dev`

The application will run on `http://localhost:3000`.


This is an oversimplified application so there is no authentication or slightly complex logic.

## Swagger

You can view swagger using `http://localhost:3000/swagger`
