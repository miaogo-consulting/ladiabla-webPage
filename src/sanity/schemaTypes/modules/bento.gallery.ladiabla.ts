import { TfiGallery } from 'react-icons/tfi'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'bento.gallery.ladiabla',
	title: 'Bento Gallery - La Diabla',
	icon: TfiGallery,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'gallery', title: 'Gallery Items' },
		{ name: 'options', title: 'Options' },
	],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'heading',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'text',
			rows: 3,
			group: 'content',
		}),
		defineField({
			name: 'items',
			title: 'Gallery Items',
			type: 'array',
			of: [{ type: 'gallery.image' }, { type: 'gallery.text' }],
			group: 'gallery',
			validation: (Rule) => Rule.min(1).max(20),
		}),
		defineField({
			name: 'enableCarousel',
			title: 'Enable Horizontal Carousel',
			type: 'boolean',
			description:
				'Enable horizontal scrolling with arrows. Recommended for many items.',
			initialValue: false,
			group: 'options',
		}),
	],
	preview: {
		select: {
			heading: 'heading',
			items: 'items',
			enableCarousel: 'enableCarousel',
		},
		prepare: ({ heading, items, enableCarousel }) => ({
			title: heading || 'Bento Gallery - La Diabla',
			subtitle: `${items?.length || 0} items${enableCarousel ? ' (Carousel)' : ''}`,
			media: TfiGallery,
		}),
	},
})
