
import { useEffect, useState } from 'react'
import QuizCard from '../components/QuizCard'
import axios from 'axios'

const AttemptQuiz = () => {

  const [activeQuiz, setActiveQuiz] = useState([]);

  useEffect(()=>{
    async function quizFetch() {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`https://quiz-back2.onrender.com/quizzes/active`,{
        headers: {
          Authorization: token,
        },
      });

      setActiveQuiz(response.data.quizes)
    } 

    quizFetch();

  }, [])


  return (
    <div className='flex justify-center items-center'>
      {
        activeQuiz.length == 0 ? (<div className='text-orange-500'>No Active Quizzes</div>)
        :
        ( <div>
          {
            activeQuiz.map((quiz) => (
              <QuizCard key={quiz._id} endDate={quiz.endDate} question={quiz.question} id={quiz._id} options={quiz.options}/>
            ))
          }
        </div>)
      }
    </div>
  )
}

export default AttemptQuiz