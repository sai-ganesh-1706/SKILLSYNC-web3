// Utility to calculate user's reputation from tasks completed and tokens earned

export function calculateReputation({ tasksCompleted = 0, quizzesTaken = 0, tokensEarned = 0 }) {
  const taskWeight = 5;
  const quizWeight = 3;
  const tokenWeight = 0.01; // 1 point per 100 tokens

  const score =
    tasksCompleted * taskWeight +
    quizzesTaken * quizWeight +
    tokensEarned * tokenWeight;

  return Math.floor(score); // Integer reputation score
}

// Utility to get badge level from reputation
export function getBadgeFromReputation(score) {
  if (score >= 100) return "Legend";
  if (score >= 70) return "Expert";
  if (score >= 40) return "Intermediate";
  if (score >= 10) return "Beginner";
  return "Newbie";
}
