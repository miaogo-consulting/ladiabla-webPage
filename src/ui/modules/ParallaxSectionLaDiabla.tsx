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
		<section ref={sectionRef} className="relative bg-stone-100 py-24 lg:py-32">
			{/* Background Image with Parallax */}
			{backgroundImage && (
				<div
					className="absolute inset-0 overflow-hidden opacity-30"
					style={{ transform: `translateY(${offsetY * 0.5}px)` }}
				>
					<Img
						image={backgroundImage}
						className="h-full w-full object-cover"
					/>
				</div>
			)}

			{/* Content Container */}
			<div className="relative mx-auto max-w-screen-xl px-4">
				<div
					className={cn(
						'grid items-center gap-8 lg:grid-cols-2',
						imagePosition === 'right' && 'lg:grid-flow-dense',
					)}
				>
					{/* Overlapping Image - Extends beyond section boundaries */}
					<div
						className={cn(
							'relative z-20 mx-auto max-w-md lg:max-w-lg',
							imagePosition === 'right' && 'lg:col-start-2',
						)}
					>
						{overlayImage && (
							<div className="relative -my-32 lg:-my-48">
								<Img
									image={overlayImage}
									className="w-full drop-shadow-2xl"
								/>
							</div>
						)}
					</div>

					{/* Text Content */}
					<div
						className={cn(
							'relative z-10 text-center lg:text-left',
							imagePosition === 'right' && 'lg:col-start-1 lg:text-right',
						)}
					>
						{heading && (
							<h2 className="font-serif text-5xl font-normal uppercase leading-tight tracking-wider text-stone-800 md:text-6xl lg:text-7xl">
								{heading.split(' ').map((word, i) => (
									<span key={i} className="block">
										{word}
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
