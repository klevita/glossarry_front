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
  const onSuccess = ref<(() => void) | null>(null);

  function openModal(glossaryItem = makeEmptyGlossaryItem(), successCallback?: () => void) {
    data.value = glossaryItem;
    onSuccess.value = successCallback || null;
    isOpened.value = true;
  }

  function closeModal() {
    isOpened.value = false;
  }

  function triggerSuccess() {
    if (onSuccess.value) {
      onSuccess.value();
    }
  }

  watch(
    () => isOpened.value,
    (opened) => {
      if (!opened) {
        data.value = makeEmptyGlossaryItem();
        onSuccess.value = null;
      }
    },
  );

  return {
    openModal,
    closeModal,
    triggerSuccess,
    isOpened,
    data,
  };
});
