import { userAccount, userState } from "@/atoms/userState";
import { login } from "@/utility/loginAuth";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

const Login = () => {
  const setIsLogin = useSetRecoilState(userState);
  const emailRef = useRef();
  const nameRef = useRef();
  const namePattern = /^\w{3,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isInvalid, setIsInvalid] = useState(false);
  const setUserAccount = useSetRecoilState(userAccount);

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!namePattern.test(nameRef.current.value)) {
      nameRef.current.classList.add("border-red-300");
      valid = false;
    }

    if (!emailPattern.test(emailRef.current.value)) {
      emailRef.current.classList.add("border-red-300");
      valid = false;
    }

    if (!valid) {
      setIsInvalid(true);
    } else {
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value,
      };
      const res = await login(user);
      if (res.ok) {
        setUserAccount({
          name: nameRef.current.value,
          email: emailRef.current.value,
        });
        setIsLogin(true);
      }
    }
  };

  useEffect(() => {
    if (!isInvalid) return;

    const timer = setTimeout(() => {
      emailRef.current.classList.remove("border-red-300");
      nameRef.current.classList.remove("border-red-300");
      setIsInvalid(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isInvalid]);

  return (
    <div
      className="h-screen grid place-content-center"
      data-testid="login-component"
    >
      <p
        className={`bg-red-400 p-2 text-white capitalize text-center ${
          isInvalid ? "inline-grid" : "hidden"
        }`}
      >
        invalid input
      </p>
      <form
        className="grid gap-5 bg-slate-100 w-80 p-8 shadow-md"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            id="name"
            className="border shadow-sm p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            id="email"
            className="border shadow-sm p-2"
            type="email"
          />
        </div>
        <button type="submit" className="button shadow-sm mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
