<template>
  <q-page class="fit column">
    <graph-chart :data="glossary" :links />
  </q-page>
</template>

<script setup lang="ts">
import { getGlossary } from 'src/api/services/glossary-service';
import { onMounted, ref, watch } from 'vue';
import type { GlossaryItem, GlossaryLink } from 'src/api/data-contracts/glossary-contracts';
import GraphChart from 'components/GraphChart.vue';
import { getLinks } from 'src/api/services/links-service';
import { useGlossaryItemModalStore } from 'stores/glossary-item-modal';
import { useGlossaryLinkModalStore } from 'stores/glossary-link-modal';
import { useGlossaryItemDeleteModalStore } from 'stores/glossary-item-delete-modal';
import { useGlossaryLinkDeleteModalStore } from 'stores/glossary-link-delete-modal';

const glossaryItemModalStore = useGlossaryItemModalStore();
const glossaryLinkModalStore = useGlossaryLinkModalStore();
const glossaryItemDeleteModalStore = useGlossaryItemDeleteModalStore();
const glossaryLinkDeleteModalStore = useGlossaryLinkDeleteModalStore();

const glossary = ref<GlossaryItem[]>([])
const links = ref<GlossaryLink[]>([])

async function fetchData(){
  const promises = [getGlossary(), getLinks()];
  const responses = (await Promise.all(promises)).map(({data}) => data) as [GlossaryItem[], GlossaryLink[]];
  glossary.value = responses[0]
  links.value = responses[1]
}

watch(
  () => glossaryItemModalStore.isOpened,
  (opened) => {
    if (!opened) {
      void fetchData();
    }
  },
);

watch(
  () => glossaryLinkModalStore.isOpened,
  (opened) => {
    if (!opened) {
      void fetchData();
    }
  },
);

watch(
  () => glossaryItemDeleteModalStore.isOpened,
  (opened) => {
    if (!opened) {
      void fetchData();
    }
  },
);

watch(
  () => glossaryLinkDeleteModalStore.isOpened,
  (opened) => {
    if (!opened) {
      void fetchData();
    }
  },
);

onMounted(fetchData)
</script>
