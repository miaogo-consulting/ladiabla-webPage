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
			<div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 xl:px-24">
				<div className="mx-auto w-full max-w-xl space-y-6">
					{pretitle && (
						<p className="text-sm font-medium uppercase tracking-wider text-amber-700">
							{pretitle}
						</p>
					)}

					{heading && (
						<h2 className="text-balance font-serif text-4xl font-normal leading-tight md:text-5xl lg:text-6xl">
							{heading}
						</h2>
					)}

					{/* Decorative divider */}
					<div className="flex items-center gap-3">
						<div className="h-px w-16 bg-amber-700" />
						<div className="h-2 w-2 rotate-45 border border-amber-700" />
						<div className="h-px w-16 bg-amber-700" />
					</div>

					{content && (
						<div className="prose prose-lg max-w-none text-gray-700">
							<PortableText value={content} />
						</div>
					)}

					{ctas && ctas.length > 0 && (
						<CTAList
							ctas={ctas}
							className="!mt-8 flex gap-4"
						/>
					)}
				</div>
			</div>
		</section>
	)
}
