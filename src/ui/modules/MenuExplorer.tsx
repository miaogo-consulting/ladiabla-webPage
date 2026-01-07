'use client'

import { useState } from 'react'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

type MenuItem = {
	_key: string
	title: string
	backgroundImage?: Sanity.Image
	menuFile?: {
		asset?: {
			url: string
		}
	}
}

export default function MenuExplorer({
	items,
}: Partial<{
	items: MenuItem[]
}> &
	Sanity.Module) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
	const [isHoveredSingle, setIsHoveredSingle] = useState(false)

	if (!items || items.length === 0) return null

	const getColumnWidth = (index: number) => {
		// Si solo hay 1 item, siempre 100%
		if (items.length === 1) return '100%'

		if (hoveredIndex === null) return `${100 / items.length}%`
		if (hoveredIndex === index) return '70%'
		return `${30 / (items.length - 1)}%`
	}

	return (
		<>
			<section className="relative flex h-[calc(100vh-73px)] w-full overflow-hidden">
				{items.map((item, index) => (
					<div
						key={item._key}
						className={cn(
							'relative cursor-pointer',
							items.length > 1 && 'transition-all duration-500 ease-out'
						)}
						style={{ width: getColumnWidth(index) }}
						onMouseEnter={() => {
							if (items.length > 1) {
								setHoveredIndex(index)
							} else {
								setIsHoveredSingle(true)
							}
						}}
						onMouseLeave={() => {
							if (items.length > 1) {
								setHoveredIndex(null)
							} else {
								setIsHoveredSingle(false)
							}
						}}
						onClick={() => {
							if (item.menuFile?.asset?.url) {
								setSelectedMenu(item.menuFile.asset.url)
							}
						}}
					>
						{/* Background Image */}
						{item.backgroundImage && (
							<div className="absolute inset-0">
								<Img
									image={item.backgroundImage}
									className={cn(
										'h-full w-full object-cover transition-transform duration-300',
										items.length === 1 && isHoveredSingle && 'scale-105'
									)}
								/>
								<div
									className={cn(
										'absolute inset-0 bg-gradient-to-b transition-colors duration-300',
										items.length === 1 && isHoveredSingle
											? 'from-black/30 via-black/10 to-black/50'
											: 'from-black/40 via-black/20 to-black/60'
									)}
								/>
							</div>
						)}

						{/* Title */}
						<div className="relative flex h-full items-center justify-center">
							<h2
								className={cn(
									'font-serif uppercase tracking-[0.2em] text-white transition-all duration-300',
									items.length === 1
										? isHoveredSingle
											? 'text-6xl md:text-7xl lg:text-8xl xl:text-9xl'
											: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
										: hoveredIndex === index
											? 'text-5xl md:text-6xl lg:text-7xl'
											: 'text-3xl md:text-4xl lg:text-5xl',
								)}
								style={
									items.length === 1
										? undefined
										: {
												writingMode: hoveredIndex === index ? 'horizontal-tb' : 'vertical-rl',
												textOrientation: hoveredIndex === index ? 'mixed' : 'mixed',
												transform: hoveredIndex === index ? 'none' : 'rotate(180deg)',
											}
								}
							>
								{item.title}
							</h2>
						</div>

						{/* Hover Instruction */}
						{(items.length === 1 || hoveredIndex === index) && (
							<div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-sm uppercase tracking-wider text-white/80">
								Click para ver menú
							</div>
						)}

						{/* Divider Line */}
						{index < items.length - 1 && (
							<div className="absolute right-0 top-0 h-full w-px bg-white/20" />
						)}
					</div>
				))}
			</section>

			{/* PDF/Image Viewer Modal */}
			{selectedMenu && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
					onClick={() => setSelectedMenu(null)}
				>
					<button
						className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
						onClick={(e) => {
							e.stopPropagation()
							setSelectedMenu(null)
						}}
					>
						<X className="h-6 w-6" />
					</button>

					<div
						className="max-h-[90vh] max-w-6xl overflow-auto"
						onClick={(e) => e.stopPropagation()}
					>
						{selectedMenu.endsWith('.pdf') ? (
							<iframe
								src={selectedMenu}
								className="h-[90vh] w-full min-w-[80vw]"
								title="Menu PDF"
							/>
						) : (
							<img
								src={selectedMenu}
								alt="Menu"
								className="max-h-[90vh] w-auto"
							/>
						)}
					</div>
				</div>
			)}
		</>
	)
}
