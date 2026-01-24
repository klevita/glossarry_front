<template>
  <q-dialog v-model="store.isOpened">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Создание связи</div>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="store.data.source"
          :options="glossaryOptions"
          emit-value
          label="Источник"
          map-options
          option-label="name"
          option-value="id"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          v-model="store.data.target"
          :options="glossaryOptions"
          emit-value
          label="Цель"
          map-options
          option-label="name"
          option-value="id"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="store.data.name" label="Тип связи" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" @click="store.closeModal()" />
        <q-btn
          :disabled="!isFormValid"
          :loading="isLoading"
          color="primary"
          flat
          label="Создать"
          @click="handleCreate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useGlossaryLinkModalStore } from 'stores/glossary-link-modal';
import { createLink } from 'src/api/services/links-service';
import { getGlossary } from 'src/api/services/glossary-service';
import type { GlossaryItem, GlossaryLink } from 'src/api/data-contracts/glossary-contracts';

const store = useGlossaryLinkModalStore();
const isLoading = ref(false);
const glossaryOptions = ref<GlossaryItem[]>([]);

const isFormValid = computed(() => {
  return (
    store.data.source !== undefined &&
    store.data.target !== undefined &&
    store.data.name
  );
});

watch(
  () => store.isOpened,
  async (opened) => {
    if (opened) {
      try {
        glossaryOptions.value = (await getGlossary()).data;
      } catch (error) {
        console.error('Failed to fetch glossary items:', error);
      }
    }
  },
);

async function handleCreate() {
  if (!isFormValid.value) return;

  isLoading.value = true;
  try {
    await createLink(store.data as GlossaryLink);
    store.triggerSuccess();
    store.closeModal();
  } catch (error) {
    console.error('Failed to create link:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>
