import { ref } from 'vue'

export function useCountUp() {
  const current = ref(0)

  function animateTo(target: number, duration = 1500) {
    current.value = 0
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      current.value = Math.round(target * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }

  return { current, animateTo }
}
