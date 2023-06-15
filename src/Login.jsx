import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const creds = {
        username: "adarshbalika",
        password: "adarshBalika123",
      };

      const res = await axios.post("/api/auth/login", JSON.stringify(creds));

      console.log("respose from login:", res);
      

      if (res.status === 200) {
        const { foundUser, encodedToken } = await res.data; 
        localStorage.setItem("encodedToken", encodedToken); 
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={loginHandler}> Login </button>
    </>
  );
}
