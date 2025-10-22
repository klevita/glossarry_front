<template>
  <q-item clickable tag="a" target="_blank" @click="redirect">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  caption: string;
  icon: string;
  routeName?: string;
  action?: () => void
}

const props = defineProps<EssentialLinkProps>();

const router = useRouter()

function redirect(){
  if(props.routeName){
    void router.replace({name: props.routeName});
  }
  if(props.action){
    props.action()
  }
}
</script>
