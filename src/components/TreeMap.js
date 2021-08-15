import { useRef, useEffect, useState } from 'react'

const TreeMap = (props) => {
	const treemapEl = useRef(null)
	const [elHeight, setElHeight] = useState(0)
	const [elWidthArray, setElWidthArray] = useState([])

	const adjustElHeight = () => {
		if (!treemapEl.current) return
		if (props.config.row > props.config.data.length) return
		if (props.config.row < 1) return
		setElHeight(treemapEl.current.clientHeight / props.config.row)
	}

	const adjustElWidth = () => {
		let sum = props.config.data.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.weight
		}, 0)

		const widthArray = props.config.data.map((item) => {
			return (item.weight / sum) * 90 * props.config.row + '%'
		})

		setElWidthArray(widthArray)
	}

	const adjustSize = () => {
		if (!treemapEl.current) return
		if (props.config.row > props.config.data.length) return
		if (props.config.row < 1) return

		adjustElHeight()
		adjustElWidth()
	}

	useEffect(() => {
		adjustSize()
		// eslint-disable-next-line
	}, [props.config])

	useEffect(() => {
		window.addEventListener('resize', adjustSize)
		return () => window.removeEventListener('resize', adjustSize)
	})

	return (
		<div className="w-full h-full overflow-hidden" ref={treemapEl}>
			{props.config.data
				? props.config.data.map((item, i) => {
						return (
							<div
								key={i}
								className={` text-white text-center inline-flex items-center justify-center border border-black bg-${item.value > 0 ? 'green' : 'red'}-700`}
								style={{ width: elWidthArray[i], height: elHeight }}
							>
								{item.name}
								<br />
								{item.value * 100}%
							</div>
						)
				  })
				: ''}
		</div>
	)
}

export default TreeMap
