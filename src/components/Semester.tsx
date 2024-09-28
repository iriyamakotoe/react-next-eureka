'use client'

import React from 'react'
import {InputItem} from '@/components/InputItem'

export const Semester = (props) => {
	const register = props.register
	const scores = props.scores
	const semster = props.semster
	return (
		<>
			<section>
				<h3>国語</h3>
				<InputItem
					register={register}
					type="number"
					id={semster + '_mid_japanese'}
					label="中間"
					defaultValues={scores[semster].mid.japanese}
				/>
				<InputItem
					register={register}
					type="number"
					id={semster + '_end_japanese'}
					label="期末"
					defaultValues={scores[semster].end.japanese}
				/>

				<h3>数学</h3>
				<InputItem
					register={register}
					type="number"
					id={semster + '_mid_arithmetic'}
					label="中間"
					defaultValues={scores[semster].mid.arithmetic}
				/>
				<InputItem
					register={register}
					type="number"
					id={semster + '_end_arithmetic'}
					label="期末"
					defaultValues={scores[semster].end.arithmetic}
				/>

				<h3>英語</h3>
				<InputItem
					register={register}
					type="number"
					id={semster + '_mid_english'}
					label="中間"
					defaultValues={scores[semster].mid.english}
				/>
				<InputItem
					register={register}
					type="number"
					id={semster + '_end_english'}
					label="期末"
					defaultValues={scores[semster].end.english}
				/>

				<h3>社会</h3>
				<InputItem
					register={register}
					type="number"
					id={semster + '_mid_social'}
					label="中間"
					defaultValues={scores[semster].mid.social}
				/>
				<InputItem
					register={register}
					type="number"
					id={semster + '_end_social'}
					label="期末"
					defaultValues={scores[semster].end.social}
				/>

				<h3>理科</h3>
				<InputItem
					register={register}
					type="number"
					id={semster + '_mid_science'}
					label="中間"
					defaultValues={scores[semster].mid.science}
				/>
				<InputItem
					register={register}
					type="number"
					id={semster + '_end_science'}
					label="期末"
					defaultValues={scores[semster].end.science}
				/>
			</section>
		</>
	)
}

export default Semester
