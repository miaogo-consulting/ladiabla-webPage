import { defineField, defineType } from 'sanity'
import { TfiImage } from 'react-icons/tfi'

export default defineType({
	name: 'gallery.image',
	title: 'Gallery Image',
	type: 'object',
	icon: TfiImage,
	fields: [
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
			image: 'image',
			size: 'size',
		},
		prepare: ({ image, size }) => ({
			title: `Image - ${size || 'medium'}`,
			media: image,
		}),
	},
})
