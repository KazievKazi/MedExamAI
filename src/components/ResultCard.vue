<template>
  <div class="result-section">
    <div class="result-card" :class="scoreClass">
      <div class="result-header">
        <!-- Score Ring -->
        <div class="score-ring-container">
          <svg viewBox="0 0 100 100" width="100" height="100">
            <circle class="score-ring-bg" cx="50" cy="50" r="45" />
            <circle
              class="score-ring-fill"
              cx="50"
              cy="50"
              r="45"
              stroke-dasharray="283"
              :stroke-dashoffset="dashOffset"
            />
          </svg>
          <div class="score-value">
            <span class="score-number">{{ displayedScore }}</span>
            <span class="score-label-small">{{ scoreWord }}</span>
          </div>
        </div>

        <!-- Verdict -->
        <div class="result-meta">
          <h3 class="result-verdict">{{ verdict }}</h3>
          <p class="result-verdict-subtitle">
            AI-оценка вашего ответа по задаче
          </p>
        </div>
      </div>

      <!-- AI Feedback -->
      <div class="result-body">
        <div class="result-section-title">
          <span class="result-section-icon">💬</span>
          Подробный анализ от AI
        </div>
        <div class="ai-feedback">
          <span style="white-space: pre-wrap;">{{ displayedFeedback }}</span>
          <span v-if="isTyping" class="typewriter-cursor"></span>
        </div>
      </div>
    </div>

    <!-- Next Button -->
    <div class="actions">
      <button class="btn btn-primary" @click="$emit('next')">
        <template v-if="!isLast">
          Следующий вопрос
          <span class="btn-icon">→</span>
        </template>
        <template v-else>
          Завершить
          <span class="btn-icon">🏁</span>
        </template>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { AIResponse } from '@/types'
import { useCountUp } from '@/composables/useCountUp'
import { useTypewriter } from '@/composables/useTypewriter'

const props = defineProps<{
  result: AIResponse
  category: string
  isLast: boolean
}>()

defineEmits<{
  next: []
}>()

const { current: displayedScore, animateTo } = useCountUp()
const { displayedText: displayedFeedback, isTyping, start: startTypewriter } = useTypewriter()

const scoreWord = computed(() => {
  const n = displayedScore.value
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'баллов'
  if (mod10 === 1) return 'балл'
  if (mod10 >= 2 && mod10 <= 4) return 'балла'
  return 'баллов'
})

const scoreClass = computed(() => {
  const s = props.result.score
  if (s >= 85) return 'score-excellent'
  if (s >= 70) return 'score-good'
  if (s >= 50) return 'score-average'
  return 'score-low'
})

const verdict = computed(() => {
  const s = props.result.score
  if (s >= 85) return 'Отличный результат!'
  if (s >= 70) return 'Хороший ответ'
  if (s >= 50) return 'Можно лучше'
  return 'Требует доработки'
})

const dashOffset = computed(() => {
  return 283 - (283 * props.result.score / 100)
})

onMounted(() => {
  animateTo(props.result.score)
  startTypewriter(props.result.explanation)
})
</script>

<style scoped>
.result-section {
  animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

.result-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 2px solid var(--border);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 32px;
  border-bottom: 1px solid var(--border);
}

/* Score Ring */
.score-ring-container {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.score-ring-bg {
  fill: none;
  stroke: var(--border);
  stroke-width: 6;
}

.score-ring-fill {
  fill: none;
  stroke-width: 6;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.score-value {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-number {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
}

.score-label-small {
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 2px;
}

/* Score colors */
.score-excellent .score-number { color: var(--success); }
.score-excellent .score-ring-fill { stroke: var(--success); }
.score-good .score-number { color: var(--accent); }
.score-good .score-ring-fill { stroke: var(--accent); }
.score-average .score-number { color: var(--warning); }
.score-average .score-ring-fill { stroke: var(--warning); }
.score-low .score-number { color: var(--danger); }
.score-low .score-ring-fill { stroke: var(--danger); }

.result-meta { flex: 1; }

.result-verdict {
  font-family: var(--font-display);
  font-size: 1.4rem;
  margin-bottom: 6px;
}

.result-verdict-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* AI Feedback */
.result-body { padding: 28px 32px 32px; }

.result-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
}

.result-section-icon {
  width: 18px;
  height: 18px;
  background: var(--accent-soft);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.ai-feedback {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--accent);
  vertical-align: text-bottom;
  margin-left: 2px;
  animation: pulse 0.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Actions */
.actions {
  margin-top: 24px;
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

.btn-icon {
  font-size: 1.1rem;
  display: flex;
  transition: transform 0.3s;
}

.btn-primary:hover .btn-icon { transform: translateX(3px); }

@media (max-width: 640px) {
  .result-header {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
  .result-body { padding: 20px 24px 28px; }
  .btn { width: 100%; justify-content: center; }
}
</style>
