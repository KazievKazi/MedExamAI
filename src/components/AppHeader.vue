<template>
  <header class="header">
    <div class="header-left">
      <div class="logo-icon">🩺</div>
      <h1 class="logo-title">Med<span>Exam</span> AI</h1>
    </div>
    <div class="header-badge">AI-Проверка</div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  animation: fadeInUp 0.6s ease-out both;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: var(--bg-task);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: var(--shadow-md);
}

.logo-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.logo-title span {
  background: linear-gradient(135deg, var(--accent), #7C3AED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--accent-soft);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0.02em;
}

.header-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@media (max-width: 640px) {
  .header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
