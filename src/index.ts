// Third Party
import chalk from "chalk";
import express, { Express } from "express";
import figlet from "figlet";

// Local
import { postRouter } from "@routers/post/post-router";

function applyBaseRoutes(server: Express): void {
  server.use("/posts", postRouter);
}

function buildServer(): Express {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  applyBaseRoutes(server);

  return server;
}

function runServer(): void {
  const server = buildServer();
  const port = process.env.SERVER_PORT ?? 3000;

  server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    console.log(
      chalk.redBright(
        figlet.textSync("Themis", {
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 100,
          whitespaceBreak: true,
        })
      )
    );
  });
}

function main(): void {
  runServer();
}

main();
