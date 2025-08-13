import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod";
import Spinner from '../Spinner/Spinner';

export default function RegisterForm() {
	const schema = zod.object({
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
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
		resolver: zodResolver(schema),
		mode: "onBlur"
	});

	let navg = useNavigate()
	const inputs = [
		{
			labelTitle: "Enter Your name",
			labelFor: "name",
			id: "name",
			type: "text",
			placeholder: "John Doe",
			autoComplete: "name"
		},
		{
			labelTitle: "Enter Your Email address",
			labelFor: "email",
			id: "email",
			type: "email",
			placeholder: "john.doe@gmail.com",
			autoComplete: "email"
		},
		{
			labelTitle: "Enter Your password",
			labelFor: "password",
			id: "password",
			type: "password",
			placeholder: "",
			autoComplete: "new-password"
		},
		{
			labelTitle: "Confirm password",
			labelFor: "rePassword",
			id: "rePassword",
			type: "password",
			placeholder: "",
			autoComplete: "new-password"
		},
		{
			labelTitle: "Enter your date of birth",
			labelFor: "dateOfBirth",
			id: "dateOfBirth",
			type: "date",
			placeholder: "YYYY-MM-DD",
			autoComplete: "bday"
		},
	];


	async function onSubmit(value) {
		console.log("Data to send:", value);

		try {
			const response = await axios.post(`https://linked-posts.routemisr.com/users/signup`, value);

			console.log("Success:", response.data);

			if (response?.data?.message === "success") {
				toast.success("Account created  successfully")
				navg("/login");
			}
		} catch (error) {
			console.log("Error during signup:", error.response?.data || error.message);
			toast.error(error.response.data.error)
		}
	}


	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{
				inputs.map((el, index) => {
					const { id, labelFor, labelTitle, type, placeholder } = el;
					return (
						<div className="mb-6" key={index}>
							<label htmlFor={labelFor} className="block mb-2 text-sm font-medium text-gray-900">{labelTitle}</label>
							<input
								type={type}
								id={id}
								{...register(id)}
								autoComplete={el.autoComplete}
								placeholder={placeholder}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
							/>
							{errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]?.message}</p>}
						</div>
					);
				})
			}

			<label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
			<select
				id="gender"
				{...register("gender")}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 my-4"
			>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>

			<button type="submit" disabled={isSubmitting} className="w-[50%] px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
				{isSubmitting ? (
					<Spinner />
				) : (
					"Register"
				)}

			</button>
		</form>
	);
}
