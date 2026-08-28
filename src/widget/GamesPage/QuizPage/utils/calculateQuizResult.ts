import { Quiz, QuizResult } from '@/types/quiz.types';

/**
 * 선택한 보기들의 가중치를 합산해 결과를 고른다.
 *
 * - 동점이면 quiz.results 에 먼저 선언된 결과가 이긴다 (결정적).
 * - 존재하지 않는 결과를 가리키는 점수 키는 조용히 무시한다.
 */
export function calculateQuizResult(quiz: Quiz, answers: (string | null)[]): QuizResult {
  const totals = new Map<string, number>(quiz.results.map(result => [result.id, 0]));

  quiz.questions.forEach((question, index) => {
    const choice = question.choices.find(item => item.id === answers[index]);
    if (!choice) return;

    Object.entries(choice.scores).forEach(([resultId, weight]) => {
      const current = totals.get(resultId);
      if (current === undefined) return;
      totals.set(resultId, current + weight);
    });
  });

  return quiz.results.reduce(
    (best, result) => ((totals.get(result.id) ?? 0) > (totals.get(best.id) ?? 0) ? result : best),
    quiz.results[0]
  );
}
