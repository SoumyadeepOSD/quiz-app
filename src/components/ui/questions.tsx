import { quizDataType, quizOptionType } from "@/types/constant"

interface questionsType{
    data: quizDataType[]
}

const Questions = ({ data }: questionsType) => {
    return (
        <div className="overflow-scroll h-32 border-2 border-blue-400 p-2">
            {data.map((quiz) => (
                <div key={quiz.id}>
                    <p className="font-semibold text-black">Question: {quiz.question}</p>
                    <ul>
                        {quiz.options.map((option: quizOptionType) => (
                            <li key={option.id} className="text-slate-400 font-semibold">
                                {option.name}
                            </li>
                        ))}
                    </ul>
                    <hr/>
                </div>
                
            ))}
        </div>
    );
}

export default Questions;
