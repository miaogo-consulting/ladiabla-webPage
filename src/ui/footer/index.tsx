import { getSite } from '@/sanity/lib/queries'
import Social from '@/ui/Social'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { Img } from '@/ui/Img'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default async function Footer() {
	const { title, blurb, logo, copyright, phone, email, address, mapsLink, hours, ctas, whatsappNumber, reservationMessage } =
		await getSite()

	const logoImage = logo?.image?.light || logo?.image?.default
	const reserveCTA = ctas?.[0] // First CTA for reserve button
	const reserveLink = whatsappNumber
		? `https://wa.me/${whatsappNumber}${reservationMessage ? `?text=${encodeURIComponent(reservationMessage)}` : ''}`
		: (reserveCTA?.link?.internal?.metadata?.slug?.current || reserveCTA?.link?.external || '/reservaciones')

	return (
		<footer className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100" role="contentinfo">
			{/* Decorative line */}
			<div className="h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent shadow-sm" />

			{/* Main Footer Content */}
			<div className="relative mx-auto max-w-screen-xl px-6 py-16 md:px-12 md:py-20">
				<div className="grid gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
					{/* Column 1: Logo & Description */}
					<div className="space-y-6">
						<Link className="mx-auto block max-w-max md:mx-0" href="/">
							{logoImage ? (
								<Img
									className="h-20 w-auto"
									image={logoImage}
									alt={logo?.name || title}
								/>
							) : (
								<span className="font-serif text-3xl font-normal text-stone-800">
									{title}
								</span>
							)}
						</Link>

						{blurb && (
							<div className="mx-auto max-w-xs text-sm leading-relaxed text-stone-600 md:mx-0">
								<PortableText value={blurb} />
							</div>
						)}
					</div>

					{/* Column 2: Contact */}
					{(phone || email || address) && (
						<div className="space-y-6">
							<h3 className="font-serif text-base font-light uppercase tracking-[0.2em] text-stone-900">
								Contacto
							</h3>
							<div className="inline-flex flex-col space-y-4 text-left text-sm text-stone-600">
								{phone && (
									<a
										href={`tel:${phone}`}
										className="flex items-center gap-3 transition-colors hover:text-amber-700"
									>
										<Phone className="h-4 w-4 flex-shrink-0" />
										<span>{phone}</span>
									</a>
								)}
								{email && (
									<a
										href={`mailto:${email}`}
										className="flex items-center gap-3 transition-colors hover:text-amber-700"
									>
										<Mail className="h-4 w-4 flex-shrink-0" />
										<span>{email}</span>
									</a>
								)}
								{address && (
									<a
										href={mapsLink || '#'}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-start gap-3 transition-colors hover:text-amber-700"
									>
										<MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
										<span className="whitespace-pre-line">{address}</span>
									</a>
								)}
							</div>
						</div>
					)}

					{/* Column 3: Hours */}
					{hours && hours.length > 0 && (
						<div className="space-y-6">
							<h3 className="font-serif text-base font-light uppercase tracking-[0.2em] text-stone-900">
								Horarios
							</h3>
							<div className="inline-flex items-start gap-3 text-left text-sm text-stone-600">
								<Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
								<div className="space-y-2">
									{hours.map((schedule: { days: string; hours: string }, idx: number) => (
										<div key={idx} className="flex items-baseline gap-2">
											<span className="font-medium text-stone-800 min-w-[100px]">{schedule.days}</span>
											<span className="text-stone-600">{schedule.hours}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Column 4: Social & CTA */}
					<div className="space-y-6">
						<h3 className="font-serif text-base font-light uppercase tracking-[0.2em] text-stone-900">
							Síguenos
						</h3>
						<Social className="flex justify-center gap-4 md:justify-start [&_a]:text-stone-600 [&_a]:transition-colors [&_a:hover]:text-amber-700" />

						{(reserveCTA || whatsappNumber) && (
							<Link
								href={reserveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="group mt-6 inline-block overflow-hidden border border-amber-700 px-10 py-3.5 text-center text-sm font-light uppercase tracking-[0.2em] text-amber-800 transition-all duration-300 hover:border-amber-800 hover:bg-amber-700 hover:text-white hover:shadow-lg"
							>
								<span className="relative">{reserveCTA?.label || 'Reservar Mesa'}</span>
							</Link>
						)}
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-stone-200 bg-stone-100 px-6 py-6 md:px-12">
				<div className="mx-auto max-w-screen-xl space-y-2 text-center text-xs text-stone-500">
					{copyright && (
						<div className="[&_a]:underline [&_a]:transition-colors [&_a:hover]:text-amber-700">
							<PortableText value={copyright} />
						</div>
					)}
					<div className="text-stone-400">
						Made by{' '}
						<a
							href="https://www.miaogo.com.mx/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-stone-500 transition-colors hover:text-amber-700"
						>
							Miaogo
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
