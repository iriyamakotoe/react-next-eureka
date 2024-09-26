import React from 'react'

export const InputItem = (props) => {
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
				<input type={props.type} id={id} defaultValue={props.defaultValues} {...registerOptions} />
				<span className="suffix">{props.suffix}</span>
				<br />
				<span className="error">{props.errors?.message}</span>
			</p>
		</>
	)
}

export default InputItem
