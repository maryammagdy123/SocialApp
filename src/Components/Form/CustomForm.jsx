import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner/Spinner';

export default function CustomForm({ onSubmit, inputs, schema, buttonLabel, isPending, isRegister }) {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(schema),
		mode: "onBlur"
	});
	return (
		<section
			style={{ background: "var(--background)" }}
			className="min-h-screen flex justify-center items-center p-4"
		>
			<div
				style={{ background: "var(--card-bg)", boxShadow: "var(--shadow-md)", borderRadius: "var(--radius-lg)" }}
				className="w-full max-w-md p-8"
			>
				<h1 style={{ color: "var(--text-main)" }} className="text-3xl font-bold mb-6 text-center">
					{buttonLabel}
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					{inputs.map((el, index) => {
						const { id, labelFor, labelTitle, type, placeholder } = el;
						return (
							<div className="flex flex-col" key={index}>
								<label
									htmlFor={labelFor}
									style={{ color: "var(--text-main)" }}
									className="text-sm font-medium mb-1"
								>
									{labelTitle}
								</label>
								<input
									type={type}
									id={id}
									{...register(id)}
									autoComplete={el.autoComplete}
									placeholder={placeholder}
									style={{
										background: "var(--card-bg)",
										border: "1px solid var(--border)",
										color: "var(--text-main)"
									}}
									className="w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600 text-sm"
								/>
								{errors[id] && (
									<p style={{ color: "var(--error)" }} className="text-sm mt-1">
										{errors[id]?.message}
									</p>
								)}
							</div>
						);
					})}

					{isRegister && (
						<div className="flex flex-col">
							<label
								htmlFor="gender"
								style={{ color: "var(--text-main)" }}
								className="text-sm font-medium mb-1"
							>
								Gender
							</label>
							<select
								id="gender"
								{...register("gender")}
								style={{
									background: "var(--card-bg)",
									border: "1px solid var(--border)",
									color: "var(--text-main)"
								}}
								className="w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600 text-sm"
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>
					)}

					<button
						type="submit"
						disabled={isPending}
						style={{ background: "var(--primary-600)" }}
						className="w-full px-4 py-2 rounded-md font-semibold text-white hover:bg-primary-700 flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{isPending ? <Spinner /> : buttonLabel}
					</button>
				</form>
			</div>
		</section>
	)
}
