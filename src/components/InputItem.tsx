'use client'

import React from 'react'
import {UseFormRegister} from 'react-hook-form'

interface Props {
	register: UseFormRegister<FormData>
	type: 'text' | 'number' | 'tel' | 'email' | 'password'
	name: keyof FormData
	label?: string
	required?: boolean
	pattern?: {value: RegExp; massage: string}
	errors?: Record<string, string>
	suffix?: string
	placeholder?: string
}

export const InputItem: React.FC<Props> = ({
	register,
	type,
	name,
	label,
	required,
	pattern,
	errors,
	suffix,
	placeholder,
}) => {
	const registerOptions = required
		? register(name, {
				required: `${label}は必須です`,
				pattern: pattern,
			})
		: register(name, {
				pattern: pattern,
			})
	return (
		<>
			<p className="mb-5">
				<label className="text-sm text-gray-700 block mb-1 font-medium">
					{label}

					<input
						type={type}
						name={name}
						{...registerOptions}
						className={`bg-gray-100 border border-gray-200 rounded py-1 px-3 inline-block text-gray-700 placeholder:text-neutral-500 placeholder:text-xs w-full ${errors ? 'border-2 border-red-500' : 'border-2 focus:ring-blue-500 focus:border-blue-500'}`}
						placeholder={placeholder}
					/>
					{suffix && <span className="suffix text-xs text-gray-700 inline-block mb-1 ml-1 font-medium">{suffix}</span>}
				</label>
				{errors && <p className="text-sm text-red-600 mt-1">{errors?.message}</p>}
			</p>
		</>
	)
}

export default InputItem
