import express from "express";

import { postRouter, userRouter } from "./routers";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(port, () => {
    console.log(port);
});

export { app };
