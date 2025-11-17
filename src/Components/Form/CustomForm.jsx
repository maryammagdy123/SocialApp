import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';

export default function CustomForm({ onSubmit, inputs, schema, buttonLabel, isPending }) {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(schema),
		mode: "onBlur"
	});
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

			<button type="submit" disabled={isPending} className="w-[50%] px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
				{isPending ? (
					<Spinner />
				) : (
					{ buttonLabel }
				)}

			</button>
		</form>
	)
}
