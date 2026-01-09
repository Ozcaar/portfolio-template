<script setup lang="ts">
import AddButton from './AddButton.vue';
import ArrowButton from './ArrowButton.vue';
import InputBase from './InputBase.vue';
import RemoveButton from './RemoveButton.vue';
import type { Section } from '../../../types/types';

defineProps<{
	addTimeline: () => void;
	model: { techStack: string[]; experience: { company: string; role: { es: string; en: string; }; duration: { es: string; en: string; }; description: { es: string; en: string; }; }[]; coreExpertise: { title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; experienceTimeline: { year: { es: string; en: string; }; role: { es: string; en: string; }; company: string; description: { es: string; en: string; }; }[]; coreValues: { icon: string; title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; faqItems: { q: { es: string; en: string; }; a: { es: string; en: string; }; }[]; socialLinks: { github: string; linkedin: string; email: string; }; };
	cardBase: "relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between font-poppins";
	moveItem: <T>(arr: T[] | undefined, from: number, to: number) => T[] | undefined;
	removeAt: <T>(arr: T[], idx: number) => T[];
	labelClass: "mb-2 block text-sm font-medium text-foreground";
	inputClass: string;
}>()
const section = defineModel<Section>('section', { required: true })
</script>

<template>
	<section v-if="section === 'experienceTimeline'" class="space-y-6 m-5">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-semibold">Experience Timeline</h2>
			<AddButton @click="addTimeline" label="+ Add Timeline"></AddButton>
		</div>

		<div v-for="(item, idx) in model.experienceTimeline" :key="idx" :class="[cardBase]">
			<div class="card-body p-4 space-y-3">
				<div class="flex items-center justify-between">
					<p class="font-semibold">{{ item.year.es || item.year.en || `Timeline #${idx + 1}` }}</p>
					<div class="flex gap-2">
						<ArrowButton
							@click="model.experienceTimeline = moveItem(model.experienceTimeline, idx, idx - 1) ?? model.experienceTimeline">
						</ArrowButton>

						<ArrowButton
							@click="model.experienceTimeline = moveItem(model.experienceTimeline, idx, idx + 1) ?? model.experienceTimeline"
							:downArrow="true">
						</ArrowButton>

						<RemoveButton @click="model.experienceTimeline = removeAt(model.experienceTimeline, idx)">
						</RemoveButton>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.year.es" name="timeline-year-es" label="Year (ES)"
						placeholder="Año en Español" :labelClass="labelClass" :inputClass="inputClass" />

					<InputBase v-model="item.year.en" name="timeline-year-en" label="Year (EN)"
						placeholder="Year in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.role.es" name="timeline-role-es" label="Role (ES)"
						placeholder="Rol en Español" :labelClass="labelClass" :inputClass="inputClass" />

					<InputBase v-model="item.role.en" name="timeline-role-en" label="Role (EN)"
						placeholder="Role in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>

				<InputBase v-model="item.company" name="timeline-company" label="Company" placeholder="Empresa"
					:labelClass="labelClass" :inputClass="inputClass" />

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">

					<InputBase v-model="item.description.es" name="timeline-description-es" label="Description (ES)"
						textarea :rows="6" placeholder="Descripción en Español" :labelClass="labelClass"
						:inputClass="inputClass" />
					<InputBase v-model="item.description.en" name="timeline-description-en" label="Description (EN)"
						textarea :rows="6" placeholder="Description in English" :labelClass="labelClass"
						:inputClass="inputClass" />
				</div>
			</div>
		</div>
	</section>
</template>
