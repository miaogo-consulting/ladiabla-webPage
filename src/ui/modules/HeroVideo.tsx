import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'

export default function HeroVideo({
	heading,
	content,
	video,
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
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}> &
	Sanity.Module) {
	const textAlign = stegaClean(ta)
	const alignItems = stegaClean(ai)
	const videoUrl = video?.asset?.url || video?.url

	console.log('HeroVideo DEBUG:', { heading, video, videoUrl, props })

	return (
		<section
			className="relative grid min-h-screen overflow-hidden *:col-span-full *:row-span-full"
			{...moduleProps(props)}
		>
			{/* Video Background */}
			{videoUrl && (
				<video
					autoPlay
					loop
					muted
					playsInline
					className="size-full object-cover"
				>
					<source src={videoUrl} type="video/mp4" />
				</video>
			)}

			{/* Dark Overlay */}
			<div className="bg-black/40" />

			{/* Content */}
			<div className="section flex w-full flex-col text-balance text-white">
				<div
					className={cn('richtext relative isolate mx-auto max-w-4xl text-center', {
						'mb-8': alignItems === 'start',
						'my-auto': alignItems === 'center',
						'mt-auto': alignItems === 'end',
					})}
					style={{ textAlign }}
				>
					{heading && (
						<h1 className="text-6xl font-bold uppercase tracking-wider md:text-8xl">
							{heading}
						</h1>
					)}

					{content && (
						<div className="mt-6 text-xl md:text-2xl">
							<PortableText value={content} />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
