<script setup lang="ts">
  import { ref } from 'vue';
  import type { LmInputProps, LmInputEmits, LmInputInstance } from './LmInput';

  // 定义props
  const props = withDefaults(defineProps<LmInputProps>(), {
    placeholder: '',
    disabled: false,
    readonly: false,
    maxlength: undefined,
    size: 'medium',
    type: 'text',
  });

  // 定义emits
  const emit = defineEmits<LmInputEmits>();

  // DOM引用
  const inputRef = ref<HTMLInputElement | null>(null);

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
      inputRef.value.focus();
    }
  };

  // 失焦方法
  const blur = () => {
    if (inputRef.value) {
      inputRef.value.blur();
    }
  };

  // 清空内容
  const clear = () => {
    if (inputRef.value && !props.disabled && !props.readonly) {
      inputRef.value.value = '';
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
  <div class="lm-input">
    <input
      ref="inputRef"
      class="lm-input__inner"
      :class="[
        {
          'lm-input__inner--disabled': disabled,
          'lm-input__inner--readonly': readonly,
          'lm-input__inner--small': size === 'small',
          'lm-input__inner--large': size === 'large',
        },
      ]"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :type="type"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<style scoped>
  :root {
    --lm-input-bg-color: #fff;
    --lm-input-border-color: #d9d9d9;
    --lm-input-border-color-focus: #40a9ff;
    --lm-input-border-color-hover: #40a9ff;
    --lm-input-text-color: #333;
    --lm-input-text-color-disabled: #bfbfbf;
    --lm-input-bg-color-disabled: #f5f5f5;
    --lm-input-padding: 6px 12px;
    --lm-input-font-size: 14px;
    --lm-input-line-height: 1.5;
    --lm-input-height: 32px;
    --lm-input-height-small: 24px;
    --lm-input-height-large: 40px;
    --lm-input-border-radius: 4px;
  }

  .lm-input {
    display: inline-block;
    position: relative;
  }

  .lm-input__inner {
    width: 100%;
    min-width: 0;
    padding: var(--lm-input-padding);
    font-size: var(--lm-input-font-size);
    line-height: var(--lm-input-line-height);
    color: var(--lm-input-text-color);
    background-color: var(--lm-input-bg-color);
    border: 1px solid var(--lm-input-border-color);
    border-radius: var(--lm-input-border-radius);
    transition: all 0.3s;
    box-sizing: border-box;
    outline: none;
  }

  .lm-input__inner:hover:not(:disabled):not(:readonly) {
    border-color: var(--lm-input-border-color-hover);
  }

  .lm-input__inner:focus:not(:disabled):not(:readonly) {
    border-color: var(--lm-input-border-color-focus);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  .lm-input__inner--disabled {
    color: var(--lm-input-text-color-disabled);
    background-color: var(--lm-input-bg-color-disabled);
    cursor: not-allowed;
  }

  .lm-input__inner--readonly {
    background-color: var(--lm-input-bg-color-disabled);
    cursor: not-allowed;
  }

  .lm-input__inner--small {
    height: var(--lm-input-height-small);
    padding: 2px 8px;
    font-size: 12px;
  }

  .lm-input__inner--large {
    height: var(--lm-input-height-large);
    padding: 8px 16px;
    font-size: 16px;
  }
</style>
