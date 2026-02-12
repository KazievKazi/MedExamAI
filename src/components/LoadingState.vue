<template>
  <div class="loading-overlay">
    <div class="loading-card">
      <div class="loading-brain">
        <span class="loading-brain-icon">🧠</span>
        <div class="loading-ring"></div>
        <div class="loading-ring"></div>
      </div>
      <h3 class="loading-title">AI анализирует ваш ответ</h3>
      <p class="loading-subtitle">Оценка точности, полноты и глубины знаний</p>
      <div class="loading-dots">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
      <div class="skeleton-lines">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.loading-overlay {
  animation: fadeIn 0.3s ease-out both;
}

.loading-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 2px solid var(--border);
  padding: 40px 32px;
  text-align: center;
  box-shadow: var(--shadow-md);
  animation: borderGlow 2s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% { border-color: var(--border); }
  50% { border-color: var(--accent); box-shadow: var(--shadow-glow); }
}

.loading-brain {
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
  position: relative;
  animation: float 2.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.loading-brain-icon {
  font-size: 40px;
  filter: grayscale(0.2);
}

.loading-ring {
  position: absolute;
  inset: -6px;
  border: 2px solid transparent;
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

.loading-ring:nth-child(3) {
  inset: -12px;
  border-top-color: #7C3AED;
  animation-duration: 1.8s;
  animation-direction: reverse;
  opacity: 0.5;
}

@keyframes spin { to { transform: rotate(360deg); } }

.loading-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.loading-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite;
}

.loading-dot:nth-child(2) { animation-delay: 0.16s; }
.loading-dot:nth-child(3) { animation-delay: 0.32s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
}

.skeleton-lines {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--border) 25%, rgba(37, 99, 235, 0.06) 50%, var(--border) 75%);
  background-size: 400% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}

.skeleton-line:nth-child(1) { width: 90%; }
.skeleton-line:nth-child(2) { width: 75%; }
.skeleton-line:nth-child(3) { width: 82%; }
.skeleton-line:nth-child(4) { width: 60%; }

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
