import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { alignItems, textAlign } from '../fragments'

export default defineType({
	name: 'hero.video',
	title: 'Hero (Video Background)',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'video' },
		{ name: 'options' },
	],
	fieldsets: [
		{ name: 'alignment', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			description: 'Main heading text (e.g., "PASSION FOR ITALIAN FLAVORS")',
			group: 'content',
		}),
		defineField({
			name: 'content',
			title: 'Subtitle/Content',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Optional subtitle or additional text',
			group: 'content',
		}),
		defineField({
			name: 'video',
			title: 'Background Video (Desktop)',
			type: 'file',
			description: 'Upload an MP4 video for desktop (will loop automatically)',
			options: {
				accept: 'video/mp4,video/webm',
			},
			group: 'video',
		}),
		defineField({
			name: 'videoMobile',
			title: 'Background Video (Mobile)',
			type: 'file',
			description: 'Optional: Upload a different video for mobile (portrait/vertical format recommended)',
			options: {
				accept: 'video/mp4,video/webm',
			},
			group: 'video',
		}),
		defineField({
			...(alignItems as any),
			fieldset: 'alignment',
			group: 'options',
		}),
		defineField({
			...(textAlign as any),
			fieldset: 'alignment',
			group: 'options',
		}),
	],
	preview: {
		select: {
			heading: 'heading',
		},
		prepare: ({ heading }) => ({
			title: heading || 'Hero Video',
			subtitle: 'Hero (Video Background)',
		}),
	},
})
