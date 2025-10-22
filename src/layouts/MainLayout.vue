<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn aria-label="Menu" dense flat icon="menu" round @click="toggleLeftDrawer" />

        <q-toolbar-title> ITMO | Glossary app | Klementyev Vitaliy</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above>
      <q-list>
        <q-item-label header>Навигация</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <!--      <q-separator />-->
      <!--      <q-list>-->
      <!--        <q-item-label header>Действия</q-item-label>-->

      <!--        <EssentialLink v-for="action in actionsList" :key="action.title" v-bind="action" />-->
      <!--      </q-list>-->
    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
    <glossary-item-modal />
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
// import { useGlossaryItemModalStore } from 'stores/glossary-item-modal';
// import { useGlossaryLinkModalStore } from 'stores/glossary-link-modal';
import GlossaryItemModal from 'components/GlossaryItemModal.vue';

// const { openModal: openGlossaryItemModal } = useGlossaryItemModalStore();
// const { openModal: openGlossaryLinkModal } = useGlossaryLinkModalStore();

const linksList: EssentialLinkProps[] = [
  {
    title: 'Глоссарий',
    caption: '',
    icon: 'abc',
    routeName: 'Glossary',
  },
  {
    title: 'Граф',
    caption: '',
    icon: 'timeline',
    routeName: 'Graph',
  },
];

// const actionsList = [
//   {
//     title: 'Создать элемент',
//     caption: '',
//     icon: 'post_add',
//     action: openGlossaryItemModal,
//   },
//   {
//     title: 'Создать отношение',
//     caption: '',
//     icon: 'add_link',
//     action: openGlossaryLinkModal,
//   },
// ];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style lang="scss" scoped>
.page-container {
  & > * {
    align-items: start;
    padding: 24px 16px;
  }
}
</style>
