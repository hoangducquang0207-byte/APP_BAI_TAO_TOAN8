export interface Lesson {
  id: string;
  name: string;
  forms: string[];
}

export interface Chapter {
  id: string;
  chapter: string;
  lessons: Lesson[];
}

export interface Question {
  id: number;
  level: "Nhận biết" | "Thông hiểu" | "Vận dụng" | "Vận dụng cao" | string;
  type: "Trắc nghiệm" | "Tự luận" | "Điền đáp án" | "Đúng/sai" | string;
  content: string;
  options: string[];
  correctAnswer: string;
  solution: string;
  hint?: string;
}

export interface CommonError {
  error: string;
  cause: string;
  correction: string;
  practice: string;
}

export interface Worksheet {
  title: string;
  lesson: string;
  form: string;
  objective: string;
  duration: string;
  questions: Question[];
  commonErrors: CommonError[];
  pedagogicalTips: string[];
}
