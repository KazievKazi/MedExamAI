<template>
  <div class="completion-card">
    <div class="completion-emoji">🎉</div>
    <h2 class="completion-title">Все задачи выполнены!</h2>
    <p class="completion-subtitle">Вот ваши результаты за эту сессию</p>
    <div class="completion-stats">
      <div class="completion-stat">
        <div class="completion-stat-value">{{ totalTasks }}</div>
        <div class="completion-stat-label">Задач решено</div>
      </div>
      <div class="completion-stat">
        <div class="completion-stat-value">{{ avgScore }}/5</div>
        <div class="completion-stat-label">Средний балл</div>
      </div>
    </div>
    <button class="btn btn-primary" @click="$emit('restart')">
      <span class="btn-icon">🔄</span>
      Начать заново
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalTasks: number
  avgScore: number
}>()

defineEmits<{
  restart: []
}>()
</script>

<style scoped>
.completion-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 2px solid var(--border);
  box-shadow: var(--shadow-lg);
  padding: 48px 32px;
  text-align: center;
  animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

.completion-emoji {
  font-size: 56px;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.completion-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  margin-bottom: 8px;
}

.completion-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.completion-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 32px;
}

.completion-stat { text-align: center; }

.completion-stat-value {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
}

.completion-stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 4px;
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

.btn-icon { font-size: 1.1rem; display: flex; }

@media (max-width: 640px) {
  .completion-stats { gap: 20px; }
}
</style>
