'use client'

import React from 'react'

interface Props {
	message: string
}

export const SuccessForm: React.FC<Props> = ({message}) => {
	const successMessage = message
	return (
		<>
			<div className="relative w-full rounded-lg border border-transparent bg-green-50 p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 text-green-600 mt-5">
				<svg
					className="w-5 h-5 -translate-y-0.5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<h5 className="font-medium leading-none tracking-tight">{successMessage}</h5>
			</div>
		</>
	)
}

export default SuccessForm
