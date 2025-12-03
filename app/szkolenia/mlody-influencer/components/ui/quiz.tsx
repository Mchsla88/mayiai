'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Trophy, Sparkles } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
  onComplete?: (score: number) => void;
}

export function Quiz({ questions, title = "Quiz", onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question?.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete(score + (selectedAnswer === question?.correctAnswer ? 1 : 0));
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const isGoodScore = percentage >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-8"
      >
        <Card className="p-8 rounded-3xl shadow-warm bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-warm rounded-full flex items-center justify-center"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              {isGoodScore ? '🎉 Świetna robota!' : '😊 Dobra próba!'}
            </h3>
            <p className="text-xl mb-6 text-muted-foreground">
              Twój wynik: <strong className="text-orange-600">{score}/{questions.length}</strong> ({percentage}%)
            </p>
            <div className="space-y-3">
              {isGoodScore ? (
                <p className="text-lg">
                  Jesteś 🌟 super! Rozumiesz temat naprawdę dobrze!
                </p>
              ) : (
                <p className="text-lg">
                  Nie martw się! Możesz spróbować ponownie lub wrócić do materiału.
                </p>
              )}
              <div className="flex gap-4 justify-center mt-6">
                <Button
                  onClick={handleRestart}
                  className="rounded-2xl gap-2 bg-gradient-warm text-white"
                >
                  <Sparkles className="w-4 h-4" />
                  Spróbuj ponownie
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8"
    >
      <Card className="p-6 md:p-8 rounded-3xl shadow-warm bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-warm rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Pytanie {currentQuestion + 1} z {questions.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Wynik</p>
            <p className="text-2xl font-bold text-orange-600">{score}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="h-full bg-gradient-warm rounded-full"
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6 text-foreground">
              {question?.question}
            </h4>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question?.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = showExplanation;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                    whileTap={{ scale: showExplanation ? 1 : 0.98 }}
                    className={`w-full p-4 rounded-2xl text-left transition-all ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-100 border-2 border-green-500'
                          : isSelected
                          ? 'bg-red-100 border-2 border-red-500'
                          : 'bg-gray-100 border-2 border-transparent'
                        : isSelected
                        ? 'bg-orange-100 border-2 border-orange-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{option}</span>
                      {showResult && (
                        <div>
                          {isCorrect && (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <Card className={`p-4 rounded-2xl ${
                    selectedAnswer === question.correctAnswer
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-blue-50 border-2 border-blue-200'
                  }`}>
                    <p className="text-sm">
                      <strong className="text-foreground">Wyjaśnienie:</strong>{' '}
                      <span className="text-muted-foreground">{question?.explanation}</span>
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <Button
                  onClick={handleNext}
                  className="rounded-2xl gap-2 bg-gradient-warm text-white"
                >
                  {currentQuestion < questions.length - 1 ? 'Następne pytanie' : 'Zakończ quiz'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
