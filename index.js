import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/User.js";

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

app.post("/auth/register", registerValidation, async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			passwordHash: hash,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			"some_secret_key",
			{ expiresIn: "30d" }
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (error) {
		console.log("err", error);
		res.status(500).json({
			message: "Не удалось зарегистрироваться",
		});
	}
});

app.listen(4444, (err) => {
	if (err) return console.log(err);

	console.log("Сервер был запущен на порту: 4444");
});
