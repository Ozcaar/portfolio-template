<script setup lang="ts">
import AddButton from './AddButton.vue';
import DownButton from './DownButton.vue';
import InputBase from './InputBase.vue';
import RemoveButton from './RemoveButton.vue';
import UpButton from './UpButton.vue';
import type { Section } from '../../../types/types';

defineProps<{
	cardBase: "relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between font-poppins";
	addTech: () => void;
	model: { techStack: string[]; experience: { company: string; role: { es: string; en: string; }; duration: { es: string; en: string; }; description: { es: string; en: string; }; }[]; coreExpertise: { title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; experienceTimeline: { year: { es: string; en: string; }; role: { es: string; en: string; }; company: string; description: { es: string; en: string; }; }[]; coreValues: { icon: string; title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; faqItems: { q: { es: string; en: string; }; a: { es: string; en: string; }; }[]; socialLinks: { github: string; linkedin: string; email: string; }; };
	inputClass: string;
	moveItem: <T>(arr: T[] | undefined, from: number, to: number) => T[] | undefined;
	removeAt: <T>(arr: T[], idx: number) => T[];
	getFieldError: (prefix: string) => string | null;
}>()
const section = defineModel<Section>('section', { required: true })
</script>

<template>
	<section v-if="section === 'techStack'" :class="[cardBase]" class="space-y-6 mx-5">
		<div class="card-body p-4 space-y-3">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Tech Stack</h2>
				<AddButton @click="addTech"></AddButton>
			</div>

			<div class="space-y-2">
				<div v-for="(t, idx) in model.techStack" :key="`${idx}-${t}`" class="flex gap-2 items-center">
					<InputBase :modelValue="t" @update:modelValue="value => {
						const copy = [...model.techStack]
						copy[idx] = value
						model.techStack = copy
					}" name="tech-stack-item" label="" placeholder="e.g. TypeScript" :inputClass="inputClass" class="w-full" />

					<UpButton @click="model.techStack = moveItem(model.techStack, idx, idx - 1) ?? model.techStack" />

					<DownButton @click="model.techStack = moveItem(model.techStack, idx, idx + 1) ?? model.techStack" />

					<RemoveButton @click="model.techStack = removeAt(model.techStack, idx)" />
				</div>
			</div>

			<p v-if="getFieldError('techStack')" class="text-sm text-warning">
				{{ getFieldError('techStack') }}
			</p>
		</div>
	</section>
</template>
