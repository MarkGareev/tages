<template>
  <div class="filters">
    <div v-for="filter in filters" :key="filter.title" class="filters__item">
      <div class="filters__item-title filter-title">{{ filter.title }}</div>
      <UiAppSelect
        @select="handleSelect"
        :options="filter.options"
        :type="filter.type"
        class="filters__item-select"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilterBy, SortBy, TypeSelect, IFilters } from "~/types/types";

const materialStore = useMaterialStore();
const filters: IFilters[] = [
  {
    title: "Сортировать по:",
    type: "sort",
    options: [
      {
        id: "asc",
        name: "Возрастанию",
      },
      {
        id: "desc",
        name: "По убыванию",
      },
    ],
  },
  {
    title: "Материал:",
    type: "filter",
    options: materialStore.materials,
  },
];
function handleSelect(value: SortBy | FilterBy, type: TypeSelect): void {
  if (type === "sort") {
    materialStore.setSorting(value as SortBy);
  } else {
    materialStore.setFilter(value as FilterBy);
  }
}
</script>

<style scoped lang="scss">
@import url("./index.scss");
</style>
