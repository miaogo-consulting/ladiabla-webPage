import { getSite } from '@/sanity/lib/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import { Img } from '@/ui/Img'
import Navigation from './Navigation'
import CloseOnNavigation from './CloseOnNavigation'

export default async function Header() {
	const { title, logo, ctas, whatsappNumber, reservationMessage } = await getSite()

	const logoImage = logo?.image?.dark || logo?.image?.default
	const reserveCTA = ctas?.[0] // First CTA for reserve button
	const reserveLink = whatsappNumber
		? `https://wa.me/${whatsappNumber}${reservationMessage ? `?text=${encodeURIComponent(reservationMessage)}` : ''}`
		: (reserveCTA?.link?.internal?.metadata?.slug?.current || reserveCTA?.link?.external || '/reservaciones')

	return (
		<Wrapper className="border-stone-200/50 bg-stone-50/95 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300">
			<CloseOnNavigation />
			<div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 md:px-12 md:py-5">
				{/* Left: Reservar Button */}
				{(reserveCTA || whatsappNumber) && (
					<Link
						href={reserveLink}
						target="_blank"
						rel="noopener noreferrer"
						className="hidden border border-amber-700 px-6 py-2 text-sm font-light uppercase tracking-[0.15em] text-amber-800 transition-all duration-300 hover:bg-amber-700 hover:text-white md:block"
					>
						{reserveCTA?.label || 'Reservar'}
					</Link>
				)}

				{/* Center: Logo */}
				<Link
					className="absolute left-1/2 -translate-x-1/2"
					href="/"
				>
					{logoImage ? (
						<Img
							className="h-[4.5rem] w-auto"
							image={logoImage}
							alt={logo?.name || title}
						/>
					) : (
						<span className="font-serif text-2xl text-stone-800">{title}</span>
					)}
				</Link>

				{/* Right: Hamburger Menu */}
				<label
					htmlFor="header-toggle"
					className="z-10 cursor-pointer p-2"
				>
					<input id="header-toggle" type="checkbox" className="peer hidden" />

					{/* Hamburger Icon */}
					<div className="flex flex-col gap-1.5 peer-checked:hidden">
						<span className="block h-0.5 w-7 bg-stone-800 transition-all"></span>
						<span className="block h-0.5 w-7 bg-stone-800 transition-all"></span>
						<span className="block h-0.5 w-7 bg-stone-800 transition-all"></span>
					</div>

					{/* Close Icon */}
					<div className="hidden flex-col items-center justify-center peer-checked:flex">
						<svg className="h-7 w-7 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</div>
				</label>
			</div>

			{/* Sidebar Navigation */}
			<div className="header-closed:pointer-events-none header-closed:translate-x-full fixed right-0 top-0 h-screen w-full bg-stone-50 transition-transform duration-300 md:w-[400px]">
				<div className="flex h-full flex-col justify-center p-8 md:p-12">
					<Navigation />

					{/* Mobile Reservar Button */}
					{(reserveCTA || whatsappNumber) && (
						<Link
							href={reserveLink}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-8 border border-amber-700 px-8 py-3 text-center text-sm font-light uppercase tracking-[0.2em] text-amber-800 transition-all duration-300 hover:bg-amber-700 hover:text-white md:hidden"
						>
							{reserveCTA?.label || 'Reservar Mesa'}
						</Link>
					)}
				</div>
			</div>
		</Wrapper>
	)
}
