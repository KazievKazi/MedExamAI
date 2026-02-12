import { ref } from 'vue'

export function useTypewriter() {
  const displayedText = ref('')
  const isTyping = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  function start(text: string, speed = 12, delay = 800) {
    stop()
    displayedText.value = ''
    isTyping.value = true
    let i = 0

    timer = setTimeout(function type() {
      if (i < text.length) {
        displayedText.value += text[i]
        i++
        timer = setTimeout(type, speed)
      } else {
        isTyping.value = false
      }
    }, delay)
  }

  function stop() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isTyping.value = false
  }

  return { displayedText, isTyping, start, stop }
}
