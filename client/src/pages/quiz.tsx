import { useEffect } from "react";
import { useLocation } from "wouter";
import { QuizInterface } from "@/components/quiz-interface";

interface QuizPageProps {
  quizId: string;
}

export default function QuizPage({ quizId }: QuizPageProps) {
  const [, setLocation] = useLocation();

  const handleClose = () => {
    setLocation("/dashboard");
  };

  if (!quizId) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <QuizInterface
      quizId={quizId}
      isOpen={true}
      onClose={handleClose}
    />
  );
}
