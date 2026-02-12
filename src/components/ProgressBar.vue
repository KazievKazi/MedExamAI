<template>
  <div class="progress-section">
    <div class="progress-info">
      <span class="progress-label">Прогресс</span>
      <span class="progress-count">{{ current + 1 }} / {{ total }}</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: fillPercent + '%' }"></div>
    </div>
    <div class="progress-steps">
      <div
        v-for="idx in total"
        :key="idx"
        class="progress-step"
        :class="getStepStatus(idx - 1)"
      >
        <span class="step-dot">
          <template v-if="getStepStatus(idx - 1) === 'completed'">✓</template>
          <template v-else>{{ idx }}</template>
        </span>
        Задача {{ idx }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  total: number
  completedIndexes: number[]
  hasResult: boolean
}>()

const fillPercent = computed(() => {
  const done = props.hasResult ? props.current + 1 : props.current
  return (done / props.total) * 100
})

function getStepStatus(idx: number): string {
  if (props.completedIndexes.includes(idx)) return 'completed'
  if (idx === props.current) return 'active'
  return ''
}
</script>

<style scoped>
.progress-section {
  margin-bottom: 32px;
  animation: fadeInUp 0.6s ease-out 0.1s both;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.progress-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.progress-count {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
}

.progress-track {
  height: 6px;
  background: var(--border);
  border-radius: 100px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #7C3AED);
  border-radius: 100px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: -2px;
  width: 10px;
  height: 10px;
  background: white;
  border: 2px solid var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.3);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  transition: var(--transition);
}

.progress-step.completed { color: var(--success); }
.progress-step.active { color: var(--accent); font-weight: 600; }

.step-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  font-size: 10px;
}

.progress-step.completed .step-dot {
  background: var(--success);
  border-color: var(--success);
  color: white;
}

.progress-step.active .step-dot {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

@media (max-width: 640px) {
  .progress-steps { display: none; }
}
</style>
