'use client'

import React from 'react'
import {UseFormRegister, FieldValues, FieldErrors} from 'react-hook-form'

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>
	url?: string
	label?: string
	errors?: FieldErrors<T>
}

export const InputFileItem = <T extends FieldValues>({register, url, label, errors}: Props<T>) => {
	return (
		<>
			<p className="mb-5">
				<label className="text-sm text-gray-700 block mb-1 font-medium">
					{label || ''}
					{url && (
						<a href={url} className="max-w-28 mb-2 block">
							<img src={url} className="h-20" />
						</a>
					)}
					<input
						type="file"
						{...register}
						className={`text-base bg-gray-100 border border-gray-200 rounded py-1 px-3 inline-block text-gray-700 placeholder:text-neutral-500 placeholder:text-xs w-full ${errors ? 'border-2 border-red-500' : 'border-2 focus:ring-blue-500 focus:border-blue-500'}`}
					/>
				</label>
				{errors && <span className="text-sm text-red-600 mt-1">{String(errors?.message) || ''}</span>}
			</p>
		</>
	)
}

export default InputFileItem
