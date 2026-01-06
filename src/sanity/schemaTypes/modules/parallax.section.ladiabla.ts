import { TfiGallery } from 'react-icons/tfi'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'parallax.section.ladiabla',
	title: 'Parallax Section - La Diabla',
	icon: TfiGallery,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'images', title: 'Images' },
		{ name: 'options', title: 'Options' },
	],
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			group: 'content',
			description: 'Multi-word heading (each word on new line)',
		}),
		defineField({
			name: 'backgroundImage',
			title: 'Background Image',
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
			group: 'images',
			description: 'Background image with parallax effect',
		}),
		defineField({
			name: 'overlayImage',
			title: 'Overlay Image (PNG)',
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
			group: 'images',
			description: 'Floating image that overlaps (best with transparent PNG)',
		}),
		defineField({
			name: 'imagePosition',
			title: 'Overlay Image Position',
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
			image: 'overlayImage',
			imagePosition: 'imagePosition',
		},
		prepare: ({ heading, image, imagePosition }) => ({
			title: heading || 'Parallax Section - La Diabla',
			subtitle: `Overlay on ${imagePosition || 'left'}`,
			media: image || TfiGallery,
		}),
	},
})
