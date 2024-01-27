
import { useEffect, useState } from 'react'
import Card2 from '../components/Card2'
import axios from 'axios'

const AllQuizes = () => {

  const [activeQuiz, setActiveQuiz] = useState([]);

  useEffect(()=>{
    async function quizFetch() {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`https://quiz-back2.onrender.com/quizzes/all`,{
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
              <Card2 key={quiz._id} endDate={quiz.endDate} question={quiz.question} id={quiz._id} options={quiz.options} status={quiz.status} startDate={quiz.startDate}/>
            ))
          }
        </div>)
      }
    </div>
  )
}

export default AllQuizes