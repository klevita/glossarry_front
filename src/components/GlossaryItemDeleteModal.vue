<template>
  <q-dialog v-model="store.isOpened">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Удаление элемента глоссария</div>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="store.selectedItemId"
          :options="glossaryOptions"
          emit-value
          label="Выберите элемент для удаления"
          map-options
          option-label="name"
          option-value="id"
        >
          <template #option="{ opt, itemProps }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label>{{ opt.name }}</q-item-label>
                <q-item-label caption>{{ opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-section v-if="selectedItem" class="q-pt-none">
        <q-banner class="bg-warning text-white">
          Вы уверены, что хотите удалить элемент "{{ selectedItem.name }}"?
          Все связи с этим элементом также будут удалены.
        </q-banner>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" @click="store.closeModal()" />
        <q-btn
          :disabled="!store.selectedItemId"
          :loading="isLoading"
          color="negative"
          flat
          label="Удалить"
          @click="handleDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useGlossaryItemDeleteModalStore } from 'stores/glossary-item-delete-modal';
import { getGlossary, deleteGlossaryItem } from 'src/api/services/glossary-service';
import type { GlossaryItem } from 'src/api/data-contracts/glossary-contracts';

const store = useGlossaryItemDeleteModalStore();
const isLoading = ref(false);
const glossaryOptions = ref<GlossaryItem[]>([]);

const selectedItem = computed(() =>
  glossaryOptions.value.find((item) => item.id === store.selectedItemId)
);

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

async function handleDelete() {
  if (!store.selectedItemId) return;

  isLoading.value = true;
  try {
    await deleteGlossaryItem(store.selectedItemId);
    store.triggerSuccess();
    store.closeModal();
  } catch (error) {
    console.error('Failed to delete glossary item:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>
