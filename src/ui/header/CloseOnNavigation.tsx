'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function CloseOnNavigation() {
	const pathname = usePathname()

	useEffect(() => {
		const checkbox = document.getElementById('header-toggle') as HTMLInputElement
		if (checkbox) {
			checkbox.checked = false
		}
	}, [pathname])

	return null
}
