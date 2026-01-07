import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Site settings',
	type: 'document',
	groups: [
		{ name: 'branding', default: true },
		{ name: 'contact', title: 'Contact Info' },
		{ name: 'info' },
		{ name: 'navigation' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			group: 'branding',
		}),
		defineField({
			name: 'blurb',
			description: 'Content displayed in the footer',
			type: 'array',
			of: [{ type: 'block', lists: [] }],
			group: 'branding',
		}),
		defineField({
			name: 'logo',
			type: 'logo',
			group: 'branding',
		}),
		defineField({
			name: 'phone',
			title: 'Phone Number',
			type: 'string',
			group: 'contact',
		}),
		defineField({
			name: 'whatsappNumber',
			title: 'WhatsApp Number',
			description: 'Phone number for WhatsApp reservations (e.g., 5215512345678)',
			type: 'string',
			group: 'contact',
		}),
		defineField({
			name: 'reservationMessage',
			title: 'WhatsApp Reservation Message',
			description: 'Pre-filled message when clicking reservation button',
			type: 'text',
			rows: 2,
			group: 'contact',
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string',
			group: 'contact',
		}),
		defineField({
			name: 'address',
			title: 'Address',
			type: 'text',
			rows: 3,
			group: 'contact',
		}),
		defineField({
			name: 'mapsLink',
			title: 'Google Maps Link',
			type: 'url',
			group: 'contact',
		}),
		defineField({
			name: 'hours',
			title: 'Business Hours',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'days', type: 'string', title: 'Days' },
						{ name: 'hours', type: 'string', title: 'Hours' },
					],
				},
			],
			group: 'contact',
		}),
		defineField({
			name: 'announcements',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'announcement' }] }],
			group: 'info',
		}),
		defineField({
			name: 'copyright',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
				},
			],
			group: 'info',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-action (global)',
			description: 'Typically used in the header and/or footer.',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'navigation',
		}),
		defineField({
			name: 'headerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'footerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'social',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Site settings',
		}),
	},
})
