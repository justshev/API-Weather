import express from "express";

import marineRouter from "./features/marine/marine.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/marine", marineRouter);

export default app;
