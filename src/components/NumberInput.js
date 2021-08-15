const NumberInput = (props) => {
	const handleChange = (e) => {
		props.onChange(e)
	}

	const handleFocus = (event) => event.target.select()

	return (
		<div className="flex w-full box-border border-0 rounded-sm bg-white bg-opacity-10 text-white text-center justify-between overflow-hidden" style={{ maxWidth: '300px' }}>
			<button className="box-border py-1 px-5 bg-black bg-opacity-0 h-full hover:bg-opacity-50" onClick={() => handleChange({ target: { name: 'row', value: props.value - 1 } })}>
				-
			</button>
			<input className="border-0 bg-transparent text-center" type="number" onFocus={handleFocus} value={props.value} name="row" onChange={handleChange} />
			<button className="box-border py-1 px-5 bg-black bg-opacity-0 h-full hover:bg-opacity-50" onClick={() => handleChange({ target: { name: 'row', value: props.value + 1 } })}>
				+
			</button>
		</div>
	)
}

export default NumberInput
