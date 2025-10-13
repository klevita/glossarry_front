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
import { onMounted, ref } from 'vue';
import type { GlossaryItem } from 'src/api/data-contracts/glossary-contracts';

const glossary = ref<GlossaryItem[]>()

async function fetchGlossary(){
  glossary.value = (await getGlossary()).data
}

onMounted(fetchGlossary)
</script>
<style scoped lang="scss">
.glossary-card{
  width: 240px;
  height: 200px;
}
</style>
