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
	onAction: (inputName: string) => void
}

export const SemSheets = ({register, sheets, semester, onAction}: Props) => {
	const subjects = [
		{key: 'japanese', name: '国語'},
		{key: 'arithmetic', name: '数学'},
		{key: 'english', name: '英語'},
		{key: 'social', name: '社会'},
		{key: 'science', name: '理科'},
	]
	const renderSubjectSection = (subjectKey: string, label: string, type: 'mid' | 'end') => {
		const key = `${semester}_${type}_${subjectKey}` as keyof Sheets
		const value = sheets[key]

		const fileUrl: string | undefined = typeof value === 'string' ? value : undefined
		const inputName = key

		return (
			<p className="mb-5">
				<label className="text-sm text-gray-700 mb-1 pl-1 font-medium">{label}</label>
				{fileUrl && (
					<span className="flex text-xs items-end mb-2">
						<a href={fileUrl} className="max-w-32 pl-1">
							<img src={fileUrl} alt={`${label}`} className="h-32 align-bottom" />
						</a>
						<button onClick={() => onAction(inputName)} type="button" className="ml-1">
							削除
						</button>
					</span>
				)}
				<InputFileItem register={register(inputName)} />
			</p>
		)
	}

	return (
		<>
			{subjects.map((subject, index) => (
				<dl key={index} className="flex items-center justify-around mb-5">
					<dt className="font-bold mr-2">{subject.name}</dt>
					<dd>{renderSubjectSection(subject.key, '中間', 'mid')}</dd>
					<dd>{renderSubjectSection(subject.key, '期末', 'end')}</dd>
				</dl>
			))}
		</>
	)
}

export default SemSheets
