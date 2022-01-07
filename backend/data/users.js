import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const users = [
	{
		name: "Admin User",
		email: "admin@example.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},
	{
		name: "John Doe",
		email: "john@example.com",
		password: bcrypt.hashSync("123456", 10),
	},
	{
		name: "Jsne Doe",
		email: "jane@example.com",
		password: bcrypt.hashSync("123456", 10),
	},
];

export default users;
