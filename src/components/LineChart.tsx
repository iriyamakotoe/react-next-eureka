'use client'

import {Line} from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartTypeRegistry,
	ChartOptions,
	CoreScaleOptions,
	Tick,
	Scale,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type semObj = {
	mid: {[key: string]: number | null}
	end: {[key: string]: number | null}
}

interface Scores {
	student_id: number
	year: number
	sem1: semObj
	sem2: semObj
	sem3: semObj
	comments: string
	students: {name: string; id: number}
}

interface ScoresData {
	[key: string]: semObj
}

interface ChartData {
	[key: string]: {
		[semester: string]: {
			mid: number | null
			end: number | null
		}
	}
}

interface Props {
	scores: Scores
}

export const LineChart: React.FC<Props> = ({scores}) => {
	const {sem1, sem2, sem3} = scores
	const scoresData: ScoresData = {sem1, sem2, sem3}
	const chartData: ChartData = {
		japanese: {},
		arithmetic: {},
		english: {},
		social: {},
		science: {},
	}

	// 各学期のデータを変換
	for (const semester in scoresData) {
		const {mid, end} = scoresData[semester]

		chartData.japanese[semester] = {
			mid: mid.japanese ? Number(mid.japanese) : null,
			end: end.japanese ? Number(end.japanese) : null,
		}
		chartData.arithmetic[semester] = {
			mid: mid.arithmetic ? Number(mid.arithmetic) : null,
			end: end.arithmetic ? Number(end.arithmetic) : null,
		}
		chartData.english[semester] = {
			mid: mid.english ? Number(mid.english) : null,
			end: end.english ? Number(end.english) : null,
		}
		chartData.social[semester] = {
			mid: mid.social ? Number(mid.social) : null,
			end: end.social ? Number(end.social) : null,
		}
		chartData.science[semester] = {
			mid: mid.science ? Number(mid.science) : null,
			end: end.science ? Number(end.science) : null,
		}
	}

	// グラフのデータ生成関数
	const generateChartData = () => ({
		labels: [
			['1学期', '中間'],
			['1学期', '期末'],
			['2学期', '中間'],
			['2学期', '期末'],
			['3学期', '中間'],
			['3学期', '期末'],
		],
		datasets: [
			{
				label: '国語',
				data: [
					chartData.japanese.sem1.mid,
					chartData.japanese.sem1.end,
					chartData.japanese.sem2.mid,
					chartData.japanese.sem2.end,
					chartData.japanese.sem3.mid,
					chartData.japanese.sem3.end,
				],
				borderColor: 'rgba(255, 0, 0, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(255, 0, 0, 1)',
				fill: false,
				tension: 0,
				spanGaps: true,
			},
			{
				label: '数学',
				data: [
					chartData.arithmetic.sem1.mid,
					chartData.arithmetic.sem1.end,
					chartData.arithmetic.sem2.mid,
					chartData.arithmetic.sem2.end,
					chartData.arithmetic.sem3.mid,
					chartData.arithmetic.sem3.end,
				],
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(75, 192, 192, 1)',
				fill: false,
				tension: 0,
				spanGaps: true,
			},
			{
				label: '英語',
				data: [
					chartData.english.sem1.mid,
					chartData.english.sem1.end,
					chartData.english.sem2.mid,
					chartData.english.sem2.end,
					chartData.english.sem3.mid,
					chartData.english.sem3.end,
				],
				borderColor: 'rgba(128, 0, 128, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(128, 0, 128, 1)',
				fill: false,
				tension: 0,
				spanGaps: true,
			},
			{
				label: '社会',
				data: [
					chartData.social.sem1.mid,
					chartData.social.sem1.end,
					chartData.social.sem2.mid,
					chartData.social.sem2.end,
					chartData.social.sem3.mid,
					chartData.social.sem3.end,
				],
				borderColor: 'rgba(255, 165, 0, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(255, 165, 0, 1)',
				fill: false,
				tension: 0,
				spanGaps: true,
			},
			{
				label: '理科',
				data: [
					chartData.science.sem1.mid,
					chartData.science.sem1.end,
					chartData.science.sem2.mid,
					chartData.science.sem2.end,
					chartData.science.sem3.mid,
					chartData.science.sem3.end,
				],
				borderColor: 'rgba(0, 128, 0, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(0, 128, 0, 1)',
				fill: false,
				tension: 0,
				spanGaps: true,
			},
		],
	})

	// カスタムラベル描画プラグイン
	const customLabelsPlugin = {
		id: 'customLabels',
		afterDraw: (chart: ChartJS<keyof ChartTypeRegistry>) => {
			const {
				ctx,
				chartArea: {bottom},
				scales: {x},
			} = chart

			const semesterLabels = ['1学期', '2学期', '3学期']
			const semesterPositions = [
				[0, 1],
				[2, 3],
				[4, 5],
			]
			const lineColor = '#dedede'

			ctx.save()
			ctx.font = '12px Arial' // フォントのスタイルとサイズを指定
			ctx.fillStyle = '#666' // フォントの色を設定

			semesterPositions.forEach(([start, end], index) => {
				const startPosition = x.getPixelForTick(start)
				const endPosition = x.getPixelForTick(end)
				const labelPosition = (startPosition + endPosition) / 2
				const labelMargin = (endPosition - startPosition - 20) / 2

				// 中間と期末の間に線を引く
				ctx.beginPath()
				ctx.moveTo(startPosition - labelMargin, bottom + 40)
				ctx.lineTo(endPosition + labelMargin, bottom + 40)
				ctx.strokeStyle = lineColor
				ctx.lineWidth = 3
				ctx.stroke()

				// 学期ラベルを表示
				ctx.fillText(semesterLabels[index], labelPosition, bottom + 60)
			})

			ctx.restore()
		},
		// afterDatasetsDraw: (chart) => {
		// 	const ctx = chart.ctx

		// 	chart.data.datasets.forEach((dataset, datasetIndex) => {
		// 		const meta = chart.getDatasetMeta(datasetIndex)
		// 		meta.data.forEach((point, index) => {
		// 			const value = dataset.data[index]

		// 			// 値が null の場合は何もしない
		// 			if (value !== null) {
		// 				const position = point.tooltipPosition() // ポイントの位置を取得

		// 				// テキストのスタイルを設定
		// 				ctx.save()
		// 				ctx.font = 'bold 12px Arial'
		// 				ctx.fillStyle = dataset.borderColor // ポイントの色に合わせる
		// 				ctx.textAlign = 'center'
		// 				ctx.fillText(value, position.x - 5, position.y - 10) // ポイントの上に表示
		// 				ctx.restore()
		// 			}
		// 		})
		// 	})
		// },
	}

	// オプション設定
	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: {
				bottom: 100,
			},
		},
		plugins: {
			legend: {
				labels: {
					usePointStyle: true,
					pointStyle: 'line',
				},
				position: 'top',
			},
		},
		scales: {
			x: {
				offset: true,
				ticks: {
					callback: function (value: string | number): string {
						const xScale = this.chart.scales.x
						const numericValue = typeof value === 'number' ? value : parseFloat(value as string)
						const label = xScale.getLabelForValue(numericValue)
						return Array.isArray(label) && label.length === 2 ? label[1] : label
					},
				},
				grid: {
					display: false,
				},
			},
			y: {
				suggestedMax: 110,
				beginAtZero: true,
				ticks: {
					callback: function (
						this: Scale<CoreScaleOptions>,
						tickValue: string | number,
						index: number,
						ticks: Tick[],
					): string | '' {
						const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue as string)
						if (index === ticks.length - 1) {
							return '' // 空文字を返す
						}
						return value.toString() // その他のラベルはそのまま表示
					},
					stepSize: 10, // 10ごとにラベルを表示
				},
			},
		},
	}

	return (
		<div className="linechart">
			<Line data={generateChartData()} options={options} plugins={[customLabelsPlugin]} />
		</div>
	)
}

export default LineChart
