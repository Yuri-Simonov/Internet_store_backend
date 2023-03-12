import express from "express";
import mongoose from "mongoose";

import {
	registerValidation,
	loginValidation,
	postCreateValidation,
} from "./validations.js";

import checkAuth from "./utils/check_auth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
	.connect(
		"mongodb+srv://Admin:Admin@clustertest2023.ahvxudd.mongodb.net/internet_store_2023?retryWrites=true&w=majority"
	)
	.then(() => console.log("DB ok"))
	.catch((err) => console.log("DB err", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello fucking world!");
});

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(4444, (err) => {
	if (err) return console.log(err);

	console.log("Сервер был запущен на порту: 4444");
});
