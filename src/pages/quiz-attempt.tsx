/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { dataType } from "@/types/constant";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const QuizAttept = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quizId = queryParams.get("id"); // quizId is a string

    const [data, setData] = useState<dataType[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    function getQuiz() {
        const localStorageData = window.localStorage.getItem("data");
        if (localStorageData) {
            const specificData = JSON.parse(localStorageData);
            const filteredData = specificData.filter((e: any) => e.id === Number(quizId));
            setData(filteredData);
        }
    }

    useEffect(() => {
        getQuiz();
    }, [quizId]); // Depend on quizId to refetch if it changes

    // Function to update localStorage
    function updateLocalStorage(updatedData: any) {
        window.localStorage.setItem("data", JSON.stringify(updatedData));
    }

    // Handle the option selection and update localStorage
    function handleSelect(qid: number, oid: string) {
        setAnswers((prev) => ({
            ...prev,
            [qid]: oid
        }));

        // Find the specific question in the quiz data
        const updatedData = [...data]; // Create a copy of the current quiz data
        const quiz = updatedData.find((e: any) => e.id === Number(quizId));

        if (quiz) {
            const question = quiz.quizes.find((q: any) => q.id === qid);
            if (question) {
                // Update the selected answer
                question.answer = {
                    id: oid,
                    name: question.options.find((o: any) => o.id === oid)?.name || ""
                };

                // Update the sum_result
                if (question.answer.id === question.correct.id) {
                    question.sum_result = 1; // Correct answer
                } else {
                    question.sum_result = -1; // Incorrect answer
                }
            }

            // Save the updated data back to localStorage
            updateLocalStorage(updatedData);
        }
    }

    function submitQuiz() {
        window.location.href = `/quiz-result?id=${quizId}`;
    }

    return (
        <div className="flex flex-col items-center justify-center h-[100vh] w-full bg-slate-800">
            <h1 className="text-white">Quiz Attempt</h1>
            <h1 className="text-white">Quiz ID: {quizId}</h1>
            <div className="text-white overflow-scroll w-[95vw]">
                {data.map((e: dataType, i: number) => {
                    return (
                        <div key={i | e.id}>
                            <p className="font-bold text-4xl bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text my-5">
                                {e.title}
                            </p>
                            {e.quizes.map((data, index) => {
                                return (
                                    <div key={index | data.id}>
                                        <p className="text-white font-bold text-2xl">
                                            ({index + 1}). {data.question}
                                        </p>
                                        <div className="flex flex-col items-start justify-center mb-5 border-blue-400 border-b-2">
                                            {data.options.map((option, op_index) => {
                                                const isSelected = answers[data.id] === option.id;
                                                return (
                                                    <div
                                                        key={op_index}
                                                        className={`flex flex-row items-start gap-2 justify-start border-2 border-white rounded-md px-5 py-3 my-2 hover:cursor-pointer ${isSelected ? "bg-slate-400" : "hover:bg-slate-400"}`}
                                                        onClick={() => { handleSelect(data.id, option.id) }}
                                                    >
                                                        <span>({option.id})</span>
                                                        <span>{option.name}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="flex flex-col items-center">
                                <Button onClick={submitQuiz} variant="outline" className="text-black w-[80vw] my-2">Submit</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default QuizAttept;
