<template>
  <div class="viewed-products">
    <div class="viewed-products__header">
      <h2>Просмотренные товары</h2>
      <div class="viewed-products__header-nav">
        <icon-circled-button
          color="secondary"
          class="viewed-products__header-nav-prev"
        >
          <img src="@/assets/img/icons/arrow.svg" alt="arrow" />
        </icon-circled-button>
        <div class="viewed-products__header-nav-index">
          <div class="viewed-products__header-nav-index_active">
            {{ sliderActiveIndex }}
          </div>
          <div>/ {{ sliderMaxLength }}</div>
        </div>
        <icon-circled-button
          color="secondary"
          class="viewed-products__header-nav-next"
        >
          <img src="@/assets/img/icons/arrow.svg" alt="arrow" />
        </icon-circled-button>
      </div>
    </div>
    <div class="viewed-products__content">
      <swiper
        :modules="[Navigation]"
        :slides-per-view="SLIDERS_PER_VIEW"
        :space-between="20"
        :navigation="{
          prevEl: '.viewed-products__header-nav-prev',
          nextEl: '.viewed-products__header-nav-next',
        }"
        class="viewed-products__content-slider"
        @slide-change="changeSliderIndex"
      >
        <swiper-slide
          v-for="product in products"
          :key="`slider-product-${product.id}`"
          class="viewed-products__content-slide"
        >
          <product-card
            :product="product"
            class="viewed-products__content-slide-card"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";

import IconCircledButton from "@/components/buttons/IconCircledButton.vue";
import ProductCard from "@/components/cards/ProductCard.vue";

const store = useStore();

const products = computed(() => store.getters["products/getProducts"]);

const SLIDERS_PER_VIEW = 4;
const sliderMaxLength = computed(
  () => products.value.length - (SLIDERS_PER_VIEW - 1)
);

const sliderActiveIndex = ref<number>(1);

const changeSliderIndex = (swiper: any) => {
  sliderActiveIndex.value = swiper.activeIndex + 1;
};
</script>

<style lang="scss" scoped>
.viewed-products {
  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &-nav {
      display: flex;
      align-items: center;
      column-gap: 20px;

      &-prev {
        transform: rotate(180deg);
      }

      &-index {
        display: flex;
        align-items: center;
        column-gap: 5px;
        font-size: 16px;
        line-height: 1;
        color: var(--text-secondary-color);

        &_active {
          font-size: 22px;
          color: var(--text-color);
        }
      }
    }
  }
  .viewed-products__content {
    margin-top: 45px;

    .viewed-products__content-slide-card {
      min-height: 500px;
    }
  }
}
</style>
