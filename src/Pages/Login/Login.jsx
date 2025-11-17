import './login.css';
import React from 'react';
import { Link } from 'react-router';
import { LoginInputs } from '../../Constants/constants';
import { LoginSchema } from '../../validation/LoginSchema';
import { useAuthentication } from '../../Hooks/useAuthentication';
import CustomForm from '../../Components/Form/CustomForm';

export default function Login() {
	const { Login, loginLoading } = useAuthentication();

	const handleLogin = (value) => {
		Login(value);
	};

	return (
		<section style={{ background: "var(--background)" }} className="min-h-screen flex justify-center items-center p-4">
			<div style={{ background: "var(--card-bg)", boxShadow: "var(--shadow-md)", borderRadius: "var(--radius-lg)" }}
				className="w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden">
				{/* Left Side */}
				<div style={{
					backgroundImage: "linear-gradient(to top, rgba(56,189,248,0.2), rgba(99,102,241,0.2)), url('/assets/login.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
					className="flex-1 p-6 flex flex-col justify-center gap-4">
					<h1 style={{ color: "var(--primary-100)" }} className="uppercase md:text-6xl text-lg font-bold my-2">Hello world</h1>
					<p style={{ color: "var(--primary-100)" }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis consectetur quia veniam, tenetur repudiandae totam?
					</p>
					<span style={{ color: "var(--primary-100)" }} className="text-sm underline font-semibold mt-2">Don't you have an account?</span>
					<Link to="/register">
						<button style={{ background: "var(--primary-600)", color: "white" }}
							className="w-[50%] px-4 py-2 rounded hover:bg-primary-700">Register</button>
					</Link>
				</div>

				{/* Right Side */}
				<div className="flex-1 p-6 flex flex-col justify-center gap-4">
					<CustomForm onSubmit={handleLogin} inputs={LoginInputs} schema={LoginSchema} buttonLabel="Login" isPending={loginLoading} />
				</div>
			</div>
		</section>
	);
}
