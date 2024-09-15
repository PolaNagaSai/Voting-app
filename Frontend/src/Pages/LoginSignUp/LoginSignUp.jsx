import { useForm } from "react-hook-form";
import { useState } from "react";
import { signupSchema, loginSchema } from "./Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {signUp,login} from "../../apiService";
import { useNavigate } from 'react-router-dom';
import "./LoginSignUp.css";
import NavBar from "../../Components/NavBar/NavBar.jsx";
import { useAuth } from "../../AuthContext.jsx";



const LoginSignUp = () => {
  const [action, setAction] = useState("SignUp");
 const { login: authenticate } = useAuth();
  const navigate = useNavigate();

  const schema = action === "SignUp" ? signupSchema : loginSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      age: '', // Ensure age is set to an empty string if no default value is needed
    }
  });

  const onSubmit = async (data) => {
    
    try {

      const formattedData = {
        ...data,
        aadharCardNumber: data.aadharCardNumber ? Number(data.aadharCardNumber) : undefined,
        // Conditionally format age if the action is "SignUp"
        ...(action === "SignUp" && { age: data.age ? Number(data.age) : undefined })
      };
      let response;
      if (action === "SignUp") {
        response = await signUp(formattedData);
      } else {
        response = await login(formattedData);
        const{name,isVoted,token,role}=response;

        if (response && token) { // Ensure you get a token or similar success indication
          authenticate(token,isVoted,name); // Store token and update authentication state

          if(role==="admin"){  // check if the user login has admin role
            navigate("/admin");// Redirect to admin page
          }else{
            navigate('/user'); // Redirect to user page
          }          
        } else {
          alert('Invalid credentials');
        }
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle error (e.g., show an error message to the user)
    }
    reset();
  };

  const handleAction = (actionType) => {
    setAction(actionType);
    reset();
  };

  return (
    <>
    <NavBar/>
      <div className="container">
        <div className="action-container">
          <div
            className={action === "Login" ? "action gray" : "action"}
            onClick={() => handleAction("SignUp")}
          >
            SignUp
          </div>
          <div
            className={action === "SignUp" ? "action gray" : "action"}
            onClick={() => handleAction("Login")}
          >
            Login
          </div>
        </div>
        <form className="inputs" onSubmit={handleSubmit(onSubmit)}>
          {action === "Login" ? (
            <></>
          ) : (
            <>
              <div className="input">
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Username:"
                />
                {errors.username && (
                  <span className="error">{errors.username.message}</span>
                )}
              </div>

              <div className="input">
                <input
                  {...register("email")}
                  type="text" //changed the type to text to remove the native HTML Email error
                  placeholder="Email:"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
              <div className="input">
                <input
                  {...register("age", {
                    setValueAs: (value) => (value ? Number(value) : undefined),
                  })}
                  type="number"
                  placeholder="Age:"
                />
                {errors.age && (
                  <span className="error">{errors.age.message}</span>
                )}
              </div>
              <div className="input">
                <input
                  {...register("mobile")}
                  type="text"
                  placeholder="Mobile Number:"
                />
                {errors.mobile && (
                  <span className="error">{errors.mobile.message}</span>
                )}
              </div>
              <div className="input">
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Address:"
                />
                {errors.address && (
                  <span className="error">{errors.address.message}</span>
                )}
              </div>
            </>
          )}
          <div className="input">
            <input
              {...register("aadharCardNumber")}
              type="text"
              placeholder="Aadhar Card Number:"
            />
            {errors.aadharCardNumber && (
              <span className="error">{errors.aadharCardNumber.message}</span>
            )}
          </div>
          <div className="input">
            <input
              {...register("password")}
              type="password"
              placeholder="Password:"
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          {action === "Login" ? (
            <div className="forgot-password">
              Forgot password ? <span>Click Here!</span>
            </div>
          ) : (
            <></>
          )}

          <div>
            <button
              disabled={isSubmitting}
              className="submit-btn"
              type="submit"
            >
              {isSubmitting ? "Loading..." : action}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginSignUp;
