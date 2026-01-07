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
			const scrollProgress = -rect.top / (rect.height + window.innerHeight)
			setOffsetY(scrollProgress * 100)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<section ref={sectionRef} className="relative z-10 bg-stone-50 py-20 lg:py-31">
			{/* Background Image with Parallax - clipped to section bounds */}
			{backgroundImage && (
				<div
					className="absolute inset-0 -z-10 overflow-hidden opacity-20"
					style={{ transform: `translateY(${offsetY * 0.5}px)` }}
				>
					<Img
						image={backgroundImage}
						className="h-full w-full object-cover"
					/>
				</div>
			)}

			{/* Content Container - Flex layout lado a lado */}
			<div className="relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16">
				<div
					className={cn(
						'flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-20',
						imagePosition === 'right' && 'lg:flex-row-reverse',
					)}
				>
					{/* Overlapping Image - Extends beyond section */}
					{overlayImage && (
						<div className="relative -my-32 flex-shrink-0 lg:-my-48">
							<Img
								image={overlayImage}
								className="w-80 drop-shadow-2xl md:w-[26rem] lg:w-[31rem] xl:w-[36rem]"
							/>
						</div>
					)}

					{/* Text Content */}
					<div className="flex-1 text-center lg:text-left">
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
