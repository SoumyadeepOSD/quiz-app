import { Routes, Route } from "react-router-dom";
import QuizAttept from "./pages/quiz-attempt";
import Home from "./pages/home";
import QuizResult from "./pages/quiz-result";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/attempt" element={<QuizAttept/>}/>
      <Route path="/quiz-result" element={<QuizResult/>}/>
    </Routes>
  )
}

export default App;
