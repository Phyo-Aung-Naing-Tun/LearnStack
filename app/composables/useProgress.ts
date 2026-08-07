// Composable for tracking tutorial progress via localStorage
export function useProgress() {
  const completedDays = ref<Record<string, boolean>>({})

  // Load from localStorage on client side
  if (import.meta.client) {
    const stored = localStorage.getItem('tutorial-progress')
    if (stored) {
      try {
        completedDays.value = JSON.parse(stored)
      } catch {
        completedDays.value = {}
      }
    }
  }

  function isCompleted(series: string, day: number): boolean {
    return !!completedDays.value[`${series}-day-${day}`]
  }

  function markCompleted(series: string, day: number) {
    completedDays.value[`${series}-day-${day}`] = true
    if (import.meta.client) {
      localStorage.setItem('tutorial-progress', JSON.stringify(completedDays.value))
    }
  }

  function getSeriesProgress(series: string, totalDays: number): number {
    let completed = 0
    for (let d = 1; d <= totalDays; d++) {
      if (isCompleted(series, d)) completed++
    }
    return totalDays > 0 ? Math.round((completed / totalDays) * 100) : 0
  }

  return { completedDays, isCompleted, markCompleted, getSeriesProgress }
}
