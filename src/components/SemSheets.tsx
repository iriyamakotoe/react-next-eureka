'use client'

import {InputFileItem} from '@/components/InputFileItem'
import {UseFormRegister, FieldValues} from 'react-hook-form'

interface Sheets {
	school_id: number
	year: number
	grade: number
	sem1_mid_japanese?: string
	sem1_end_japanese?: string
	sem1_mid_arithmetic?: string
	sem1_end_arithmetic?: string
	sem1_mid_english?: string
	sem1_end_english?: string
	sem1_mid_social?: string
	sem1_end_social?: string
	sem1_mid_science?: string
	sem1_end_science?: string
	sem2_mid_japanese?: string
	sem2_end_japanese?: string
	sem2_mid_arithmetic?: string
	sem2_end_arithmetic?: string
	sem2_mid_english?: string
	sem2_end_english?: string
	sem2_mid_social?: string
	sem2_end_social?: string
	sem2_mid_science?: string
	sem2_end_science?: string
	sem3_mid_japanese?: string
	sem3_end_japanese?: string
	sem3_mid_arithmetic?: string
	sem3_end_arithmetic?: string
	sem3_mid_english?: string
	sem3_end_english?: string
	sem3_mid_social?: string
	sem3_end_social?: string
	sem3_mid_science?: string
	sem3_end_science?: string
	schools: {
		name: string
		id: number
	}
}

interface Props {
	register: UseFormRegister<FieldValues>
	sheets: Sheets
	semester: 'sem1' | 'sem2' | 'sem3'
}

export const SemSheets = ({register, sheets, semester}: Props) => {
	console.log(sheets)
	return (
		<>
			<dl className="flex items-center justify-around mb-5">
				<dt className="font-bold mr-2">国語</dt>
				<dd>
					<InputFileItem register={register(`${semester}_mid_japanese`)} url={sheets[`${semester}_mid_japanese`]} label="中間" />
				</dd>
				<dd>
					<InputFileItem register={register(`${semester}_end_japanese`)} url={sheets[`${semester}_end_japanese`]} label="期末" />
				</dd>
			</dl>
			<dl className="flex items-center justify-around mb-5">
				<dt className="font-bold mr-2">数学</dt>
				<dd>
					<InputFileItem
						register={register(`${semester}_mid_arithmetic`)}
						url={sheets[`${semester}_mid_arithmetic`]}
						label="中間"
					/>
				</dd>
				<dd>
					<InputFileItem
						register={register(`${semester}_end_arithmetic`)}
						url={sheets[`${semester}_end_arithmetic`]}
						label="期末"
					/>
				</dd>
			</dl>
			<dl className="flex items-center justify-around mb-5">
				<dt className="font-bold mr-2">英語</dt>
				<dd>
					<InputFileItem register={register(`${semester}_mid_english`)} url={sheets[`${semester}_mid_english`]} label="中間" />
				</dd>
				<dd>
					<InputFileItem register={register(`${semester}_end_english`)} url={sheets[`${semester}_end_english`]} label="期末" />
				</dd>
			</dl>
			<dl className="flex items-center justify-around mb-5">
				<dt className="font-bold mr-2">社会</dt>
				<dd>
					<InputFileItem register={register(`${semester}_mid_social`)} url={sheets[`${semester}_mid_social`]} label="中間" />
				</dd>
				<dd>
					<InputFileItem register={register(`${semester}_end_social`)} url={sheets[`${semester}_end_social`]} label="期末" />
				</dd>
			</dl>
			<dl className="flex items-center justify-around mb-5">
				<dt className="font-bold mr-2">理科</dt>
				<dd>
					<InputFileItem register={register(`${semester}_mid_science`)} url={sheets[`${semester}_mid_science`]} label="中間" />
				</dd>
				<dd>
					<InputFileItem register={register(`${semester}_end_science`)} url={sheets[`${semester}_end_science`]} label="期末" />
				</dd>
			</dl>
		</>
	)
}

export default SemSheets
