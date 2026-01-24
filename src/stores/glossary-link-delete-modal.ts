import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useGlossaryLinkDeleteModalStore = defineStore('glossary-link-delete-modal', () => {
  const isOpened = ref(false);
  const selectedLinkId = ref<number | null>(null);
  const onSuccess = ref<(() => void) | null>(null);

  function openModal(successCallback?: () => void) {
    selectedLinkId.value = null;
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
        selectedLinkId.value = null;
        onSuccess.value = null;
      }
    },
  );

  return {
    openModal,
    closeModal,
    triggerSuccess,
    isOpened,
    selectedLinkId,
  };
});
