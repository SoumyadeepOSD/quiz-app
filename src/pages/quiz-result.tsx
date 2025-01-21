/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { dataType } from "@/types/constant";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const QuizResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quizId = queryParams.get("id"); // quizId is a string
    const [data, setData] = useState<dataType[]>([]);
    const [result, setResult] = useState<number>(0); // Track the result

    function getQuiz() {
        const localStorageData = window.localStorage.getItem("data");
        if (localStorageData) {
            const specificData = JSON.parse(localStorageData);
            const filteredData = specificData.filter((e: any) => e.id === Number(quizId));
            setData(filteredData);
        }
    }

    function generateResult() {
        let totalResult = 0;
        const quizesInfo = data?.[0]?.quizes || []; 

        quizesInfo.forEach((quiz) => {
            totalResult += quiz.sum_result; 
        });

        setResult(totalResult); 
    }

    useEffect(() => {
        getQuiz();
    }, [quizId]); 

    useEffect(() => {
        if (data.length > 0) {
            generateResult(); 
        }
    }, [data]); 

    function handleReturn(){
        window.location.href="/";
    }

    return (
        <div className="h-[100vh] w-full flex flex-col items-center justify-center">
            {/* <h1>Quiz Result</h1> */}
            <div>
                <h2 className="text-2xl font-semibold mb-5">Your Result: {result}</h2>
                <CheckCircle2 color="green" height={100} width={100} className="mb-5"/>
                <Button onClick={handleReturn} className="mb-5">Attempt Again</Button>
            </div>
        </div>
    );
};

export default QuizResult;
