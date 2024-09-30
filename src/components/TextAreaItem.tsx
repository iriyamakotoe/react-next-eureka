'use client'

import React from 'react'

export const TextAreaItem = (props) => {
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
				<textarea
					id={id}
					rows="5"
					cols="33"
					defaultValue={props.defaultValues}
					{...registerOptions}
					className="w-full bg-gray-100 rounded border border-gray-200 py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
				/>
				<span className="text-sm text-red-600">{props.errors?.message}</span>
			</p>
		</>
	)
}

export default TextAreaItem
