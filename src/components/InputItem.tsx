'use client'

import React from 'react'
import {UseFormRegister, FieldValues, RegisterOptions, FieldErrors, Path} from 'react-hook-form'

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>
	type: 'text' | 'number' | 'tel' | 'email' | 'password'
	name: Path<T>
	label?: string
	required?: boolean
	pattern?: RegisterOptions<T>['pattern']
	errors?: FieldErrors<T>
	suffix?: string
	placeholder?: string
}

export const InputItem = <T extends FieldValues>({
	register,
	type,
	name,
	label,
	required,
	pattern,
	errors,
	suffix,
	placeholder,
}: Props<T>) => {
	const registerOptions = required
		? register(name, {
				required: `${label}は必須です`,
				pattern,
			})
		: register(name, {
				pattern,
			})
	return (
		<>
			<p className="mb-5">
				<label htmlFor={name} className="text-sm text-gray-700 block mb-1 font-medium">
					{label || ''}
				</label>
				<input
					type={type}
					id={name}
					{...registerOptions}
					className={`text-base bg-gray-100 border border-gray-200 rounded py-1 px-3 inline-block text-gray-700 placeholder:text-neutral-500 placeholder:text-xs w-full ${errors ? 'border-2 border-red-500' : 'border-2 focus:ring-blue-500 focus:border-blue-500'}`}
					placeholder={placeholder || ''}
				/>
				{suffix && <span className="suffix text-xs text-gray-700 inline-block mb-1 ml-1 font-medium">{suffix}</span>}

				{errors && <span className="text-sm text-red-600 mt-1">{String(errors?.message) || ''}</span>}
			</p>
		</>
	)
}

export default InputItem
