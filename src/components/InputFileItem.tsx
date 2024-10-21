'use client'

import {FieldErrors, UseFormRegisterReturn} from 'react-hook-form'

interface Props {
	register: UseFormRegisterReturn
	url?: string
	label?: string
	errors?: FieldErrors
}

export const InputFileItem = ({register, url, label, errors}: Props) => {
	console.log(url)
	return (
		<>
			<p className="mb-5">
				<label className="text-sm text-gray-700 block mb-1 font-medium">{label || ''}</label>
				{url && (
					<span className="flex text-xs items-center mb-2">
						<a href={url} className="max-w-28 block">
							<img src={url} alt="" className="h-20 align-bottom" />
						</a>
						{/* <span className="inline-block mt-10 pt-5 ml-1">削除</span> */}
					</span>
				)}
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
			</p>
		</>
	)
}

export default InputFileItem
