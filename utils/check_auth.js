import jwt from "jsonwebtoken";

export default (req, res, next) => {
	const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

	if (token) {
		try {
			const decoded = jwt.verify(token, "some_secret_key");

			req.userId = decoded._id;
			next();
			console.log(1);
		} catch (error) {
			return res.status(403).json({
				message: "Нет доступа",
			});
		}
	} else {
		return res.status(403).json({
			message: "Нет доступа",
		});
	}
};
