import { Radio } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    CardFooter,
    Button,
  } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";

const QuizCard = ({question, id, options, endDate}) => {

  const [answer, setAnswer] = useState(0);
  const [message, setMessage] = useState();
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const utcDate = new Date(endDate);
    const localDate = utcDate.toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    setLocalTime(localDate);
  }, [endDate]);

  const submitHandler = async () => {

      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.post(`https://quiz-back2.onrender.com/quizzes/attempt/${id}`,{
          answer
        }, {
            headers: {
              Authorization: token
            }
        });

        setMessage(response.data.message)
        
      } catch (error) {
        setMessage(error.data.message);
      }
      
  }

  return (
    
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h6" color="blue-gray" className="mb-2">
         {question}
        </Typography>
        <div className="flex flex-col">
        <Radio name="options" onChange={()=>setAnswer(0)} label={options[0]}/>
        <Radio name="options" onChange={()=>setAnswer(1)} label={options[1]}/>
        <Radio name="options" onChange={()=>setAnswer(2)} label={options[2]}/>
        <Radio name="options" onChange={()=>setAnswer(3)} label={options[3]}/>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={submitHandler} >Submit</Button>
      </CardFooter>
      <div>
        <div>
          Ends on: {localTime}
        </div>
        <div className="text-orange-500">
          {message}
        </div>
      </div>
    </Card>
    
  )
}

export default QuizCard