import { useState, useEffect } from 'react'

// Styles
import './styles/App.scss'

// Compoentns
import TreeMap from './components/TreeMap'
import Box from './components/Box'
import NumberInput from './components/NumberInput'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

function App() {
	// Sample data
	const sampleData = [
		{ name: 'A', weight: 3, value: -0.02 },
		{ name: 'B', weight: 3, value: 0.05 },
		{ name: 'C', weight: 6, value: 0.015 },
		{ name: 'D', weight: 2, value: -0.01 },
		{ name: 'E', weight: 3, value: 0.01 },
	]

	// Init config
	useEffect(() => {
		updateConfig('data', sampleData)
		updateConfig('row', sampleData.length)
		// eslint-disable-next-line
	}, [])

	const [isConfigOpen, setIsConfigOpen] = useState(false)

	const values = ['data', 'row']
	// eslint-disable-next-line
	const [config, setConfig] = useState(values.reduce((acc, curr) => ((acc[curr] = ''), acc), {}))
	// eslint-disable-next-line
	const [error, setError] = useState(values.reduce((acc, curr) => ((acc[curr] = ''), acc), {}))

	const updateConfig = (key, value) => {
		if (isVaild(key, value)) {
			setConfig((current) => ({
				...current,
				[key]: value,
			}))
		}
	}

	const updateError = (key, value) => {
		setError((current) => ({
			...current,
			[key]: value,
		}))
	}

	const handleChange = (e) => {
		// console.log(e)

		if (e.error) return
		if (e.jsObject) {
			updateConfig('data', e.jsObject)
			return
		}

		const key = e.target.name
		const value = e.target.value

		updateConfig(key, value)
	}

	const isVaild = (key, value) => {
		// console.log(config)
		switch (key) {
			case 'row':
				// must be integer
				if (!Number.isInteger(value)) {
					updateError('row', 'Row number must be integer')
					return false
				}

				// row number <= array.length
				if (config.data && value > config.data.length) {
					updateConfig('row', config.data.length)
					updateError('row', `Row number must be less than or equal to data length (${config.data.length})`)
					return false
				}

				if (value < 1) {
					updateError('row', 'Row number must be greater than 0')
					return false
				}

				updateError('row', '')
				return true

			case 'data':
				// array.length <= 50
				if (value.length > 50) {
					updateError('data', 'Data length must be less than 50')
					return false
				}

				// data.name must be string and less than 50 characters
				const invalidNames = value.filter((item) => typeof item.name !== 'string' || item.name.length > 50)
				if (invalidNames.length) {
					updateError('data', 'Data name must be string and less than 50 characters')
					return false
				}

				// - data.weight must be integer
				const invalidWeight = value.filter((item) => !Number.isInteger(item.weight))
				if (invalidWeight.length) {
					updateError('data', 'Data weight must be integer')
					return false
				}

				updateError('data', '')
				return true

			default:
				return false
		}
	}

	useEffect(() => {
		if (config.data && config.row && config.row > config.data.length) {
			console.log('###')
			updateConfig('row', config.data.length)
		}
	}, [config])

	return (
		<div className="main">
			<div className="config" data-status={isConfigOpen ? 'on' : 'off'}>
				<div onClick={() => setIsConfigOpen((current) => !current)} className="title">
					Config
					<div className="close"></div>
				</div>
				<Box title="Data" className="row-span-2">
					<JSONInput width="100%" height="100%" placeholder={sampleData} locale={locale} onKeyPressUpdate={handleChange} onChange={handleChange} />
					<div className="error">{error.data}</div>
				</Box>
				<Box title="Row Number" className="row-span-1">
					<NumberInput value={config.row} onChange={handleChange} />
					<div className="error">{error.row}</div>
				</Box>
			</div>
			<div className="result" onClick={() => setIsConfigOpen(false)}>
				<Box title="Result">
					<TreeMap config={config} />
				</Box>
			</div>
		</div>
	)
}

export default App
