'use client'

import {InputFileItem} from '@/components/InputFileItem'
import {UseFormRegister, FieldValues} from 'react-hook-form'

interface SubjectSheets {
	japanese: string
	arithmetic: string
	english: string
	social: string
	science: string
}

interface Sheets {
	school_id: number
	year: number
	grade: number
	sem1_mid: SubjectSheets
	sem1_end: SubjectSheets
	schools: {
		name: string
		id: number
	}
}

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>
	sheets: Sheets
	semester: string
}

export const SemSheets = <T extends FieldValues>({register, sheets, semester}: Props<T>) => {
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
