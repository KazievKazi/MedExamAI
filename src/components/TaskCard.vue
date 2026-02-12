<template>
  <div class="task-card-wrapper">
    <div class="task-card" :class="transitionClass">
      <div class="task-badge">
        <span class="task-badge-icon">📋</span>
        <!-- {{ task.category }} -->
        Задача
      </div>
      <div class="task-text">{{ task.question_text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types'

defineProps<{
  task: Task
  transitionClass: string
}>()
</script>

<style scoped>
.task-card-wrapper {
  position: relative;
  margin-bottom: 28px;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.task-card {
  background: var(--bg-task);
  border-radius: var(--radius);
  padding: 32px;
  color: var(--text-on-dark);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  min-height: 220px;
}

.task-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), #7C3AED, var(--accent));
  background-size: 200% 100%;
  animation: gradientShift 3s ease-in-out infinite;
}

.task-card::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.task-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
}

.task-badge-icon {
  width: 14px;
  height: 14px;
  background: var(--accent);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
}

.task-text {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.88);
  max-height: 260px;
  overflow-y: auto;
  padding-right: 8px;
  position: relative;
  z-index: 1;
}

.task-text::-webkit-scrollbar { width: 4px; }
.task-text::-webkit-scrollbar-track { background: transparent; }
.task-text::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 100px;
}

/* Transitions */
.task-card.task-entering {
  animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.task-card.task-leaving {
  animation: slideOutLeft 0.3s ease-in both;
}

@media (max-width: 640px) {
  .task-card { padding: 24px 20px; }
}
</style>
