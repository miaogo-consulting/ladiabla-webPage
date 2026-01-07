import { TfiText } from 'react-icons/tfi'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'divider.text',
	title: 'Divider Text',
	icon: TfiText,
	type: 'object',
	fields: [
		defineField({
			name: 'text',
			type: 'string',
			description: 'Small centered text (e.g., "NUESTRA BARRA")',
		}),
	],
	preview: {
		select: {
			text: 'text',
		},
		prepare: ({ text }) => ({
			title: text || 'Divider Text',
			subtitle: 'Text separator',
			media: TfiText,
		}),
	},
})
