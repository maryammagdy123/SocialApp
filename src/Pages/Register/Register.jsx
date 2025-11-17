
import './register.css'
import { Link, useNavigate } from 'react-router'
import RegisterForm from '../../Components/Form/RegisterForm'
import { RegisterSchema } from '../../validation/RegisterSchema'
import { RegisterInputs } from '../../Constants/constants'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Register() {
	let navg = useNavigate()


	async function Register(value) {
		try {
			const response = await axios.post(`https://linked-posts.routemisr.com/users/signup`, value);

			if (response?.data?.message === "success") {
				toast.success("Account created  successfully")
				navg("/login");
			}
		} catch (error) {
			toast.error(error.response.data.error)
		}
	}

	return (

		<>
			<div className="register min-h-screen  bg-gray-900 flex  justify-center items-center md:p-30 p-4">
				<div className="card min-h-[500px] flex flex-col-reverse md:flex-row-reverse bg-white w-full max-w-4xl  rounded-lg overflow-hidden shadow-lg">


					{/* Left Side */}
					<div className="left flex-1 p-6 flex flex-col justify-center gap-4 
                          bg-[linear-gradient(to_top,rgba(56,189,248,0.2),rgba(99,102,241,0.2)),url('/assets/signup.jpg')] 
                            bg-cover bg-center bg-no-repeat">

						<h1 className="uppercase md:text-6xl text-lg font-bold text-indigo-100 my-2">Hello world</h1>
						<p className=" text-indigo-100">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis consectetur quia veniam, tenetur repudiandae totam?
						</p>
						<span className="text-sm underline font-semibold  text-indigo-100 mt-2">Already have an account?</span>
						<Link to="/login">
							<button className="w-[50%] px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Login</button>
						</Link>
					</div>

					{/* Right Side */}
					<div className="right flex flex-1 p-6 flex-col justify-center gap-4 bg-white">
						<h1 className="text-2xl font-bold mb-4 text-indigo-800">Register</h1>

						<CustomForm onSubmit={Register} inputs={RegisterInputs} schema={RegisterSchema} buttonLabel="Register" />
					</div>

				</div>
			</div>

		</>

	)
}
