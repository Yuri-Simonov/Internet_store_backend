import { body } from "express-validator";

export const registerValidation = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Пароль должен содержать минимум 5 символов").isLength({
		min: 5,
	}),
	body("fullName", "Имя должно содержать минимум 3 символа").isLength({
		min: 3,
	}),
	body("avatarUrl", "Неверно указан адрес картинки").optional().isURL(),
];

export const loginValidation = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Пароль должен содержать минимум 5 символов").isLength({
		min: 5,
	}),
];

export const postCreateValidation = [
	body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
	body("text", "Введите текст статьи")
		.isLength({
			min: 3,
		})
		.isString(),
	body("tags", "Неверный формат тегов").optional().isString(),
	body("imageUrl", "Неверная ссылка на изображение").optional().isURL(),
];
