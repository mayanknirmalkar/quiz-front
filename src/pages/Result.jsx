import React, { useState,useEffect } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";

const Result = () => {

  const { id } = useParams();
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState("");

  useEffect(()=>{

    
      async function quizResultFetch() {
        const token = localStorage.getItem("authToken");
        try {
          const response = await axios.get(`https://quiz-back2.onrender.com/quizzes/${id}/result`,{
          headers: {
            Authorization: token,
          },
        });

          if( response.data.result == "not attempted")
            setResult("You haven't attempted the quiz!")
          else if( response.data.result == "correct" )
            setResult("Congratulation! your answer was right")
          else
            setResult("Sorry! your answer was incorrect")
          
        } catch (error) {
          setIsError(error.response.data.message)
        }
    } 

    quizResultFetch();

  }, []) 
  return (
    <h2 className='text-orange-500'>
        {
          isError ?  <div>{isError}</div> : <div>{result}</div>
        }
    </h2>
  )
}

export default Result