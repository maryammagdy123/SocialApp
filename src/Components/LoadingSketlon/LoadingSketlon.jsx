function LoadingSkeleton() {
	return (
		<div className="w-full mx-auto bg-white py-8 px-8  rounded-2xl shadow mb-4 animate-pulse">
			<div className="flex items-center justify-center gap-4 mb-4">
				<div className="w-10 h-10 bg-gray-300 rounded-full"></div>
				<div className="flex-1">
					<div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
					<div className="h-2 bg-gray-200 rounded w-1/4"></div>
				</div>
			</div>
			<div className="h-3 bg-gray-300 rounded mb-2 w-full"></div>
			<div className="h-3 bg-gray-300 rounded mb-2 w-4/5"></div>
			<div className="h-3 bg-gray-300 rounded w-2/3"></div>
		</div>
	);
}

export default LoadingSkeleton;
