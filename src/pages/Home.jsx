import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Home = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        async function verify() {
            try {
                const token = localStorage.getItem("authToken");
                await axios.get(`https://quiz-back2.onrender.com/`, {
                headers:{
                    Authorization: token
                }})
                
            } catch (error) {
                
                navigate("/login");
            }
            
            
        }
        verify();
    })

  return (
    <div className="flex gap-x-4">
        <Button onClick={()=>navigate("/attempt")}>Attempt Active Quizzes</Button>
        <Button onClick={()=>navigate("/allquizzes")}>Get All Quizzes</Button>
        <Button onClick={()=>navigate("/add")}>Add Quiz</Button>
    </div>
  )
}

export default Home