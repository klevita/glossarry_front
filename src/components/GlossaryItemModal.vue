<template>
  <q-dialog v-model="store.isOpened">
    <q-card>
      <q-card-section>
        <div class="text-h6">Создание элемента глоссария (TBD)</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="store.data.name" label="Наименование" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="store.data.description" filled label="Описание" type="textarea" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :disabled="!(store.data.name && store.data.description)"
          color="primary"
          flat
          label="Создать"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useGlossaryItemModalStore } from 'stores/glossary-item-modal';

const store = useGlossaryItemModalStore();

// function createGlossaryItem() {
//   store.isOpened = false;
//   await createGlossaryItem()
// }
</script>
