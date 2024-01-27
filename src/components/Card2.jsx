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
import { Link } from "react-router-dom";

const Card2 = ({question, id, options, endDate, startDate, status}) => {

  const [answer, setAnswer] = useState(0);
  const [message, setMessage] = useState();
  const [localEndTime, setLocalEndTime] = useState('');
  const [localStartTime, setLocalStartTime] = useState('');

  useEffect(() => {
    const utcEndDate = new Date(endDate);
    const localEndDate = utcEndDate.toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    const utcStartDate = new Date(startDate);
    const localStartDate = utcStartDate.toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

      setLocalStartTime(localStartDate);
      setLocalEndTime(localEndDate);

  }, [endDate, startDate]);

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
        <Button onClick={submitHandler} disabled >Submit</Button>
      </CardFooter>
      <Link to={`/${id}/result`}><Button onClick={submitHandler} >Result</Button></Link>
      <div>
        <div>
          Start Time: {localStartTime}
        </div>
        <div>
          End Time: {localEndTime}
        </div>
        <div className="text-orange-500">
          {status}
        </div>
      </div>
    </Card>
    
  )
}

export default Card2