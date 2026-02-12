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

      <!-- Task Card (shown only when task is loaded) -->
      <TaskCard
        v-if="currentTask"
        :task="currentTask"
        :transition-class="taskTransition"
      />

      <!-- Answer Form -->
      <AnswerForm
        v-if="state === 'answering' && currentTask"
        v-model="userAnswer"
        :show-skip="currentIndex < totalTasks - 1"
        @submit="submitAnswer"
        @skip="nextTask"
      />

      <!-- Loading -->
      <LoadingState v-if="state === 'loading'" />

      <!-- Result -->
      <ResultCard
        v-if="state === 'result' && currentResult && currentTask"
        :result="currentResult"
        :category="''"
        :is-last="currentIndex >= totalTasks - 1"
        @next="nextTask"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Task, AIResponse, QuizState } from '@/types'
import AppHeader from '@/components/AppHeader.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import AnswerForm from '@/components/AnswerForm.vue'
import LoadingState from '@/components/LoadingState.vue'
import ResultCard from '@/components/ResultCard.vue'
import CompletionScreen from '@/components/CompletionScreen.vue'

const TOTAL_TASKS = 5

const currentIndex = ref(0)
const userAnswer = ref('')
const state = ref<QuizState>('loading')
const taskTransition = ref('')
const currentTask = ref<Task | null>(null)
const currentResult = ref<AIResponse | null>(null)
const results = ref<(AIResponse | null)[]>([])
const allCompleted = ref(false)

const totalTasks = TOTAL_TASKS

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

async function loadQuestion(lastId?: number, silent = false) {
  if (!silent) state.value = 'loading'
  const url = lastId !== undefined
    ? `/quiz/get-question?last_id=${lastId}`
    : '/quiz/get-question'
  const res = await fetch(url)
  const data: Task = await res.json()
  currentTask.value = data
  state.value = 'answering'
}

async function submitAnswer() {
  if (!userAnswer.value.trim() || !currentTask.value) return
  state.value = 'loading'

  const res = await fetch('/quiz/check-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question_id: currentTask.value.question_id,
      user_text: userAnswer.value
    })
  })
  const data: AIResponse = await res.json()

  currentResult.value = data
  results.value[currentIndex.value] = data
  state.value = 'result'
}

async function nextTask() {
  if (currentIndex.value >= totalTasks - 1) {
    allCompleted.value = true
    return
  }

  taskTransition.value = 'task-leaving'
  await new Promise(r => setTimeout(r, 300))

  const lastId = currentTask.value?.question_id
  currentIndex.value++
  userAnswer.value = ''
  currentResult.value = null
  currentTask.value = null
  taskTransition.value = 'task-entering'

  await loadQuestion(lastId, true)

  await new Promise(r => setTimeout(r, 500))
  taskTransition.value = ''
}

async function restartQuiz() {
  currentIndex.value = 0
  userAnswer.value = ''
  currentResult.value = null
  currentTask.value = null
  results.value = []
  allCompleted.value = false
  await loadQuestion()
  taskTransition.value = 'task-entering'
  setTimeout(() => (taskTransition.value = ''), 500)
}

onMounted(() => {
  loadQuestion()
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
