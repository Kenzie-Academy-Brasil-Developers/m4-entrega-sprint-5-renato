import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { userRouter } from "./routers/users.routes";
import { sessionRouter } from "./routers/session.routes";
import { categoriesRouter } from "./routers/categories.routes";
import handleError from "./Errors/handleError";
import { propertiesRouter } from "./routers/properties.routes";
import { schedulesRouter } from "./routers/schedules.routes";

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/properties", propertiesRouter);
app.use("/schedules", schedulesRouter);

app.use(handleError);

export default app;
