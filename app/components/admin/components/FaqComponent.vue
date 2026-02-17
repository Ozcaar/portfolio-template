<script setup lang="ts">
import AddButton from './AddButton.vue';
import ArrowButton from './ArrowButton.vue';
import InputBase from './InputBase.vue';
import RemoveButton from './RemoveButton.vue';
import type { Section } from '../../../types/types';
defineProps<{
	addFaq: () => void;
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
	<section v-if="section === 'faqItems'" class="space-y-6 m-5">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-semibold">FAQ</h2>
			<AddButton @click="addFaq" label="+ Add FAQ"></AddButton>
		</div>

		<div v-for="(item, idx) in model.faqItems" :key="idx" :class="[cardBase]">
			<div class="card-body p-4 space-y-3">
				<div class="flex items-center justify-between">
					<p class="font-semibold">
						{{ item.q.es || item.q.en || `FAQ #${idx + 1}` }}
					</p>
					<div class="flex gap-2">
						<ArrowButton @click="model.faqItems = moveItem(model.faqItems, idx, idx - 1) ?? model.faqItems">
						</ArrowButton>

						<ArrowButton @click="model.faqItems = moveItem(model.faqItems, idx, idx + 1) ?? model.faqItems"
							:downArrow="true">
						</ArrowButton>

						<RemoveButton @click="model.faqItems = removeAt(model.faqItems, idx)"></RemoveButton>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.q.es" name="faq-question-es" label="Question (ES)" textarea :rows="4"
						placeholder="Pregunta en Español" :labelClass="labelClass" :inputClass="inputClass" />
					<InputBase v-model="item.q.en" name="faq-question-en" label="Question (EN)" textarea :rows="4"
						placeholder="Question in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.a.es" name="faq-answer-es" label="Answer (ES)" textarea :rows="6"
						placeholder="Respuesta en Español" :labelClass="labelClass" :inputClass="inputClass" />
					<InputBase v-model="item.a.en" name="faq-answer-en" label="Answer (EN)" textarea :rows="6"
						placeholder="Answer in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>
			</div>
		</div>
	</section>
</template>
