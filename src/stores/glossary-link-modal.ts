import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GlossaryLink } from 'src/api/data-contracts/glossary-contracts';

const makeEmptyGlossaryLink = ():Partial<GlossaryLink> => ({
  name: ''
})

export const useGlossaryLinkModalStore = defineStore('glossary-link-modal', () => {
  const isOpened = ref(false)
  const data = ref<Partial<GlossaryLink>>()

  function openModal(glossaryLink = makeEmptyGlossaryLink()){
    data.value = glossaryLink;
    isOpened.value = true
  }

  return {
    openModal,
    isOpened,
    data
  };
});
