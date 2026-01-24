<template>
  <q-dialog v-model="store.isOpened">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Удаление связи</div>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="store.selectedLinkId"
          :options="linkOptions"
          emit-value
          label="Выберите связь для удаления"
          map-options
          option-label="label"
          option-value="id"
        >
          <template #option="{ opt, itemProps }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label>{{ opt.label }}</q-item-label>
                <q-item-label caption>{{ opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-section v-if="selectedLink" class="q-pt-none">
        <q-banner class="bg-warning text-white">
          Вы уверены, что хотите удалить связь "{{ selectedLink.label }}"?
        </q-banner>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" @click="store.closeModal()" />
        <q-btn
          :disabled="!store.selectedLinkId"
          :loading="isLoading"
          color="negative"
          flat
          label="Удалить"
          @click="handleDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useGlossaryLinkDeleteModalStore } from 'stores/glossary-link-delete-modal';
import { getGlossary } from 'src/api/services/glossary-service';
import { getLinks, deleteLink } from 'src/api/services/links-service';
import type { GlossaryItem, GlossaryLink } from 'src/api/data-contracts/glossary-contracts';

interface LinkOption {
  id: number;
  label: string;
  name: string;
}

const store = useGlossaryLinkDeleteModalStore();
const isLoading = ref(false);
const linkOptions = ref<LinkOption[]>([]);

const selectedLink = computed(() =>
  linkOptions.value.find((link) => link.id === store.selectedLinkId)
);

watch(
  () => store.isOpened,
  async (opened) => {
    if (opened) {
      try {
        const [glossaryRes, linksRes] = await Promise.all([getGlossary(), getLinks()]);
        const glossary = glossaryRes.data;
        const links = linksRes.data;

        const glossaryMap = new Map<number, GlossaryItem>();
        glossary.forEach((item) => glossaryMap.set(item.id, item));

        linkOptions.value = links.map((link: GlossaryLink) => ({
          id: link.id,
          label: `${glossaryMap.get(link.source)?.name || link.source} -> ${glossaryMap.get(link.target)?.name || link.target}`,
          name: link.name,
        }));
      } catch (error) {
        console.error('Failed to fetch links:', error);
      }
    }
  },
);

async function handleDelete() {
  if (!store.selectedLinkId) return;

  isLoading.value = true;
  try {
    await deleteLink(store.selectedLinkId);
    store.triggerSuccess();
    store.closeModal();
  } catch (error) {
    console.error('Failed to delete link:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>
