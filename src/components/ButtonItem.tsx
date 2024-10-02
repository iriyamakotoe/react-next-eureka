'use client'

import React from 'react'

interface Props {
	type: 'submit' | 'reset' | 'button'
	text: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	style?: string
}

export const ButtonItem: React.FC<Props> = ({type, text, onClick, style}) => {
	let buttonStyle
	switch (style) {
		case 'primary':
			buttonStyle =
				'py-1.5 px-4 transition-colors bg-green-600 border active:bg-green-800 font-bold border-green-700 text-white rounded-lg hover:bg-green-700 disabled:opacity-50'
			break
		case 'outline':
			buttonStyle =
				'py-1.5 px-4 transition-colors bg-gray-50 border active:bg-blue-800 font-bold border-gray-200 hover:text-white text-blue-600 hover:border-blue-700 rounded-lg hover:bg-blue-600 disabled:opacity-50'
			break
		case 'delete':
			buttonStyle =
				'py-1.5 px-4 transition-colors bg-gray-50 border active:bg-red-800 font-bold border-gray-200 hover:text-white text-red-600 hover:border-red-700 rounded-lg hover:bg-red-600 disabled:opacity-50'
			break
		default:
			buttonStyle =
				'py-1.5 px-4 transition-colors bg-gray-50 border active:bg-gray-200 font-medium border-gray-200 text-gray-900 rounded-lg hover:bg-gray-100 disabled:opacity-50'
			break
	}

	return (
		<>
			<button onClick={onClick} type={type} className={buttonStyle}>
				{text}
			</button>
		</>
	)
}

export default ButtonItem
