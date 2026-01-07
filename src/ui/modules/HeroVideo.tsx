import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'

export default function HeroVideo({
	heading,
	content,
	video,
	videoMobile,
	textAlign: ta = 'center',
	alignItems: ai = 'center',
	...props
}: Partial<{
	heading: string
	content: any
	video: {
		url: string
		asset?: {
			url: string
		}
	}
	videoMobile?: {
		url: string
		asset?: {
			url: string
		}
	}
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}> &
	Sanity.Module) {
	const textAlign = stegaClean(ta)
	const alignItems = stegaClean(ai)
	const videoUrl = video?.asset?.url || video?.url
	const videoMobileUrl = videoMobile?.asset?.url || videoMobile?.url

	return (
		<section
			className="relative grid overflow-hidden *:col-span-full *:row-span-full"
			style={{ height: '110vh' }}
			{...moduleProps(props)}
		>
			{/* Video Background */}
			{videoUrl && (
				<>
					{/* Desktop Video */}
					<video
						autoPlay
						loop
						muted
						playsInline
						className="hidden size-full object-cover md:block"
					>
						<source src={videoUrl} type="video/mp4" />
					</video>

					{/* Mobile Video */}
					{videoMobileUrl && (
						<video
							autoPlay
							loop
							muted
							playsInline
							className="block size-full object-cover md:hidden"
						>
							<source src={videoMobileUrl} type="video/mp4" />
						</video>
					)}

					{/* Fallback: Show desktop video on mobile if no mobile video */}
					{!videoMobileUrl && (
						<video
							autoPlay
							loop
							muted
							playsInline
							className="block size-full object-cover md:hidden"
						>
							<source src={videoUrl} type="video/mp4" />
						</video>
					)}
				</>
			)}

			{/* Elegant gradient overlay */}
			<div className="bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

			{/* Content */}
			<div className="section flex h-full w-full flex-col text-balance text-white">
				<div
					className={cn('richtext relative isolate mx-auto w-full max-w-5xl px-6', {
						'mt-20 md:mt-32': alignItems === 'start',
						'my-auto': alignItems === 'center',
						'mb-20 mt-auto md:mb-32': alignItems === 'end',
					})}
					style={{ textAlign }}
				>
					{heading && (
						<h1 className="font-serif text-5xl font-light uppercase tracking-[0.15em] drop-shadow-2xl md:text-7xl lg:text-8xl xl:text-9xl">
							{heading}
						</h1>
					)}

					{content && (
						<div className="mt-8 font-light leading-relaxed drop-shadow-lg md:text-xl lg:text-2xl">
							<PortableText value={content} />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
