import { TfiMenu } from 'react-icons/tfi'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'menu.explorer',
	title: 'Menu Explorer',
	icon: TfiMenu,
	type: 'object',
	fields: [
		defineField({
			name: 'items',
			title: 'Menu Items',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							title: 'Menu Title',
							type: 'string',
							description: 'e.g., "Comida", "Bebidas", "Vinos", "Postres"',
							validation: (Rule) => Rule.required(),
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
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'menuFile',
							title: 'Menu File (PDF or Image)',
							type: 'file',
							description: 'Upload PDF or PNG/JPG of the menu',
							options: {
								accept: 'application/pdf,image/png,image/jpeg',
							},
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: {
							title: 'title',
							media: 'backgroundImage',
						},
						prepare: ({ title, media }) => ({
							title: title || 'Menu Item',
							media: media,
						}),
					},
				},
			],
			validation: (Rule) => Rule.max(4).min(1).required(),
		}),
	],
	preview: {
		select: {
			items: 'items',
		},
		prepare: ({ items }) => ({
			title: 'Menu Explorer',
			subtitle: `${items?.length || 0} menu sections`,
			media: TfiMenu,
		}),
	},
})
