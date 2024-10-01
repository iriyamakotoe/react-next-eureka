'use client'

import React from 'react'

export const InputItem = (props) => {
	const id = props.id
	const registerOptions = props.required
		? props.register(id, {
				required: `${props.label}は必須です`,
				pattern: props.pattern,
			})
		: props.register(id, {
				pattern: props.pattern,
			})
	return (
		<>
			<p className="mb-5">
				<label htmlFor={id} className="text-sm text-gray-700 block mb-1 font-medium">
					{props.label}
				</label>
				<input
					type={props.type}
					id={id}
					defaultValue={props.defaultValues}
					{...registerOptions}
					className={`bg-gray-100 border border-gray-200 rounded py-1 px-3 inline-block text-gray-700 placeholder:text-neutral-500 placeholder:text-xs w-full ${props.errors ? 'border-2 border-red-500' : 'border-2 focus:ring-blue-500 focus:border-blue-500'}`}
					placeholder={props.placeholder}
				/>
				{props.suffix && (
					<span className="suffix text-xs text-gray-700 inline-block mb-1 ml-1 font-medium">{props.suffix}</span>
				)}
				{props.errors && <p className="text-sm text-red-600 mt-1">{props.errors?.message}</p>}
			</p>
		</>
	)
}

export default InputItem
