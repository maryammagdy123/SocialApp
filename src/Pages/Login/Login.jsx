import React, { useContext } from 'react'
import './login.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod";
import Spinner from '../../Components/Spinner/Spinner';
import { UserDataContext } from '../../Context/UserDataContext';


export default function Login() {
	let { getLoggedUserData } = useContext(UserDataContext)
	const schema = zod.object({
		email: zod.string()
			.nonempty("Email is required!")
			.regex(/^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"),
		password: zod.string()
			.nonempty("Password cannot be empty")
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, and a number"),
	})
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
		resolver: zodResolver(schema),
	});
	let navg = useNavigate()

	const inputs = [

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
		}
	];

	async function handleLogin(value) {
		let { data } = await axios.post(`https://linked-posts.routemisr.com/users/signin`, value).catch(error => {
			
			toast.error(error.response.data.error)
		})
		if (data?.message === "success") {
			// saving user's token
			localStorage.setItem("token", data.token)
			// toast
			toast.success("loged in successfully")

			getLoggedUserData()
			// navigate to home
			navg("/");
		}
	}
	return (
		<>
		
			<section className="login min-h-screen bg-indigo-500 flex flex-col justify-center items-center md:p-20 p-4 ">
			{/* <h1 className='text-4xl text-center text-white p-4'>Linked Post</h1> */}
				<div className="card min-h-[500px] flex flex-col lg:flex-row bg-white w-full max-w-4xl rounded-lg overflow-hidden shadow-lg  ">
				
					{/* Left Side */}
					<div className="left flex-1 p-6 flex flex-col justify-center gap-4 
                          bg-[linear-gradient(to_top,rgba(56,189,248,0.2),rgba(99,102,241,0.2)),url('/assets/login.jpg')] 
                            bg-cover bg-center bg-no-repeat">


						<h1 className="uppercase md:text-6xl text-lg font-bold text-indigo-100 my-2">Hello world</h1>
						<p className=" text-indigo-100">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis consectetur quia veniam, tenetur repudiandae totam?
						</p>
						<span className="text-sm underline font-semibold  text-indigo-100 mt-2">Don't you have an account?</span>
						<Link to="/register">
							<button className="w-[50%] px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Register</button>
						</Link>

					</div>

					{/* Right Side */}
					<div className="right flex flex-1 p-6 flex-col justify-center gap-4 bg-white">
						<h1 className="text-2xl font-bold mb-4 text-indigo-800">Login</h1>

						{/* start form  */}
						<form onSubmit={handleSubmit(handleLogin)}>
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



							<button type="submit" disabled={isSubmitting} className="w-[50%] px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
								{isSubmitting ? (
									// spinner
									<Spinner />
								) : (
									"Login"
								)}

							</button>
						</form>
					</div>

				</div>
			</section>

		</>
	)
}
