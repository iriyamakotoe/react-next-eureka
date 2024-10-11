'use client'

import React from 'react'
import {FieldErrors, FieldValues, Path, UseFormRegister} from 'react-hook-form'

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>
	name: Path<T>
	label?: string
	required?: boolean
	errors?: FieldErrors<T>
	placeholder?: string
}

export const TextAreaItem = <T extends FieldValues>({
	register,
	name,
	label,
	required,
	errors,
	placeholder,
}: Props<T>) => {
	const registerOptions = required
		? register(name, {
				required: `${label}は必須です`,
			})
		: register(name)
	return (
		<>
			<p className="mb-5">
				<label htmlFor={name} className="text-sm text-gray-700 block mb-1 font-medium">
					{label || ''}
				</label>
				<textarea
					rows={5}
					cols={33}
					id={name}
					{...registerOptions}
					className={`text-base w-full bg-gray-100 rounded border border-gray-200 py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 ${errors ? 'border-2 border-red-500' : 'border-2 focus:ring-blue-500 focus:border-blue-500'}`}
					placeholder={placeholder}
				/>
			</p>
			{errors && <p className="text-sm text-red-600 mt-1">{String(errors?.message) || ''}</p>}
		</>
	)
}

export default TextAreaItem
