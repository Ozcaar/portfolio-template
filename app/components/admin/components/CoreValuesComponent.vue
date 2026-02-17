<script setup lang="ts">
import AddButton from './AddButton.vue';
import ArrowButton from './ArrowButton.vue';
import InputBase from './InputBase.vue';
import RemoveButton from './RemoveButton.vue';
import type { Section } from '../../../types/types';

defineProps<{
	addCoreValue: () => void;
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
	<section v-if="section === 'coreValues'" class="space-y-6 m-5">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-semibold">Core Values</h2>
			<AddButton @click="addCoreValue" label="+ Add Core Value"></AddButton>
		</div>

		<div v-for="(item, idx) in model.coreValues" :key="idx" :class="[cardBase]">
			<div class="card-body p-4 space-y-3">
				<div class="flex items-center justify-between">
					<p class="font-semibold">{{ item.title.es || item.title.en || `Value #${idx + 1}` }}</p>
					<div class="flex gap-2">
						<ArrowButton
							@click="model.coreValues = moveItem(model.coreValues, idx, idx - 1) ?? model.coreValues">
						</ArrowButton>

						<ArrowButton
							@click="model.coreValues = moveItem(model.coreValues, idx, idx + 1) ?? model.coreValues"
							:downArrow="true">
						</ArrowButton>

						<RemoveButton @click="model.coreValues = removeAt(model.coreValues, idx)"></RemoveButton>
					</div>
				</div>

				<InputBase v-model="item.icon" name="core-value-icon" label="Icon" placeholder="(Icon, e.g., ✨)"
					:labelClass="labelClass" :inputClass="inputClass" />

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.title.es" name="core-value-title-es" label="Title (ES)"
						placeholder="Título en Español" :labelClass="labelClass" :inputClass="inputClass" />
					<InputBase v-model="item.title.en" name="core-value-title-en" label="Title (EN)"
						placeholder="Title in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.desc.es" name="core-value-desc-es" label="Desc (ES)" textarea :rows="6"
						placeholder="Descripción en Español" :labelClass="labelClass" :inputClass="inputClass" />
					<InputBase v-model="item.desc.en" name="core-value-desc-en" label="Desc (EN)" textarea :rows="6"
						placeholder="Description in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>
			</div>
		</div>
	</section>
</template>
