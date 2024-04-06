import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  SignInStart,
  signInFailure,
} from "../Redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errormessage } = useSelector((state) => state.user);

  // const [loading,setLoading]=useState(false);
  // const [errormessage,setErrormessage]=useState(null);

  const password = useRef();
  const email = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    //if any field is empty , show an error and return
    if (!data.email || !data.password) {
      dispatch(signInFailure("All fields are required"));
    }

    try {
      // setLoading(true);
      // setErrormessage(null);

      //doing the above by this
      dispatch(SignInStart());
      
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      
      const d = await response.json();
      //  console.log(d);

      if (d.success === false) {
        // return setErrormessage(d.message);
        // console.log(d);
        dispatch(signInFailure(d.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(d.user));
        navigate("/");
      }
    } catch (error) {
      
      dispatch(signInFailure(error));
      console.log("front err" + error);
    }
  };

  return (
    <div className="min-h-screen mt-20  ">
      <div
        className="flex p-3 max-w-3xl mx-auto flex-col
       md:flex-row md:items-center gap-5"
      >
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="  font-bold dark:text-white text-4xl ">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 
      to-pink-500  text-white "
            >
              Khushi's
            </span>
            <span>Blog</span>
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                ref={email}
                type="email"
                placeholder="Ex: kimchi@gmail.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                ref={password}
                type="password"
                placeholder="*****************"
                id="password"
              />
            </div>

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">loading...</span>
                </>
              ) : (
                "sign In"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>New user?</span>
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-900">
              Sign Up
            </Link>
          </div>


     
           {errormessage && (
            <Alert className="mt-5" color="failure">
              {errormessage}
            </Alert>
          )} 
        </div>
      </div>
    </div>
  );
};

export default SignIn;
