'use client'

import {FieldErrors, UseFormRegisterReturn} from 'react-hook-form'

interface Props {
	register: UseFormRegisterReturn
	errors?: FieldErrors
}

export const InputFileItem = ({register, errors}: Props) => {
	return (
		<>
			<input
				type="file"
				{...register}
				className={`block w-full text-xs text-slate-500
					file:mr-1 file:py-2 file:px-4
					file:rounded-full file:border-0
					file:text-xm file:font-semibold
					file:bg-gray-200 file:text-gray-700
					hover:file:bg-gray-300`}
			/>
			{errors && <span className="text-sm text-red-600 mt-1">{String(errors?.message) || ''}</span>}
		</>
	)
}

export default InputFileItem
