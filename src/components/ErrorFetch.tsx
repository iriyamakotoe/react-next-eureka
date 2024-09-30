'use client'

import React from 'react'

export const ErrorFetch = (props) => {
	const errorMessage = props.message
	return (
		<>
			<p className="w-full min-h-screen text-white text-s flex items-center justify-center">
				<span className="text-center">
					<svg
						className="w-7 h-7 -translate-y-0.5 inline-block"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#fff"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>
					<h5 className="mb-1 ml-2 inline-block font-l leading-none tracking-tight">ERROR</h5>
					<p className="text-sm opacity-80"> {errorMessage}</p>
				</span>
			</p>
		</>
	)
}

export default ErrorFetch
