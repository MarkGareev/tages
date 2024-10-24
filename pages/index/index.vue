<template>
  <CommonFilters />
  <div v-if="isProductsExist" class="products-container">
    <CommonProductCard
      v-for="product in productStore.getProducts"
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :code="product.code"
      :price="product.price"
      :image="product.image"
      :material="product.material"
      :isFavorite="product.isFavorite"
      :isInCart="product.isInCart"
    >
    </CommonProductCard>
  </div>
  <div v-else class="products-empty">Товаров нет</div>
</template>

<script setup lang="ts">
const materialStore = useMaterialStore();
const productStore = useProductStore();

const isProductsExist = computed<boolean>(
  () => !!productStore.getProducts.length
);

await productStore.fetchProducts();
await materialStore.fetchMaterials();

onBeforeMount(() => {
  productStore.updateProductsStatus();
});
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
