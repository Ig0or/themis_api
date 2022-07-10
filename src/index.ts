import express from "express";

import { postRouter } from "./routes/post-router";

const app = express();
const port = 3000;

app.use("/posts", postRouter);

app.listen(port, () => {
    console.log(port);
});

export { app };
