<template>
  <q-page class="row items-center justify-center q-gutter-md">
    <q-card v-for="{id, name, description} in glossary" :key="id" class="glossary-card">
      <q-card-section>
        <div class="text-h7"><strong>{{ name }}</strong></div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        {{ description }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { getGlossary } from 'src/api/services/glossary-service';
import { onMounted, ref, watch } from 'vue';
import type { GlossaryItem } from 'src/api/data-contracts/glossary-contracts';
import { useGlossaryItemModalStore } from 'stores/glossary-item-modal';
import { useGlossaryItemDeleteModalStore } from 'stores/glossary-item-delete-modal';

const glossaryItemModalStore = useGlossaryItemModalStore();
const glossaryItemDeleteModalStore = useGlossaryItemDeleteModalStore();
const glossary = ref<GlossaryItem[]>()

async function fetchGlossary(){
  glossary.value = (await getGlossary()).data
}

watch(
  () => glossaryItemModalStore.isOpened,
  (opened) => {
    if (!opened) {
      void fetchGlossary();
    }
  },
);

watch(
  () => glossaryItemDeleteModalStore.isOpened,
  (opened) => {
    if (!opened) {
      void fetchGlossary();
    }
  },
);

onMounted(fetchGlossary)
</script>
<style scoped lang="scss">
.glossary-card{
  width: 240px;
  height: 200px;
}
</style>
