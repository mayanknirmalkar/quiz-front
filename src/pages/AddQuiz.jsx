import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";


const AddQuiz = () => {

  const [question, setQuestion ] = useState("");
  const [options, setoptions ] = useState([]);
  const [rightAnswer, setRightAnswer ] = useState(0);
  const [startDate, setstartDate ] = useState();
  const [endDate, setEndDate ] = useState();
  const [message, setMessage] = useState();

  const addHandler = async () => {
    const token = localStorage.getItem("authToken");
    
    try {
        const response = await axios.post(`https://quiz-back2.onrender.com/quizzes`, {
        question,options,rightAnswer,startDate,endDate
      }, {
          headers: {
            Authorization: token,
          }
        
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  
  }

  return (
    <div className="flex justify-center items-center">
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Add Quiz
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Question" type="text" size="lg" onChange={(e)=>{setQuestion(e.target.value.toString())}}  />
        <textarea placeholder=" Enter options separated by ;" className="border border-black/30" onChange={(e)=>{
            const opts = e.target.value;
            const arr = opts.split(';');
            setoptions(arr);
        }} />
        <Input label="Right Answer" type="number" size="lg" onChange={(e)=>setRightAnswer(Number(e.target.value))}  />
        <Input label="Start Date" type="datetime-local" size="lg"  onChange={(e)=>setstartDate(new Date(e.target.value))} />
        <Input label="End Date" type="datetime-local" size="lg"  onChange={(e)=>setEndDate(new Date(e.target.value))} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button type="submit" onClick={addHandler}  variant="gradient" fullWidth>
          Add
        </Button>
      </CardFooter>
      <div className="text-orange-500">
          {message}
      </div>
    </Card>
    </div>
  )
}

export default AddQuiz