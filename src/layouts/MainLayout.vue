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
      <q-separator />
      <q-list>
        <q-item-label header>Действия</q-item-label>

        <q-item v-for="action in actionsList" :key="action.title" clickable @click="action.action">
          <q-item-section avatar>
            <q-icon :name="action.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ action.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
    <glossary-item-modal />
    <glossary-link-modal />
    <glossary-item-delete-modal />
    <glossary-link-delete-modal />
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useGlossaryItemModalStore } from 'stores/glossary-item-modal';
import { useGlossaryLinkModalStore } from 'stores/glossary-link-modal';
import { useGlossaryItemDeleteModalStore } from 'stores/glossary-item-delete-modal';
import { useGlossaryLinkDeleteModalStore } from 'stores/glossary-link-delete-modal';
import GlossaryItemModal from 'components/GlossaryItemModal.vue';
import GlossaryLinkModal from 'components/GlossaryLinkModal.vue';
import GlossaryItemDeleteModal from 'components/GlossaryItemDeleteModal.vue';
import GlossaryLinkDeleteModal from 'components/GlossaryLinkDeleteModal.vue';

const glossaryItemModalStore = useGlossaryItemModalStore();
const glossaryLinkModalStore = useGlossaryLinkModalStore();
const glossaryItemDeleteModalStore = useGlossaryItemDeleteModalStore();
const glossaryLinkDeleteModalStore = useGlossaryLinkDeleteModalStore();

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

const actionsList = [
  {
    title: 'Создать элемент',
    icon: 'post_add',
    action: () => glossaryItemModalStore.openModal(),
  },
  {
    title: 'Создать связь',
    icon: 'add_link',
    action: () => glossaryLinkModalStore.openModal(),
  },
  {
    title: 'Удалить элемент',
    icon: 'delete',
    action: () => glossaryItemDeleteModalStore.openModal(),
  },
  {
    title: 'Удалить связь',
    icon: 'link_off',
    action: () => glossaryLinkDeleteModalStore.openModal(),
  },
];

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
