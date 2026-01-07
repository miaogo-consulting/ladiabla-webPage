import { PortableText } from 'next-sanity'
import { Img } from '@/ui/Img'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'

export default function HeroSplitLaDiabla({
	pretitle,
	heading,
	content,
	ctas,
	image,
	imagePosition = 'left',
}: Partial<{
	pretitle: string
	heading: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image
	imagePosition: 'left' | 'right'
}> &
	Sanity.Module) {
	return (
		<section className="grid lg:grid-cols-2">
			{/* Image - Full Width */}
			<div
				className={cn(
					'relative min-h-[400px] overflow-hidden lg:min-h-[600px]',
					imagePosition === 'right' && 'lg:order-2',
				)}
			>
				{image && (
					<Img
						image={image}
						className="h-full w-full object-cover"
					/>
				)}
			</div>

			{/* Content - Centered with max-width */}
			<div className="flex flex-col justify-center bg-stone-50/50 px-6 py-20 md:px-12 lg:px-16 xl:px-24">
				<div className="mx-auto w-full max-w-xl space-y-6">
					{pretitle && (
						<p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-amber-800/70">
							{pretitle}
						</p>
					)}

					{heading && (
						<h2 className="text-balance font-serif text-4xl font-light leading-[1.15] tracking-tight text-stone-900 md:text-5xl lg:text-6xl xl:text-7xl">
							{heading}
						</h2>
					)}

					{/* Decorative divider */}
					<div className="flex items-center gap-4 py-6">
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />
						<div className="h-1.5 w-1.5 rotate-45 border border-amber-700/50" />
						<div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-700/30 to-transparent" />
					</div>

					{content && (
						<div className="prose prose-lg max-w-none font-light leading-relaxed text-stone-600 [&_p]:mb-4 [&_p]:text-base [&_p]:md:text-lg">
							<PortableText value={content} />
						</div>
					)}

					{ctas && ctas.length > 0 && (
						<CTAList
							ctas={ctas}
							className="!mt-10 flex gap-4"
						/>
					)}
				</div>
			</div>
		</section>
	)
}
