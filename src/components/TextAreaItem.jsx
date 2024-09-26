import React from 'react'

export const TextAreaItem = (props) => {
	const id = props.id
	return (
		<>
			<p className="mt-10">
				<label htmlFor={id}>{props.label}：</label>
				<textarea
					id={id}
					rows="5"
					cols="33"
					defaultValue={props.defaultValues}
					{...props.register(id, {
						required: `${props.label}は必須です`,
						pattern: props.pattern,
					})}
				/>
				<br />
				<span className="error">{props.errors?.message}</span>
			</p>
		</>
	)
}

export default TextAreaItem
