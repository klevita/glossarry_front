import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { GlossaryItem } from 'src/api/data-contracts/glossary-contracts';

const makeEmptyGlossaryItem = (): Omit<GlossaryItem, 'id'> & { id?: number } => ({
  description: '',
  name: '',
});

export const useGlossaryItemModalStore = defineStore('glossary-item-modal', () => {
  const isOpened = ref(false);
  const data = ref<Partial<GlossaryItem>>(makeEmptyGlossaryItem());

  function openModal(glossaryItem = makeEmptyGlossaryItem()) {
    data.value = glossaryItem;
    isOpened.value = true;
  }

  watch(
    () => isOpened.value,
    () => {
      data.value = makeEmptyGlossaryItem();
    },
  );

  return {
    openModal,
    isOpened,
    data,
  };
});
