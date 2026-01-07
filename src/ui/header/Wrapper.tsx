'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Wrapper({
	className,
	children,
}: React.ComponentProps<'header'>) {
	const ref = useRef<HTMLDivElement>(null)
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(true) // Start true to match SSR
	const [mounted, setMounted] = useState(false)

	// set --header-height
	useEffect(() => {
		if (typeof window === 'undefined') return

		function setHeight() {
			if (!ref.current) return
			document.documentElement.style.setProperty(
				'--header-height',
				`${ref.current.offsetHeight ?? 0}px`,
			)
		}
		setHeight()
		window.addEventListener('resize', setHeight)

		return () => window.removeEventListener('resize', setHeight)
	}, [])

	// close menus after navigation
	useEffect(() => {
		if (typeof document === 'undefined') return
		const toggle = document.querySelector('#header-open') as HTMLInputElement
		if (toggle) toggle.checked = false

		if (!ref.current) return
		ref.current.querySelectorAll('details').forEach((element) => {
			if (element.open) element.open = false
		})
	}, [pathname])

	// detect scroll for transparent navbar
	useEffect(() => {
		setMounted(true)
		if (typeof window === 'undefined') return

		function handleScroll() {
			setIsScrolled(window.scrollY > 20)
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			ref={ref}
			className={cn(
				className,
				'transition-all duration-500 ease-out',
				mounted && !isScrolled && '!bg-transparent !border-transparent !backdrop-blur-none shadow-none',
			)}
			role="banner"
		>
			{children}
		</header>
	)
}
