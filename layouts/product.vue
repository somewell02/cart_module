<template>
  <div class="product-layout-wrapper container">
    <base-header />

    <main class="product-layout-content">
      <slot />
    </main>

    <viewed-products class="product-layout__viewed-products" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import BaseHeader from "@/components/structure/BaseHeader.vue";
import ViewedProducts from "@/components/structure/products/ViewedProducts.vue";

const store = useStore();

store.dispatch("products/initProducts");
</script>

<style lang="scss" scoped>
.product-layout-wrapper {
  padding: 45px 0;

  .product-layout__viewed-products {
    margin-top: 96px;
  }
}
</style>
