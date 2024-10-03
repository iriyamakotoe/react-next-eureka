'use client'

import React from 'react'
import {InputItem} from '@/components/InputItem'
import {UseFormRegister, FieldValues, Path} from 'react-hook-form'

type semObj = {
	mid: {[key: string]: number}
	end: {[key: string]: number}
}

interface Scores {
	student_id: number
	year: number
	sem1: semObj
	sem2: semObj
	sem3: semObj
	comments: string
	students: {name: string; id: number}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>
	scores: Scores
	semester: string
}

export const Semester = <T extends FieldValues>({register, scores, semester}: Props<T>) => {
	console.log(scores)
	return (
		<>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">国語</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}.mid.japanese` as Path<T>}
						placeholder="中間"
						suffix="点"
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_end_japanese` as Path<T>}
						placeholder="期末"
						suffix="点"
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">数学</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_mid_arithmetic` as Path<T>}
						placeholder="中間"
						suffix="点"
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_end_arithmetic` as Path<T>}
						placeholder="期末"
						suffix="点"
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">英語</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_mid_english` as Path<T>}
						placeholder="中間"
						suffix="点"
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_end_english` as Path<T>}
						placeholder="期末"
						suffix="点"
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">社会</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_mid_social` as Path<T>}
						placeholder="中間"
						suffix="点"
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_end_social` as Path<T>}
						placeholder="期末"
						suffix="点"
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">理科</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_mid_science` as Path<T>}
						placeholder="中間"
						suffix="点"
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={`${semester}_end_science` as Path<T>}
						placeholder="期末"
						suffix="点"
					/>
				</dd>
			</dl>
		</>
	)
}

export default Semester
