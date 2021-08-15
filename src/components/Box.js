const Box = (props) => {
	return (
		<div className={`rounded-md bg-white bg-opacity-5 p-10 w-full h-full flex flex-col shadow-md overflow-y-auto ${props.className}`}>
			<div className="text-gray-400 text-lg font-bold mb-3">{props.title}</div>
			<div className="flex-grow relative">
				<div className="absolute w-full h-full">{props.children}</div>
			</div>
		</div>
	)
}

export default Box
