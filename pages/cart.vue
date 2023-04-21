<template>
  <div class="cart-wrapper">
    <div class="cart-header cart-columns-grid">
      <div class="cart-header__main">
        <div class="cart-header__main-title">
          <h1>Ваша корзина</h1>
          <div class="cart-header__main-quantity">
            {{ cartItemsQuantity }}
          </div>
        </div>
        <div class="cart-header__main-clear">
          <button class="cart-header__main-clear-btn" @click="clearCart">
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
    <div class="cart-content cart-columns-grid">
      <div class="cart-content__items">
        <div class="cart-content__list">
          <cart-product-card
            v-for="item in store.state.cart.items"
            :key="`cart-item-${item.productId}`"
            :cart-item="item"
            class="cart-content__list-item"
            @increment="incCartItem(item.productId)"
            @decrement="decCartItem(item.productId)"
            @delete="deleteCartItem(item.productId)"
          />
        </div>
        <div class="cart-content__installation filled-div">
          <base-checkbox v-model="installation" />
          <div class="cart-content__installation-icon">
            <img src="@/assets/img/icons/installation.svg" alt="installation" />
          </div>
          <div class="cart-content__installation-info">
            <h4>Установка</h4>
            <div class="cart-content__installation-info-desc">
              Отметьте, если Вам необходима консультация профессионала по
              монтажу выбранных товаров.
            </div>
          </div>
        </div>
      </div>
      <div class="cart-content__form filled-div">
        <h3>Итого</h3>
        <div class="cart-content__form-options">
          <div class="cart-content__form-options-item">
            <div>Сумма заказа</div>
            <div>{{ cartItemsTotalPrice }}</div>
          </div>
          <div class="cart-content__form-options-item">
            <div>Количество</div>
            <div>{{ cartItemsQuantityShort }}</div>
          </div>
          <div class="cart-content__form-options-item">
            <div>Установка</div>
            <div>{{ installationDisplay }}</div>
          </div>
          <hr class="cart-content__form-divider" />
          <div
            class="cart-content__form-options-item cart-content__form-options-total"
          >
            <div>Стоимость товаров</div>
            <div class="cart-content__form-options-total-price">
              {{ cartItemsTotalPrice }}
            </div>
          </div>
        </div>
        <div class="cart-content__form-actions">
          <base-button is-full @click="createOrder">Оформить заказ</base-button>
          <base-button is-full is-bordered @click="createOrder"
            >Купить в 1 клик</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { watch } from "vue";
import { productDisplayPriceRub } from "@/services/price";

import CartProductCard from "@/components/cards/CartProductCard.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseCheckbox from "@/components/inputs/BaseCheckbox.vue";

definePageMeta({
  layout: "product",
});

const store = useStore();

const installation = ref<boolean>(store.getters["cart/getInstallation"]);
watch(installation, () => store.commit("cart/setInstallation", installation));

const cartItemsQuantity = computed(
  () => store.getters["cart/getItemsDisplayQuantityLong"]
);

const cartItemsQuantityShort = computed(
  () => store.getters["cart/getItemsDisplayQuantityShort"]
);

const installationDisplay = computed(
  () => store.getters["cart/getInstallationDisplay"]
);

const cartItemsTotalPrice = computed(() =>
  productDisplayPriceRub(store.getters["cart/getTotalPrice"])
);

const incCartItem = (productId: string) => {
  store.commit("cart/incItemQuantity", productId);
};

const decCartItem = (productId: string) => {
  store.commit("cart/decItemQuantity", productId);
};

const deleteCartItem = (productId: string) => {
  store.commit("cart/deleteItem", productId);
};

const clearCart = () => {
  store.commit("cart/clearCart");
};

const createOrder = () => {
  store.dispatch("cart/createOrder");
};
</script>

<style lang="scss" scoped>
.cart-columns-grid {
  display: grid;
  grid-template-columns: 1fr 425px;
  column-gap: 55px;
  align-items: flex-start;
}

.cart-header__main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &-title {
    display: flex;
    align-items: flex-end;
    column-gap: 22px;
  }

  &-quantity {
    font-size: 18px;
    line-height: 1.45;
    color: var(--text-secondary-color);
    margin-bottom: 3px;
  }

  &-clear-btn {
    cursor: pointer;
    background: none;
    border-radius: 0;
    border: 0;
    font-size: 14px;
    line-height: 1.5;
    text-decoration: underline;
    text-underline-offset: 5px;
    color: var(--text-secondary-color);
  }
}

.cart-content {
  margin-top: 35px;

  &__list {
    display: flex;
    flex-direction: column;

    &-item {
      &:not(:first-child) {
        border-top: 1px solid var(--border-color);
      }
    }
  }

  &__installation {
    padding: 25px;
    margin-top: 25px;
    display: flex;
    align-items: center;
    column-gap: 20px;

    &-icon {
      background: #ffffff;
      border-radius: 4px;
      padding: 10px;

      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      row-gap: 2px;

      &-desc {
        font-size: 14px;
        color: var(--text-secondary-color);
      }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    padding: 35px 30px;

    &-options {
      display: flex;
      flex-direction: column;
      row-gap: 18px;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        line-height: 1.45;
      }

      &-total {
        font-size: 18px;

        &-price {
          font-size: 26px;
          line-height: 1.3;
          font-weight: 700;
        }
      }
    }

    &-divider {
      width: 100%;
      border-color: var(--border-color);
    }

    &-actions {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
    }
  }
}
</style>
