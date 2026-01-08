<script setup lang="ts">
import AddButton from './AddButton.vue';
import DownButton from './DownButton.vue';
import InputBase from './InputBase.vue';
import RemoveButton from './RemoveButton.vue';
import UpButton from './UpButton.vue';
import type { Section } from '../../../types/types';

defineProps<{
	addExperience: () => void;
	model: { techStack: string[]; experience: { company: string; role: { es: string; en: string; }; duration: { es: string; en: string; }; description: { es: string; en: string; }; }[]; coreExpertise: { title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; experienceTimeline: { year: { es: string; en: string; }; role: { es: string; en: string; }; company: string; description: { es: string; en: string; }; }[]; coreValues: { icon: string; title: { es: string; en: string; }; desc: { es: string; en: string; }; }[]; faqItems: { q: { es: string; en: string; }; a: { es: string; en: string; }; }[]; socialLinks: { github: string; linkedin: string; email: string; }; };
	cardBase: "relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between font-poppins";
	moveItem: <T>(arr: T[] | undefined, from: number, to: number) => T[] | undefined;
	removeAt: <T>(arr: T[], idx: number) => T[];
	labelClass: "mb-2 block text-sm font-medium text-foreground";
	inputClass: string;
	getFieldError: (prefix: string) => string | null;
}>()
const section = defineModel<Section>('section', { required: true })
</script>

<template>
	<section v-if="section === 'experience'" class="space-y-6 m-5">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-semibold">Experience</h2>
			<AddButton @click="addExperience"></AddButton>
		</div>

		<div v-for="(item, idx) in model.experience" :key="idx" :class="[cardBase]">
			<div class="card-body p-4 space-y-3">
				<div class="flex items-center justify-between gap-2">
					<p class="font-semibold">
						{{ item.company || `Experiencia #${idx + 1}` }}
					</p>
					<div class="flex gap-2">
						<UpButton
							@click="model.experience = moveItem(model.experience, idx, idx - 1) ?? model.experience">
						</UpButton>

						<DownButton
							@click="model.experience = moveItem(model.experience, idx, idx + 1) ?? model.experience">
						</DownButton>

						<RemoveButton @click="model.experience = removeAt(model.experience, idx)"></RemoveButton>
					</div>
				</div>

				<label class="form-control">
					<InputBase v-model="item.company" name="company" label="Company" placeholder="Company"
						:labelClass="labelClass" :inputClass="inputClass" />

					<span v-if="getFieldError(`experience.${idx}.company`)" class="text-xs text-warning mt-1">
						{{ getFieldError(`experience.${idx}.company`) }}
					</span>
				</label>

				<!-- role -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">

					<InputBase v-model="item.role.es" name="role-es" label="Role (ES)" placeholder="Rol en Español"
						:labelClass="labelClass" :inputClass="inputClass" />

					<InputBase v-model="item.role.en" name="role-en" label="Role (EN)" placeholder="Role in English"
						:labelClass="labelClass" :inputClass="inputClass" />
				</div>
				<p v-if="getFieldError(`experience.${idx}.role`)" class="text-xs text-warning">
					{{ getFieldError(`experience.${idx}.role`) }}
				</p>

				<!-- duration -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.duration.es" name="duration-es" label="Duration (ES)"
						placeholder="Ej. Jun 2024 - Actualidad" :labelClass="labelClass" :inputClass="inputClass" />

					<InputBase v-model="item.duration.en" name="duration-en" label="Duration (EN)"
						placeholder="e.g. Jun 2024 - Present" :labelClass="labelClass" :inputClass="inputClass" />
				</div>

				<!-- description -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<InputBase v-model="item.description.es" name="description-es" label="Description (ES)" textarea
						:rows="6" placeholder="Descripción del puesto" :labelClass="labelClass"
						:inputClass="inputClass" />

					<InputBase v-model="item.description.en" name="description-en" label="Description (EN)" textarea
						:rows="6" placeholder="Role description" :labelClass="labelClass" :inputClass="inputClass" />
				</div>
			</div>
		</div>
	</section>
</template>
