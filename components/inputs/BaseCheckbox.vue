<template>
  <button class="base-checkbox" @click="toggleCheckbox">
    <img
      v-if="modelValue"
      class="base-checkbox__img"
      src="@/assets/img/icons/check.svg"
      alt="check-icon"
    />
  </button>
</template>

<script setup lang="ts">
export interface propsInterface {
  modelValue: boolean;
}

const props = withDefaults(defineProps<propsInterface>(), {});

const emits = defineEmits(["update:modelValue"]);

const toggleCheckbox = () => {
  emits("update:modelValue", !props.modelValue);
};
</script>

<style lang="scss" scoped>
.base-checkbox {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--text-secondary-color);
  border-radius: 2px;
  box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  width: 20px;
  height: 20px;
  padding: 3px;

  &__img {
    width: 100%;
    height: 100%;
  }
}
</style>
