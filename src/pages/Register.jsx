import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ message, setMessage ] = useState();

  const registrationHandler = async () => {

    try {
       const response = await axios.post("https://quiz-back2.onrender.com/register",{
          email,
          password
        })
        
        localStorage.setItem("authToken", `Bearer ${response.data.token}`);
        setMessage(response.data.message)
        navigate("/");

    } catch (error) {
      console.log(error)
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
          Register
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg"  onChange={(e)=>setEmail(e.target.value)} />
        <Input label="Password" size="lg"  onChange={(e)=>setPassword(e.target.value)} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button type="submit" onClick={registrationHandler} variant="gradient" fullWidth>
          Register
        </Button>
      </CardFooter>
      <div className="text-orange-500">
        {message}
      </div>
    </Card>
    </div>
  )
}

export default Register