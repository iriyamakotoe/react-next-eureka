'use client'

import React from 'react'
import {InputItem} from '@/components/InputItem'
import {UseFormRegister} from 'react-hook-form'

interface Props {
	register: UseFormRegister<FormData>
	scores: string
	semester: string
}

export const Semester: React.FC<Props> = ({register, scores, semester}) => {
	return (
		<>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">国語</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_mid_japanese'}
						placeholder="中間"
						suffix="点"
						defaultValues={scores[semester]?.mid?.japanese}
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_end_japanese'}
						placeholder="期末"
						suffix="点"
						defaultValues={scores[semester]?.end?.japanese}
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">数学</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_mid_arithmetic'}
						placeholder="中間"
						suffix="点"
						defaultValues={scores[semester]?.mid?.arithmetic}
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_end_arithmetic'}
						placeholder="期末"
						suffix="点"
						defaultValues={scores[semester]?.end?.arithmetic}
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">英語</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_mid_english'}
						placeholder="中間"
						suffix="点"
						defaultValues={scores[semester]?.mid?.english}
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_end_english'}
						placeholder="期末"
						suffix="点"
						defaultValues={scores[semester]?.end?.english}
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">社会</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_mid_social'}
						placeholder="中間"
						suffix="点"
						defaultValues={scores[semester]?.mid?.social}
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_end_social'}
						placeholder="期末"
						suffix="点"
						defaultValues={scores[semester]?.end?.social}
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around max-w-80 mx-auto mb-5">
				<dt className="font-bold mr-2">理科</dt>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_mid_science'}
						placeholder="中間"
						suffix="点"
						defaultValues={scores[semester]?.mid?.science}
					/>
				</dd>
				<dd>
					<InputItem
						register={register}
						type="number"
						name={semester + '_end_science'}
						placeholder="期末"
						suffix="点"
						defaultValues={scores[semester]?.end?.science}
					/>
				</dd>
			</dl>
		</>
	)
}

export default Semester
