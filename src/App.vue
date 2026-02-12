<template>
  <div class="app-container">
    <AppHeader />

    <!-- Completion Screen -->
    <CompletionScreen
      v-if="allCompleted"
      :total-tasks="totalTasks"
      :avg-score="avgScore"
      @restart="restartQuiz"
    />

    <template v-else>
      <!-- Progress -->
      <ProgressBar
        :current="currentIndex"
        :total="totalTasks"
        :completed-indexes="completedIndexes"
        :has-result="state === 'result'"
      />

      <!-- Task Card -->
      <TaskCard
        :task="currentTask"
        :transition-class="taskTransition"
      />

      <!-- Answer Form -->
      <AnswerForm
        v-if="state === 'answering'"
        v-model="userAnswer"
        :show-skip="currentIndex < totalTasks - 1"
        @submit="submitAnswer"
        @skip="nextTask"
      />

      <!-- Loading -->
      <LoadingState v-if="state === 'loading'" />

      <!-- Result -->
      <ResultCard
        v-if="state === 'result' && currentResult"
        :result="currentResult"
        :category="currentTask.category"
        :is-last="currentIndex >= totalTasks - 1"
        @next="nextTask"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AIResponse, QuizState } from '@/types'
import { MOCK_TASKS, MOCK_AI_RESPONSES } from '@/data/mock'
import AppHeader from '@/components/AppHeader.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import AnswerForm from '@/components/AnswerForm.vue'
import LoadingState from '@/components/LoadingState.vue'
import ResultCard from '@/components/ResultCard.vue'
import CompletionScreen from '@/components/CompletionScreen.vue'

const currentIndex = ref(0)
const userAnswer = ref('')
const state = ref<QuizState>('answering')
const taskTransition = ref('')
const currentResult = ref<AIResponse | null>(null)
const results = ref<(AIResponse | null)[]>([])
const allCompleted = ref(false)

const currentTask = computed(() => MOCK_TASKS[currentIndex.value])
const totalTasks = computed(() => MOCK_TASKS.length)

const completedIndexes = computed(() =>
  results.value
    .map((r, i) => (r ? i : -1))
    .filter(i => i >= 0)
)

const avgScore = computed(() => {
  const filled = results.value.filter((r): r is AIResponse => r !== null)
  if (!filled.length) return 0
  return Math.round(filled.reduce((sum, r) => sum + r.score, 0) / filled.length)
})

async function submitAnswer() {
  if (!userAnswer.value.trim()) return
  state.value = 'loading'

  // TODO: Replace with real API call
  // const response = await fetch('/api/check', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     taskId: currentTask.value.id,
  //     answer: userAnswer.value
  //   })
  // })
  // const data: AIResponse = await response.json()

  // Simulate AI processing
  await new Promise(r => setTimeout(r, 2500 + Math.random() * 1500))
  const data = MOCK_AI_RESPONSES[currentIndex.value]

  currentResult.value = data
  results.value[currentIndex.value] = data
  state.value = 'result'
}

async function nextTask() {
  if (currentIndex.value >= totalTasks.value - 1) {
    allCompleted.value = true
    return
  }

  taskTransition.value = 'task-leaving'
  await new Promise(r => setTimeout(r, 300))

  currentIndex.value++
  userAnswer.value = ''
  currentResult.value = null
  state.value = 'answering'
  taskTransition.value = 'task-entering'

  await new Promise(r => setTimeout(r, 500))
  taskTransition.value = ''
}

function restartQuiz() {
  currentIndex.value = 0
  userAnswer.value = ''
  currentResult.value = null
  results.value = []
  state.value = 'answering'
  allCompleted.value = false
  taskTransition.value = 'task-entering'
  setTimeout(() => (taskTransition.value = ''), 500)
}

onMounted(() => {
  taskTransition.value = 'task-entering'
  setTimeout(() => (taskTransition.value = ''), 500)
})
</script>

<style scoped>
.app-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

@media (max-width: 640px) {
  .app-container { padding: 24px 16px 60px; }
}
</style>
