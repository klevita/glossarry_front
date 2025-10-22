<template>
  <q-page class="fit column">
    <graph-chart :data="glossary" :links />
  </q-page>
</template>

<script setup lang="ts">
import { getGlossary } from 'src/api/services/glossary-service';
import { onMounted, ref } from 'vue';
import type { GlossaryItem, GlossaryLink } from 'src/api/data-contracts/glossary-contracts';
import GraphChart from 'components/GraphChart.vue';
import { getLinks } from 'src/api/services/links-service';

const glossary = ref<GlossaryItem[]>([])
const links = ref<GlossaryLink[]>([])

async function fetchGlossary(){
  const promises = [getGlossary(), getLinks()];
  const responses = (await Promise.all(promises)).map(({data}) => data) as [GlossaryItem[], GlossaryLink[]];
  console.log(responses)
  glossary.value = responses[0]
  links.value = responses[1]
}

onMounted(fetchGlossary)
</script>
