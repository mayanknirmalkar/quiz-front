import AttemptQuiz from './pages/AttemptQuiz';
import Register from "./pages/Register";
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AllQuizes from './pages/AllQuizes';
import Result from './pages/Result';
import AddQuiz from './pages/AddQuiz';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/add' element={<AddQuiz/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/attempt' element={<AttemptQuiz/>}/>
        <Route exact path='/allquizzes' element={<AllQuizes/>}/>
        <Route exact path='/:id/result' element={<Result/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
