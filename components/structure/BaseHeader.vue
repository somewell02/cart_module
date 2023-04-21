<template>
  <header class="base-header">
    <div class="base-header__cart">
      <img
        src="@/assets/img/icons/cart.svg"
        alt="cart"
        class="base-header__cart-icon"
      />
      <div class="base-header__cart-info">
        <div class="base-header__cart-info-title">Ваша корзина</div>
        <div class="base-header__cart-info-quantity">
          {{ cartItemsQuantity }}
        </div>
        <div class="base-header__cart-info-price">
          {{ cartItemsTotalPrice }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { productDisplayPriceRub } from "@/services/price";

const store = useStore();

const cartItemsQuantity = computed(
  () => store.getters["cart/getItemsDisplayQuantityLong"]
);

const cartItemsTotalPrice = computed(() =>
  productDisplayPriceRub(store.getters["cart/getTotalPrice"])
);
</script>

<style lang="scss" scoped>
.base-header {
  display: flex;
  justify-content: flex-end;
  padding: 25px 0;

  &__cart {
    display: flex;
    align-items: center;
    gap: 10px;

    &-icon {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    &-info {
      display: flex;
      flex-direction: column;

      &-title {
        font-size: 14px;
      }

      &-quantity {
        font-size: 12px;
        line-height: 1.5;
        color: var(--text-secondary-color);
      }

      &-price {
        font-size: 12px;
      }
    }
  }
}
</style>
