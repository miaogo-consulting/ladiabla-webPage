import { NextResponse, type NextRequest, type ProxyConfig } from 'next/server'
import { getTranslations } from './sanity/lib/queries'
import { DEFAULT_LANG, langCookieName } from './lib/i18n'

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const lang = request.cookies.get(langCookieName)?.value

	const T = await getTranslations()

	const isPrefixed = !!T.find((t) =>
		t.translations?.some(({ slug }) => slug === pathname),
	)

	if (!request.cookies.has(langCookieName) && !isPrefixed) {
		const response = NextResponse.next()
		addSecurityHeaders(response)
		return response
	}

	const available = T?.find((t) =>
		[t.slug, ...(t.translations?.map(({ slug }) => slug) ?? [])].includes(
			pathname,
		),
	)

	if (!available) {
		const response = NextResponse.next()
		addSecurityHeaders(response)
		return response
	}

	const cookieMatchesCurrentPrefix =
		// cookie matches current prefix
		lang ===
			available.translations?.find((t) =>
				[t.slugBlogAlt, t.slug].includes(pathname),
			)?.language ||
		// default language and current path is the base path
		(lang === DEFAULT_LANG && pathname === available.slug)

	if (!cookieMatchesCurrentPrefix) {
		const target = available.translations?.find((t) => t.language === lang)
		// use base path for default language
		const url =
			target?.language === DEFAULT_LANG
				? available.slug
				: (target?.slugBlogAlt ?? target?.slug)

		if (!url) {
			const response = NextResponse.next()
			addSecurityHeaders(response)
			return response
		}

		const response = NextResponse.redirect(new URL(url, request.url))
		addSecurityHeaders(response)
		return response
	}

	const response = NextResponse.next()
	addSecurityHeaders(response)
	return response
}

// Función helper para agregar security headers
function addSecurityHeaders(response: NextResponse) {
	// 1. Prevenir clickjacking
	response.headers.set('X-Frame-Options', 'SAMEORIGIN')

	// 2. Prevenir MIME sniffing
	response.headers.set('X-Content-Type-Options', 'nosniff')

	// 3. XSS filter legacy
	response.headers.set('X-XSS-Protection', '1; mode=block')

	// 4. HSTS solo en producción
	if (process.env.NODE_ENV === 'production') {
		response.headers.set(
			'Strict-Transport-Security',
			'max-age=31536000; includeSubDomains',
		)
	}

	// 5. Referrer policy balanceado
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
}

export const config: ProxyConfig = {
	matcher: ['/((?!favicon.ico|_next|api|admin).*)'],
}
