import { useUser } from "../contexts/UserContext";

export default function useXP() {
  const { addXP, incrementStreak } = useUser();

  const completeLesson = (baseXP = 50) => {
    addXP(baseXP);
    incrementStreak();
  };

  return { completeLesson };
}
