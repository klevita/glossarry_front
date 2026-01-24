<template>
  <q-dialog v-model="store.isOpened">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Создание элемента глоссария</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="store.data.name" label="Наименование" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="store.data.description" filled label="Описание" type="textarea" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" @click="store.closeModal()" />
        <q-btn
          :disabled="!(store.data.name && store.data.description)"
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
import { ref } from 'vue';
import { useGlossaryItemModalStore } from 'stores/glossary-item-modal';
import { createGlossaryItem } from 'src/api/services/glossary-service';
import type { GlossaryItem } from 'src/api/data-contracts/glossary-contracts';

const store = useGlossaryItemModalStore();
const isLoading = ref(false);

async function handleCreate() {
  if (!store.data.name || !store.data.description) return;

  isLoading.value = true;
  try {
    await createGlossaryItem(store.data as GlossaryItem);
    store.triggerSuccess();
    store.closeModal();
  } catch (error) {
    console.error('Failed to create glossary item:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>
