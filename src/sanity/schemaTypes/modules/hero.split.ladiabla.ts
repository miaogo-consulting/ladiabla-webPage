import { TfiLayoutGrid2 } from 'react-icons/tfi'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'hero.split.ladiabla',
	title: 'Hero Split - La Diabla',
	icon: TfiLayoutGrid2,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'image', title: 'Image' },
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
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
				}),
			],
			group: 'image',
		}),
		defineField({
			name: 'imagePosition',
			title: 'Image Position',
			type: 'string',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio',
			},
			initialValue: 'left',
			group: 'options',
		}),
	],
	preview: {
		select: {
			heading: 'heading',
			image: 'image',
			imagePosition: 'imagePosition',
		},
		prepare: ({ heading, image, imagePosition }) => ({
			title: heading || 'Hero Split - La Diabla',
			subtitle: `Image on ${imagePosition || 'left'}`,
			media: image || TfiLayoutGrid2,
		}),
	},
})
