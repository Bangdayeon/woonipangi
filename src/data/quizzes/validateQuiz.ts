import { Quiz } from '@/types/quiz.types';

/**
 * 손으로 작성한 퀴즈 데이터의 흔한 실수를 잡는다.
 * 개발 환경에서만 호출하며, 문제 목록을 문자열 배열로 돌려준다.
 */
export function validateQuiz(quiz: Quiz): string[] {
  const problems: string[] = [];
  const resultIds = new Set(quiz.results.map(result => result.id));
  const scoredResultIds = new Set<string>();

  if (quiz.results.length === 0) problems.push(`[${quiz.id}] 결과가 하나도 없습니다.`);

  quiz.questions.forEach(question => {
    if (question.choices.length < 2) {
      problems.push(`[${quiz.id}/${question.id}] 선택지가 2개 미만입니다.`);
    }

    question.choices.forEach(choice => {
      Object.entries(choice.scores).forEach(([resultId, weight]) => {
        if (!resultIds.has(resultId)) {
          problems.push(
            `[${quiz.id}/${question.id}/${choice.id}] 존재하지 않는 결과 '${resultId}'에 점수를 줍니다.`
          );
          return;
        }
        if (weight > 0) scoredResultIds.add(resultId);
      });
    });
  });

  quiz.results.forEach(result => {
    if (!scoredResultIds.has(result.id)) {
      problems.push(`[${quiz.id}] 결과 '${result.id}'는 어떤 선택지로도 점수를 받을 수 없습니다.`);
    }
    if (result.matchId && !resultIds.has(result.matchId)) {
      problems.push(`[${quiz.id}/${result.id}] matchId '${result.matchId}'가 존재하지 않습니다.`);
    }
    if (result.clashId && !resultIds.has(result.clashId)) {
      problems.push(`[${quiz.id}/${result.id}] clashId '${result.clashId}'가 존재하지 않습니다.`);
    }
  });

  return problems;
}
