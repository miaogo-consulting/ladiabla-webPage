'use client'

import { useEffect, useRef, useState } from 'react'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function ParallaxSectionLaDiabla({
	heading,
	backgroundImage,
	overlayImage,
	imagePosition = 'left',
}: Partial<{
	heading: string
	backgroundImage: Sanity.Image
	overlayImage: Sanity.Image
	imagePosition: 'left' | 'right'
}> &
	Sanity.Module) {
	const sectionRef = useRef<HTMLElement>(null)
	const [offsetY, setOffsetY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current) return
			const rect = sectionRef.current.getBoundingClientRect()
			// Calculate how much the section is in view
			const sectionMiddle = rect.top + rect.height / 2
			const viewportMiddle = window.innerHeight / 2
			// Move background based on distance from viewport center
			const offset = (sectionMiddle - viewportMiddle) * 0.3
			setOffsetY(offset)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<section ref={sectionRef} className="relative z-10 bg-stone-50 py-20 lg:py-31">
			{/* Background Image with Parallax - clipped to section bounds */}
			{backgroundImage && (
				<div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
					<div
						className="absolute inset-0"
						style={{
							transform: `translateY(${offsetY}px)`,
							transition: 'transform 0.05s ease-out',
							willChange: 'transform',
						}}
					>
						<Img
							image={backgroundImage}
							className="absolute left-1/2 top-1/2 min-h-[150%] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
						/>
					</div>
				</div>
			)}

			{/* Content Container - Flex layout lado a lado */}
			<div className="relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16">
				<div
					className={cn(
						'flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-20',
						imagePosition === 'right' && 'lg:flex-row-reverse',
					)}
				>
					{/* Overlapping Image - Extends beyond section */}
					{overlayImage && (
						<div className="relative order-2 -mb-32 flex-shrink-0 lg:order-1 lg:-my-48">
							<Img
								image={overlayImage}
								className="w-64 drop-shadow-2xl md:w-80 lg:w-[31rem] xl:w-[36rem]"
							/>
						</div>
					)}

					{/* Text Content */}
					<div className="order-1 flex-1 text-center lg:order-2 lg:text-left">
						{heading && (
							<h2 className="font-serif text-3xl font-normal uppercase leading-[1.2] tracking-[0.15em] text-stone-800 md:text-4xl lg:text-5xl">
								{heading.split('\n').map((line, i) => (
									<span key={i} className="block">
										{line}
									</span>
								))}
							</h2>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
