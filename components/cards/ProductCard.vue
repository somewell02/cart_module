<template>
  <div class="product-card filled-div">
    <div class="product-card__info">
      <div v-if="product.thumbnail" class="product-card__image">
        <img :src="product.thumbnail" :alt="product.title" />
      </div>
      <div class="product-card__title">
        <h3>{{ product.title }}</h3>
      </div>
      <div v-if="product.description" class="product-card__description">
        {{ product.description }}
      </div>
    </div>
    <div class="product-card__price">
      <div class="product-card__price_rub">
        {{ productDisplayPriceRub(product.price) }}
      </div>
      <div class="product-card__price_eur">
        {{ productDisplayPriceEur(product.price) }}
      </div>
    </div>
    <base-button class="product-card__more-btn"> Подробнее </base-button>
  </div>
</template>

<script setup lang="ts">
import { Product } from "@/types/product";
import BaseButton from "@/components/buttons/BaseButton.vue";

import {
  productDisplayPriceRub,
  productDisplayPriceEur,
} from "@/services/price";

interface Props {
  product: Product;
}

withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 20px;
  max-width: 350px;

  &__info {
    flex-grow: 3;
  }

  &__image img {
    width: 100%;
    height: 245px;
    object-fit: contain;
  }

  &__title {
    margin-top: 5px;
  }

  &__description {
    margin-top: 10px;
    color: var(--text-color);
    font-size: 14px;
    line-height: 1.45;
  }

  &__price {
    &_rub {
      font-size: 22px;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: 0.005em;
      color: var(--text-color);
    }

    &_eur {
      margin-top: 3px;
      font-size: 16px;
      line-height: 1.45;
      color: var(--text-secondary-color);
    }
  }
}
</style>
