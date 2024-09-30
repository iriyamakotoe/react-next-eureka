'use client'

export const Loading = () => {
	return (
		<>
			<div className="w-full min-h-screen flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#ffffff">
					<circle cx="12" cy="3" r="3">
						<animate attributeName="cx" values="12;21;3;12" calcMode="linear" dur="2.2s" repeatCount="indefinite" />
						<animate attributeName="cy" values="3;21;21;3" calcMode="linear" dur="2.2s" repeatCount="indefinite" />
					</circle>
					<circle cx="21" cy="21" r="3">
						<animate attributeName="cx" values="21;3;12;21" calcMode="linear" dur="2.2s" repeatCount="indefinite" />
						<animate attributeName="cy" values="21;21;3;21" calcMode="linear" dur="2.2s" repeatCount="indefinite" />
					</circle>
					<circle cx="3" cy="21" r="3">
						<animate attributeName="cx" values="3;12;21;3" calcMode="linear" dur="2.2s" repeatCount="indefinite" />
						<animate attributeName="cy" values="21;3;21;21" calcMode="linear" dur="2.2s" repeatCount="indefinite" />
					</circle>
				</svg>
			</div>
		</>
	)
}
