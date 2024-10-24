<template>
  <div class="select">
    <div
      v-outside="closeSelect"
      @click="toogleSelect"
      class="input select__input"
    >
      {{ getActiveItem }}
      <div class="select__arrow">
        <img
          class="select__arrow-img"
          :class="{ 'select__arrow-img-rotated': isOpen }"
          src="@/assets/imgs/arrow.svg"
          alt="Arrow"
        />
      </div>
    </div>
    <div v-show="isOpen" class="select__dropdown">
      <div @click="changeActiveItem(null)" class="input">-</div>
      <div
        v-for="option in options"
        :key="option.id || '-'"
        @click="changeActiveItem(option.id)"
        class="input"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TypeSelect, IOption, SortBy, FilterBy } from "~/types/types";
const materialStore = useMaterialStore();
const props = defineProps<{
  type: TypeSelect;
  options: IOption[];
}>();
const emit = defineEmits<{
  (e: "select", value: SortBy | FilterBy, type: TypeSelect): void;
}>();

const isOpen = ref(false);

const getActiveItem = computed(() => {
  if (props.type === "filter") {
    return (
      props.options.find(
        (option: IOption) => option.id === materialStore.filterBy
      )?.name || "-"
    );
  } else {
    return (
      props.options.find(
        (option: IOption) => option.id === materialStore.sortBy
      )?.name || "-"
    );
  }
});

function toogleSelect(): void {
  isOpen.value = !isOpen.value;
}
function closeSelect(): void {
  isOpen.value = false;
}
function changeActiveItem(value: SortBy | FilterBy): void {
  emit("select", value, props.type);
}
</script>

<style scoped>
@import url("./index.scss");
</style>
