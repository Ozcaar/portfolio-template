<script setup lang="ts">
import InputBase from './InputBase.vue';
import type { Section } from '../../../types/types';

defineProps<{
	cardBase: "relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between font-poppins";
	model: { techStack: string[]; experience: { company: string; role: { es: string; en: string; }; duration: { es: string; en: string; }; description: { es: string; en: string; }; }[]; coreExpertise: { title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; experienceTimeline: { year: { es: string; en: string; }; role: { es: string; en: string; }; company: string; description: { es: string; en: string; }; }[]; coreValues: { icon: string; title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; faqItems: { q: { es: string; en: string; }; a: { es: string; en: string; }; }[]; socialLinks: { github: string; linkedin: string; email: string; }; };
	labelClass: "mb-2 block text-sm font-medium text-foreground";
	inputClass: string;
	getFieldError: (prefix: string) => string | null;
}>()
const section = defineModel<Section>('section', { required: true })
</script>

<template>
	<section v-if="section === 'socialLinks'" :class="[cardBase]" class="space-y-6 mx-5">
		<div class="card-body p-4 space-y-3">
			<h2 class="text-lg font-semibold">Social Links</h2>

			<InputBase v-model="model.socialLinks.github" name="social-github" label="GitHub" placeholder="GitHub URL"
				:labelClass="labelClass" :inputClass="inputClass" />
			<span v-if="getFieldError('socialLinks.github')" class="text-xs text-warning mt-1">
				{{ getFieldError('socialLinks.github') }}
			</span>

			<InputBase v-model="model.socialLinks.linkedin" name="social-linkedin" label="LinkedIn"
				placeholder="LinkedIn URL" :labelClass="labelClass" :inputClass="inputClass" />
			<span v-if="getFieldError('socialLinks.linkedin')" class="text-xs text-warning mt-1">
				{{ getFieldError('socialLinks.linkedin') }}
			</span>

			<InputBase v-model="model.socialLinks.email" name="social-email" label="Email" placeholder="Email URL"
				:labelClass="labelClass" :inputClass="inputClass" />
			<span v-if="getFieldError('socialLinks.email')" class="text-xs text-warning mt-1">
				{{ getFieldError('socialLinks.email') }}
			</span>
		</div>
	</section>
</template>
