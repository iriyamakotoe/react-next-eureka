import React from 'react'

export const TextAreaItem = (props) => {
	const id = props.id
	const registerOptions = props.required
		? props.register(id, {
				required: `${props.label}は必須です`,
				pattern: props.pattern,
			})
		: props.register(id, {
				pattern: props.pattern,
			})
	return (
		<>
			<p className="mt-10">
				<label htmlFor={id}>{props.label}：</label>
				<textarea id={id} rows="5" cols="33" defaultValue={props.defaultValues} {...registerOptions} />
				<br />
				<span className="error">{props.errors?.message}</span>
			</p>
		</>
	)
}

export default TextAreaItem
