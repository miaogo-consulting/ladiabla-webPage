export default function DividerText({
	text,
}: Partial<{
	text: string
}> &
	Sanity.Module) {
	if (!text) return null

	return (
		<section className="relative z-10 bg-transparent py-8 lg:py-12">
			<div className="text-center">
				<p className="text-sm font-light uppercase tracking-[0.3em] text-amber-700">
					{text}
				</p>
			</div>
		</section>
	)
}
