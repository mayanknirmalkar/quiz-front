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

  import { useNavigate } from "react-router-dom";

  import axios from "axios";


const Login = () => {

  const navigate = useNavigate();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ message, setMessage ] = useState();

  const loginHandler = async () => {

    try {
       const response = await axios.post("https://quiz-back2.onrender.com/login",{
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
          Log In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" onChange={(e)=>{setEmail(e.target.value)}}/>
        <Input label="Password" size="lg" onChange={(e)=>{setPassword(e.target.value)}} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={loginHandler} variant="gradient" fullWidth>
          Login
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="/register"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Register
          </Typography>
        </Typography>
      </CardFooter>
      <div className="text-orange-500">
          {message}
      </div>
    </Card>
    </div>
  )
}

export default Login