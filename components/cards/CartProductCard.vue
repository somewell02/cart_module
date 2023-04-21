<template>
  <div class="cart-product-card">
    <template v-if="product">
      <div v-if="product.imgUrl" class="cart-product-card__image">
        <img :src="product.imgUrl" :alt="product.title" />
      </div>
      <div class="cart-product-card__info">
        <div class="cart-product-card__title">
          <h4>{{ product.title }}</h4>
        </div>
        <div
          v-if="product.specifications"
          class="cart-product-card__specifications"
        >
          {{ product.specifications }}
        </div>
        <div class="cart-product-card__article">
          {{ `Артикул: ${product.id}` }}
        </div>
      </div>
      <div class="cart-product-card__quantity">
        <div class="cart-product-card__quantity-actions">
          <button
            class="cart-product-card__quantity-item cart-product-card__quantity-minus"
            @click="emits('decrement')"
          >
            <img src="@/assets/img/icons/minus.svg" alt="minus" />
          </button>
          <div class="cart-product-card__quantity-item">
            {{ cartItem.quantity }}
          </div>
          <button
            class="cart-product-card__quantity-item cart-product-card__quantity-plus"
            @click="emits('increment')"
          >
            <img src="@/assets/img/icons/plus.svg" alt="plus" />
          </button>
        </div>
        <div
          v-if="cartItem.quantity > 1"
          class="cart-product-card__quantity-price-per-one"
        >
          {{ productDisplayPriceRubPerOne(product.price) }}
        </div>
      </div>
      <div class="cart-product-card__price">
        {{ productDisplayPriceRub(product.price, cartItem.quantity) }}
      </div>
      <button class="cart-product-card__delete-btn" @click="emits('delete')">
        <img src="@/assets/img/icons/delete.svg" alt="delete" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { CartItem } from "@/types/cart";

import {
  productDisplayPriceRub,
  productDisplayPriceRubPerOne,
} from "@/services/price";

interface Props {
  cartItem: CartItem;
}

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits(["increment", "decrement", "delete"]);

const store = useStore();

const product = computed(() => {
  const product = store.getters["products/getProductById"](
    props.cartItem.productId
  );
  return product ?? undefined;
});
</script>

<style lang="scss" scoped>
.cart-product-card {
  display: grid;
  grid-template-columns: 100px 5fr 3fr 3fr;
  align-items: center;
  padding: 20px 15px;
  gap: 30px;
  position: relative;

  .cart-product-card__image img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  .cart-product-card__info {
    display: flex;
    flex-direction: column;
    gap: 7px;

    .cart-product-card__title {
      margin-top: 5px;
    }

    .cart-product-card__specifications {
      font-size: 12px;
      line-height: 1.5;
      color: var(--text-color);
    }

    .cart-product-card__article {
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-secondary-color);
    }
  }

  .cart-product-card__quantity {
    position: relative;

    .cart-product-card__quantity-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2px;

      .cart-product-card__quantity-item {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--background-secondary-color);
        border: 0;
        width: 34px;
        height: 34px;
        padding: 0;
        color: var(--text-color);
        font-size: 14px;
      }

      .cart-product-card__quantity-minus {
        cursor: pointer;
        border-radius: 4px 0 0 4px;
      }

      .cart-product-card__quantity-plus {
        cursor: pointer;
        border-radius: 0 4px 4px 0;
      }
    }

    .cart-product-card__quantity-price-per-one {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: 1.45;
    }
  }

  .cart-product-card__price {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.45;
    text-align: center;
    color: var(--text-color);
  }

  .cart-product-card__delete-btn {
    position: absolute;
    right: 5px;
    top: 25px;
    background: none;
    border-radius: 0;
    display: flex;
    border: 0;
    padding: 0;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
