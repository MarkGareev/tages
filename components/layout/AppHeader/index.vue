<template>
  <header class="header">
    <nav class="header__breadcrumbs">
      <ul class="header__breadcrumbs-list">
        <li
          v-for="({ link, text }, index) in breadcrumbs"
          :key="link"
          class="header__breadcrumbs-item"
          :class="{
            'header__breadcrumbs-item--active':
              index === breadcrumbs.length - 1,
          }"
        >
          <!-- Вместо span если бы это не было заглушкой 
          <nuxt-link :to="link" class="header__breadcrumbs-link"> -->
          <span class="header__breadcrumbs-link">
            {{ text }}
          </span>
          <span class="header__breadcrumbs-slash">
            {{
              index === breadcrumbs.length - 1
                ? ""
                : "&nbsp&nbsp&nbsp/&nbsp&nbsp&nbsp"
            }}
          </span>
        </li>
      </ul>
    </nav>
    <h1 class="header__title">
      {{ getPageTitle }}
    </h1>
  </header>
</template>

<script setup lang="ts">
const breadcrumbs = [
  {
    link: "/",
    text: "Главная",
  },
  {
    link: "/storage",
    text: "Системы хранения",
  },
  {
    link: "/storage/rack",
    text: "Комплекты стеллажных систем",
  },
];
const getPageTitle = computed(() => breadcrumbs[breadcrumbs.length - 1].text);
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
