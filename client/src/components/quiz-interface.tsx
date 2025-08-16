import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizInterfaceProps {
  quizId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function QuizInterface({ quizId, isOpen, onClose }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { getAuthHeaders } = useAuth();
  const { toast } = useToast();

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["/api/quizzes", quizId],
    enabled: isOpen && !!quizId,
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (answers: Record<number, number>) => {
      const score = calculateScore(answers);
      const quizData = {
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer,
          correct: quiz.questions.find((q: Question) => q.id === parseInt(questionId))?.correctAnswer === answer,
        })),
      };

      const response = await apiRequest("POST", "/api/quiz-results", quizData, getAuthHeaders());
      return response.json();
    },
    onSuccess: (result) => {
      setShowResults(true);
      toast({
        title: "Quiz completed!",
        description: `You scored ${result.score} out of ${result.totalQuestions}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting quiz",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Timer effect
  useEffect(() => {
    if (!quiz || !isOpen) return;

    setTimeRemaining(quiz.timeLimit * 60); // Convert minutes to seconds

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          submitQuizMutation.mutate(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, isOpen]);

  const calculateScore = (userAnswers: Record<number, number>) => {
    if (!quiz) return 0;
    let correct = 0;
    quiz.questions.forEach((question: Question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    submitQuizMutation.mutate(answers);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    onClose();
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (showResults) {
    const score = calculateScore(answers);
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-card rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold text-primary mb-4">{percentage}%</div>
            <p className="text-xl mb-6">
              You scored {score} out of {quiz.questions.length} questions correctly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleClose} data-testid="quiz-close">
                Close
              </Button>
              <Button variant="outline" onClick={() => setShowResults(false)} data-testid="quiz-review">
                Review Answers
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50">
      <div className="min-h-screen flex flex-col">
        {/* Quiz Header */}
        <div className="bg-card shadow-sm border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="mr-4"
                  data-testid="quiz-exit"
                >
                  <X className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold" data-testid="quiz-title">
                  {quiz.title}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  Question <span data-testid="current-question">{currentQuestion + 1}</span> of{" "}
                  <span data-testid="total-questions">{quiz.questions.length}</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span data-testid="quiz-timer">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={progress} className="w-full" data-testid="quiz-progress" />
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4" data-testid="question-text">
                  {currentQ.question}
                </h2>
              </div>

              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <label key={index} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={index}
                      className="sr-only"
                      checked={answers[currentQ.id] === index}
                      onChange={() => handleAnswerSelect(currentQ.id, index)}
                      data-testid={`option-${index}`}
                    />
                    <div
                      className={`p-4 border-2 rounded-lg transition-colors quiz-option ${
                        answers[currentQ.id] === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}) {option}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  data-testid="quiz-previous"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button
                    onClick={finishQuiz}
                    disabled={submitQuizMutation.isPending}
                    data-testid="quiz-finish"
                  >
                    {submitQuizMutation.isPending ? "Submitting..." : "Finish Quiz"}
                  </Button>
                ) : (
                  <Button onClick={nextQuestion} data-testid="quiz-next">
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
