<template>
  <div class="answer-section animate-in animate-in-delay-3">
    <div class="answer-card" :class="{ focused: isFocused }">
      <div class="answer-label">
        <span class="answer-label-icon">✏️</span>
        Ваш ответ
      </div>
      <textarea
        class="answer-textarea"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        placeholder="Напишите ваш детальный ответ здесь..."
        @focus="isFocused = true"
        @blur="isFocused = false"
      ></textarea>
      <div class="answer-footer">
        <span
          class="char-count"
          :class="{
            warning: modelValue.length > 2000,
            danger: modelValue.length > 3000
          }"
        >
          {{ modelValue.length }} символов
        </span>
      </div>
    </div>
  </div>

  <div class="actions animate-in animate-in-delay-4">
    <button
      class="btn btn-primary"
      @click="$emit('submit')"
      :disabled="!modelValue.trim()"
    >
      <span class="btn-icon">✨</span>
      Проверить ответ
    </button>
    <button
      v-if="showSkip"
      class="btn btn-ghost"
      @click="$emit('skip')"
    >
      Пропустить
      <span class="btn-icon">→</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  showSkip: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
  submit: []
  skip: []
}>()

const isFocused = ref(false)
</script>

<style scoped>
.answer-section {
  margin-bottom: 24px;
}

.answer-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 2px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.answer-card.focused {
  border-color: var(--accent);
  box-shadow: var(--shadow-glow);
}

.answer-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px 0;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.answer-label-icon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.answer-textarea {
  width: 100%;
  min-height: 160px;
  padding: 14px 20px 20px;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-primary);
  resize: vertical;
}

.answer-textarea::placeholder { color: #B8B5AE; }

.answer-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 14px;
}

.char-count {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
  transition: color var(--transition);
}

.char-count.warning { color: var(--warning); }
.char-count.danger { color: var(--danger); }

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), #4F46E5);
  color: white;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.4);
}

.btn-primary:active { transform: translateY(0); }

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.btn-ghost:hover {
  color: var(--text-primary);
  border-color: var(--text-secondary);
  background: rgba(0, 0, 0, 0.02);
}

.btn-icon {
  font-size: 1.1rem;
  display: flex;
  transition: transform 0.3s;
}

.btn-ghost:hover .btn-icon { transform: translateX(3px); }

@media (max-width: 640px) {
  .actions { flex-direction: column-reverse; }
  .btn { width: 100%; justify-content: center; }
}
</style>
