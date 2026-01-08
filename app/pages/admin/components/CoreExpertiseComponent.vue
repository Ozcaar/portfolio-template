<script setup lang="ts">
import AddButton from './AddButton.vue';
import DownButton from './DownButton.vue';
import InputBase from './InputBase.vue';
import RemoveButton from './RemoveButton.vue';
import UpButton from './UpButton.vue';
import type { Section } from '../../../types/types';

defineProps<{
	addCoreExpertise: () => void;
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
	<section v-if="section === 'coreExpertise'" class="space-y-6 m-5">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-semibold">Core Expertise</h2>
			<AddButton @click="addCoreExpertise">
			</AddButton>
		</div>

		<div v-for="(item, idx) in model.coreExpertise" :key="idx" :class="[cardBase]">
			<div class="card-body p-4 space-y-3">
				<div class="flex items-center justify-between">
					<p class="font-semibold">{{ item.title.es || item.title.en || `Item #${idx + 1}` }}</p>
					<div class="flex gap-2">

						<UpButton
							@click="model.coreExpertise = moveItem(model.coreExpertise, idx, idx - 1) ?? model.coreExpertise">
						</UpButton>

						<DownButton
							@click="model.coreExpertise = moveItem(model.coreExpertise, idx, idx + 1) ?? model.coreExpertise">
						</DownButton>

						<RemoveButton @click="model.coreExpertise = removeAt(model.coreExpertise, idx)"></RemoveButton>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.title.es" name="core-expertise-title-es" label="Title (ES)"
						placeholder="Título en Español" :labelClass="labelClass" :inputClass="inputClass" />

					<InputBase v-model="item.title.en" name="core-expertise-title-en" label="Title (EN)"
						placeholder="Title in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.desc.es" name="core-expertise-desc-es" label="Desc (ES)" textarea :rows="6"
						placeholder="Descripción en Español" :labelClass="labelClass" :inputClass="inputClass" />

					<InputBase v-model="item.desc.en" name="core-expertise-desc-en" label="Desc (EN)" textarea :rows="6"
						placeholder="Description in English" :labelClass="labelClass" :inputClass="inputClass" />
				</div>
			</div>
		</div>
	</section>
</template>
