import { defineField, defineType } from 'sanity'
import { TfiText } from 'react-icons/tfi'

export default defineType({
	name: 'gallery.text',
	title: 'Gallery Text Card',
	type: 'object',
	icon: TfiText,
	fields: [
		defineField({
			name: 'text',
			type: 'string',
			description: 'Short text to display (uppercase)',
		}),
		defineField({
			name: 'size',
			title: 'Size',
			type: 'string',
			options: {
				list: [
					{ title: 'Small (1x1)', value: 'small' },
					{ title: 'Medium (4:3)', value: 'medium' },
					{ title: 'Large (2x2)', value: 'large' },
					{ title: 'Tall (3:4)', value: 'tall' },
					{ title: 'Wide (16:9)', value: 'wide' },
				],
				layout: 'dropdown',
			},
			initialValue: 'medium',
			hidden: ({ parent }) => parent?.enableCarousel,
		}),
	],
	preview: {
		select: {
			text: 'text',
			size: 'size',
		},
		prepare: ({ text, size }) => ({
			title: text || 'Text Card',
			subtitle: size || 'medium',
		}),
	},
})
