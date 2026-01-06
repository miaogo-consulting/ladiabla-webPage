'use client'

import { useRef } from 'react'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryItem = {
	_key: string
	_type: 'gallery.image' | 'gallery.text'
	image?: Sanity.Image
	text?: string
	size?: 'small' | 'medium' | 'large' | 'tall' | 'wide'
}

export default function BentoGalleryLaDiabla({
	pretitle,
	heading,
	content,
	items,
	enableCarousel = false,
}: Partial<{
	pretitle: string
	heading: string
	content: string
	items: GalleryItem[]
	enableCarousel: boolean
}> &
	Sanity.Module) {
	const scrollRef = useRef<HTMLDivElement>(null)

	const scroll = (direction: 'left' | 'right') => {
		if (!scrollRef.current) return
		const scrollAmount = scrollRef.current.offsetWidth * 0.8
		scrollRef.current.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		})
	}

	// Size classes for bento grid items - usando heights específicas para evitar overlap
	const getSizeClasses = (size?: string, isCarousel?: boolean) => {
		if (isCarousel) {
			// En carousel: mantener proporciones pero ajustar para grid horizontal
			switch (size) {
				case 'small':
					return 'col-span-1 row-span-1 h-[200px] w-[200px]'
				case 'medium':
					return 'col-span-1 row-span-2 h-[416px] w-[250px]'
				case 'large':
					return 'col-span-2 row-span-2 h-[416px] w-[516px]'
				case 'tall':
					return 'col-span-1 row-span-3 h-[632px] w-[250px]'
				case 'wide':
					return 'col-span-2 row-span-1 h-[200px] w-[516px]'
				default:
					return 'col-span-1 row-span-1 h-[200px] w-[200px]'
			}
		} else {
			// Grid normal: sin widths fijas
			switch (size) {
				case 'small':
					return 'col-span-1 row-span-1 h-[200px]'
				case 'medium':
					return 'col-span-1 row-span-2 h-[416px]'
				case 'large':
					return 'col-span-2 row-span-2 h-[416px]'
				case 'tall':
					return 'col-span-1 row-span-3 h-[632px]'
				case 'wide':
					return 'col-span-2 row-span-1 h-[200px]'
				default:
					return 'col-span-1 row-span-1 h-[200px]'
			}
		}
	}

	return (
		<section className="overflow-hidden py-16 md:py-24">
			{/* Header - Centered with max-width */}
			{(pretitle || heading || content) && (
				<div className="mx-auto mb-12 max-w-3xl px-6 md:px-12">
					{pretitle && (
						<p className="mb-2 text-sm font-medium uppercase tracking-wider text-amber-700">
							{pretitle}
						</p>
					)}
					{heading && (
						<h2 className="mb-4 font-serif text-4xl font-normal md:text-5xl lg:text-6xl">
							{heading}
						</h2>
					)}
					{content && <p className="text-lg text-gray-600">{content}</p>}
				</div>
			)}

			{/* Gallery Container - Full Width */}
			<div className={cn('relative', !enableCarousel && 'px-6 md:px-12')}>
				{/* Grid with optional horizontal scroll */}
				<div
					ref={scrollRef}
					className={cn(
						'grid gap-4 lg:gap-6',
						enableCarousel
							? 'overflow-x-auto scrollbar-hide'
							: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
					)}
					style={
						enableCarousel
							? {
									gridAutoFlow: 'column dense',
									gridTemplateRows: 'repeat(3, 200px)',
									gridAutoColumns: 'min-content',
							  }
							: { gridAutoFlow: 'dense' }
					}
				>
					{items?.map((item) => (
						<div
							key={item._key}
							className={cn(
								'relative overflow-hidden rounded-lg',
								getSizeClasses(item.size, enableCarousel),
								!enableCarousel && 'md:col-span-1 lg:col-span-1',
							)}
							style={
								!enableCarousel
									? undefined
									: {
											gridColumn: `span ${item.size === 'large' || item.size === 'wide' ? 2 : 1}`,
											gridRow: `span ${
												item.size === 'large' || item.size === 'tall'
													? item.size === 'tall'
														? 3
														: 2
													: item.size === 'medium'
														? 2
														: 1
											}`,
									  }
							}
						>
							{item._type === 'gallery.image' && item.image ? (
								<Img
									image={item.image}
									className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
								/>
							) : item._type === 'gallery.text' && item.text ? (
								<div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-100 to-stone-100 p-8">
									<p className="text-center font-serif text-2xl font-normal uppercase tracking-wider text-stone-800 md:text-3xl">
										{item.text}
									</p>
								</div>
							) : null}
						</div>
					))}
				</div>

				{/* Carousel Navigation Arrows */}
				{enableCarousel && items && items.length > 2 && (
					<>
						<button
							onClick={() => scroll('left')}
							className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white hover:scale-110"
							aria-label="Scroll left"
						>
							<ChevronLeft className="h-6 w-6 text-stone-800" />
						</button>
						<button
							onClick={() => scroll('right')}
							className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white hover:scale-110"
							aria-label="Scroll right"
						>
							<ChevronRight className="h-6 w-6 text-stone-800" />
						</button>
					</>
				)}
			</div>
		</section>
	)
}
