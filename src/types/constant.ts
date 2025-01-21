export interface dataType {
    id: number;
    title: string;
    quizes: quizDataType[];
}

export interface quizOptionType {
    id: string;
    name: string;
}

export interface quizDataType {
    sum_result: number;
    id: number;
    question: string;
    options: quizOptionType[];
    correct: quizOptionType;
    answer:quizOptionType;
}