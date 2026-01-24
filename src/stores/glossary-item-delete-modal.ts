import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useGlossaryItemDeleteModalStore = defineStore('glossary-item-delete-modal', () => {
  const isOpened = ref(false);
  const selectedItemId = ref<number | null>(null);
  const onSuccess = ref<(() => void) | null>(null);

  function openModal(successCallback?: () => void) {
    selectedItemId.value = null;
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
        selectedItemId.value = null;
        onSuccess.value = null;
      }
    },
  );

  return {
    openModal,
    closeModal,
    triggerSuccess,
    isOpened,
    selectedItemId,
  };
});
