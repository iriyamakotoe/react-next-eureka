'use client'

import React from 'react'

interface Props {
	message: string
}

export const ErrorForm: React.FC<Props> = ({message}) => {
	const errorForm = message
	return (
		<>
			<div className="relative w-full rounded-lg border border-transparent bg-red-50 p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 text-red-600">
				<svg
					className="w-5 h-5 -translate-y-0.5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
					/>
				</svg>
				<h5 className="font-medium leading-none tracking-tight">{errorForm}</h5>
			</div>
		</>
	)
}

export default ErrorForm
