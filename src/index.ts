import express from "express";

import { postRouter } from "./routers";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", postRouter);

app.listen(port, () => {
    console.log(port);
});

export { app };
