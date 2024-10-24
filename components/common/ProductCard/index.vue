<template>
  <div class="product">
    <div class="product__sale" v-if="price.old_price">Скидка</div>
    <div class="product__image">
      <img class="product-image-img" :src="image.url" :alt="name" />
    </div>
    <div class="product__info">
      <p v-if="code" class="product__info-code">{{ code }}</p>
      <h6 class="product__info-name">{{ name }}</h6>
      <div class="product__info-prices">
        <p class="price price--old" v-if="price.old_price">
          {{ convertPrice(price.old_price) }}₽
        </p>
        <p class="price">{{ convertPrice(price.current_price) }}₽</p>
      </div>
    </div>
    <div class="product__actions">
      <client-only>
        <div class="product__actions-cart">
          <img
            class="product__actions-img"
            @click="addToCart(id)"
            v-if="!isInCart"
            src="@/assets/imgs/cart.svg"
            alt="Добавить в корзину"
          />
          <img
            class="product__actions-img"
            @click="removeFromCart(id)"
            v-else
            src="@/assets/imgs/added.svg"
            alt="Добавить в корзину"
          />
        </div>
        <div class="product__actions-favorite">
          <img
            class="product__actions-img"
            @click="addToFavorite(id)"
            v-if="!isFavorite"
            src="@/assets/imgs/like.svg"
            alt="Добавить в избранное"
          />
          <img
            class="product__actions-img"
            @click="removeFromFavorite(id)"
            v-else
            src="@/assets/imgs/liked.svg"
            alt="Добавить в избранное"
          />
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types/types";
import { convertPrice } from "~/utils/convertPrice";
import {
  addToLocalStorage,
  removeFromLocalStorage,
} from "~/utils/handleLocalStorage";

const props = defineProps<IProduct>();
const isFavorite = ref(props.isFavorite);
const isInCart = ref(props.isInCart);

function addToCart(productId: string): void {
  addToLocalStorage("inCart", productId);
  isInCart.value = true;
}
function removeFromCart(productId: string): void {
  removeFromLocalStorage("inCart", productId);
  isInCart.value = false;
}
function addToFavorite(productId: string): void {
  addToLocalStorage("favorite", productId);
  isFavorite.value = true;
}
function removeFromFavorite(productId: string): void {
  removeFromLocalStorage("favorite", productId);
  isFavorite.value = false;
}
</script>
<style scoped>
@import url("./index.scss");
</style>
