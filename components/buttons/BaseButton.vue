<template>
  <button
    :class="[
      'base-button',
      `base-button_${color}`,
      { 'base-button_is-full': isFull, 'base-button_is-bordered': isBordered },
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonColors } from "@/types/colors";

interface Props {
  color?: buttonColors;
  isBordered?: boolean;
  isFull?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: "primary",
  isBordered: false,
  isFull: false,
});
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 40px;
  height: 52px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin: 0;

  &_is-full {
    width: 100%;
  }

  @mixin btn-filled {
    &.base-button_primary {
      background-color: var(--primary-color);
      border: none;
      color: var(--primary-text-color);
    }
  }

  @mixin btn-bordered {
    &.base-button_primary {
      background-color: var(--background-color);
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
  }

  &_is-bordered {
    @include btn-bordered;

    &:hover {
      @include btn-filled;
    }
  }

  &:not(&_is-bordered) {
    @include btn-filled;

    &:hover {
      @include btn-bordered;
    }
  }
}
</style>
