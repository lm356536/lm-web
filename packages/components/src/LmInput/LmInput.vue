<script setup lang="ts">
  import { ref } from 'vue';
  import { Input } from 'ant-design-vue';
  import type { LmInputProps, LmInputEmits, LmInputInstance } from './LmInput';

  // 定义props
  const props = withDefaults(defineProps<LmInputProps>(), {
    placeholder: '',
    disabled: false,
    readonly: false,
    maxlength: undefined,
    size: 'middle',
    type: 'text',
  });

  // 定义emits
  const emit = defineEmits<LmInputEmits>();

  // 组件引用
  const inputRef = ref<HTMLElement | null>(null);

  // 处理输入变化
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
    emit('input', event);
  };

  // 处理焦点事件
  const handleFocus = (event: FocusEvent) => {
    emit('focus', event);
  };

  // 处理失焦事件
  const handleBlur = (event: FocusEvent) => {
    emit('blur', event);
  };

  // 聚焦方法
  const focus = () => {
    if (inputRef.value && !props.disabled && !props.readonly) {
      // 直接调用DOM元素的focus方法
      inputRef.value.focus();
    }
  };

  // 失焦方法
  const blur = () => {
    if (inputRef.value) {
      // 直接调用DOM元素的blur方法
      inputRef.value.blur();
    }
  };

  // 清空内容
  const clear = () => {
    if (!props.disabled && !props.readonly) {
      // 直接更新值并触发事件
      emit('update:modelValue', '');
    }
  };

  // 暴露方法给父组件
  defineExpose<LmInputInstance>({
    inputRef,
    focus,
    blur,
    clear,
  });
</script>

<template>
  <Input
    ref="inputRef"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :size="size"
    :type="type"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    v-bind="$attrs"
  />
</template>

<style scoped>
  /* 可以保留一些自定义样式，但大部分样式会由 Ant Design Vue 提供 */
  /* 如需覆盖 Ant Design Vue 的样式，可以在此添加 */
  :deep(.ant-input) {
    /* 自定义样式示例 */
    border-radius: var(--lm-input-border-radius, 4px);
  }
</style>
