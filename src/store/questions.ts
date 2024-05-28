import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Question } from "../types";
import confetti from "canvas-confetti";
interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset:()=>void;
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch(`/data.json`);
      const data = await res.json();

      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions: questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();

      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      const questionInfo = newQuestions[questionIndex];

      const isCorrectAnswer = answerIndex === questionInfo.correctAnswer;
      if (isCorrectAnswer) confetti();

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer: isCorrectAnswer,
        userSelectedAnswer: answerIndex,
      };

      set({ questions: newQuestions });
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if(nextQuestion < questions.length){
        set({currentQuestion: nextQuestion})
      }
    },

    goPreviousQuestion: ()=>{
      const {currentQuestion} = get()
      const previousQuestion = currentQuestion - 1

      if(previousQuestion >= 0){
        set({currentQuestion: previousQuestion})    
      }
   },

   reset:()=>{
    set({currentQuestion: 0, questions:[]})
   }

  }
},{
  name: "questions",
}))
