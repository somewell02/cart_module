<template>
  <button :class="['icon-circled-button', `icon-circled-button_${color}`]">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonColors } from "@/types/colors";

interface Props {
  color?: buttonColors;
}

withDefaults(defineProps<Props>(), {
  color: "primary",
});
</script>

<style lang="scss" scoped>
.icon-circled-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding: 16px;
  min-width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 0;
  border: none;

  &_primary {
    background-color: var(--primary-color);
    color: var(--primary-text-color);
  }

  &_secondary {
    background-color: var(--secondary-color);
    color: var(--primary-text-color);
  }

  :deep(img) {
    width: 100%;
    height: 100%;
  }
}
</style>
