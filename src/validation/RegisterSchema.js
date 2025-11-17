import * as zod from "zod";
export const RegisterSchema = zod.object({
	name: zod.string()
		.nonempty("Name is required!")
		.min(3, "Name should be 3 characters at least")
		.max(20, "Name shouldnt exeed 10 characters")
		.regex(/^[\p{Script=Arabic}A-Za-z\s]+$/u, "Name must contain only letters and spaces"),
	email: zod.string()
		.nonempty("Email is required!")
		.regex(/^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"),
	password: zod.string()
		.nonempty("Password cannot be empty")
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, and a number"),
	rePassword: zod.string()
		.nonempty("Please confirm your password"),
	dateOfBirth: zod.string().nonempty("Date of birth is required"),
	gender: zod.enum(["male", "female"], {
		errorMap: () => ({ message: "Gender is required" }),
	}),

}).refine((data) => data.password === data.rePassword, {
	path: ["rePassword"],
	message: "Passwords do not match",
});
