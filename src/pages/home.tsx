/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { dialog_data } from "@/constant";
import { Button } from "@/components/ui/button";
import CustomDialogueAi from "@/components/ui/custom-dialogue-ai";
import CustomDialogueSelf from "@/components/ui/custom-dialogue-self";
import Questions from "@/components/ui/questions";


interface dataType {
  id: number;
  title: string;
  quizes: quizDataType[];
  result:number;
}

interface quizOptionType {
  id: string;
  name: string;
}

interface quizDataType {
  id: number;
  question: string;
  options: quizOptionType[];
  correct: quizOptionType;
  answer:quizOptionType;
  sum_result:number;
}

const Home = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [newInput, setNewInput] = useState<string>("");
  const [quizData, setQuizData] = useState<quizDataType[]>([]);
  const [optionNumber, setOptionNumber] = useState(0);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<string>("");

  // State to store the input values for each option
  const [optionsInput, setOptionsInput] = useState<string[]>([]);

  function addItems() {
    const localStorageData = window.localStorage.getItem("data");
    if (localStorageData === null) {
      window.localStorage.setItem("data", JSON.stringify(dialog_data));
      setData(dialog_data);
    } else {
      setData(JSON.parse(localStorageData));
    }
  }

  function appendElement() {
    const newItem = {
      id: data.length + 1,
      title: newInput,
      quizes: [],
      result: 0
    };
    const updatedData = [...data, newItem];
    setData(updatedData);
    window.localStorage.setItem("data", JSON.stringify(updatedData));
  }

  function removeEelement(id: number) {
    const localStorageData = window.localStorage.getItem("data");
    const updatedData = JSON.parse(localStorageData!).filter(
      (e: dataType) => e.id !== id
    );
    window.localStorage.setItem("data", JSON.stringify(updatedData));
    setData(updatedData);
  }

  function addQuiz(selectedItemId: number) {
    // Create new quiz object using the input values from optionsInput
    const newQuiz: quizDataType = {
      id: Date.now(), // Assuming new ID is sequential
      question: newQuestion,
      options: Array.from({ length: optionNumber }, (_, i) => ({
        id: String.fromCharCode(97 + i), // 'a', 'b', 'c', ...
        name: optionsInput[i] || `Option ${String.fromCharCode(97 + i)}`, // Use the input value, or fallback to default
      })),
      correct: {
        id: correctOption,
        name: `Option ${correctOption}`,
      },
      answer:{
        id:"",
        name:""
      },
      sum_result:0
    };

    // Retrieve existing data from localStorage
    const localStorageData = window.localStorage.getItem("data");
    const existingData = localStorageData ? JSON.parse(localStorageData) : [];

    // Find the specific topic/course where this quiz should be added
    const updatedData = existingData.map((item: dataType) => {
      if (item.id === selectedItemId) {
        return {
          ...item,
          quizes: [...item.quizes, newQuiz], // Add the new quiz to the `quizes` array
        };
      }
      return item;
    });

    // Update state with new quiz data
    setQuizData(updatedData);

    // Save updated data back into localStorage
    window.localStorage.setItem("data", JSON.stringify(updatedData));

    // Reset fields
    setNewQuestion("");
    setOptionNumber(0);
    setCorrectOption("");
    setOptionsInput([]); // Clear options input state
  }

  useEffect(() => {
    addItems();
  }, []);

  function getQuizes(index: number) {
    const filteredQuiz = data.filter(e => e.id === index);
    return filteredQuiz;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-[100vh] bg-slate-900 p-5">
      <div className="flex flex-row items-start w-full">
        <img alt="logo" src="./logo.png" height={200} width={200} />
      </div>
      <div className="mt-10">
        <div className="flex flex-row items-center justify-start gap-10">
          <CustomDialogueAi />
          <CustomDialogueSelf action={appendElement} setNewInput={setNewInput} />
        </div>
      </div>
      <div className="w-[400px]">
        {data.map((item) => {
          const filteredData = getQuizes(item.id)[0];
          return (
            <div
              key={item.id}
              className="my-2 bg-gradient-to-br from-purple-900 to-cyan-800 p-3 flex flex-row items-start justify-between"
            >
              <h1 className="text-white text-sm font-semibold">{item.title}</h1>
              <div className="flex flex-row items-center justify-center gap-2">
                <Button
                  onClick={() => { window.location.href = `/attempt?id=${item.id}` }}
                >
                  Attempt
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Pencil color="white" className="hover:cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Existing Quiz</AlertDialogTitle>
                      <AlertDialogDescription className="flex flex-col gap-2">
                        <Input
                          placeholder="Enter New Question"
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <Input
                          placeholder="Number of options"
                          type="number"
                          value={optionNumber}
                          onChange={(e) => setOptionNumber(+e.target.value)}
                        />
                        <div>
                          {Array.from({ length: optionNumber }).map((_, i) => {
                            const optionNumberChar = String.fromCharCode(97 + i);
                            return (
                              <div key={i} className="flex flex-col mb-2">
                                <h1 className="flex flex-row items-center justify-start gap-2 font-semibold text-black text-xs">
                                  <span>{optionNumberChar}</span>
                                  <Input
                                    className="option text"
                                    placeholder={`Write option for option ${optionNumberChar}`}
                                    value={optionsInput[i] || ""} // Bind to the input state
                                    onChange={(e) => {
                                      const updatedOptions = [...optionsInput];
                                      updatedOptions[i] = e.target.value; // Update the specific option value
                                      setOptionsInput(updatedOptions); // Update state
                                    }}
                                  />
                                </h1>
                              </div>
                            );
                          })}
                        </div>
                        <Input
                          placeholder="Correct Option (e.g., 'a')"
                          value={correctOption}
                          onChange={(e) => setCorrectOption(e.target.value)}
                        />
                        {filteredData.quizes.length>0 
                        &&
                        (<div>
                          <p>Your previous questions {item.id}</p>
                          <div>
                            <Questions data={filteredData.quizes}/>
                          </div>
                        </div>)}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => addQuiz(item.id)}>
                        Create
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Trash color="red" className="hover:cursor-pointer" onClick={() => removeEelement(item.id)} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Home;
