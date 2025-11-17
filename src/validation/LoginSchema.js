import * as zod from "zod";
export const LoginSchema = zod.object({
	email: zod.string()
		.nonempty("Email is required!")
		.regex(/^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"),
	password: zod.string()
		.nonempty("Password cannot be empty")
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, and a number"),
})