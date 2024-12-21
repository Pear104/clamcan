import React from "react";
import schema from "./schemas";
import language from "app/locales/pages/Authentication/Login.json";
import { Link, useNavigate } from "react-router-dom";
import { App, Button, Divider } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "app/modules/cookie";
import { GET, POST } from "app/modules/request";
import { decodeJWT } from "app/modules/jwtUtils";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";
import { sConfig } from "app/stores/configStore";
import errMsg from "app/locales/errMsg.json";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "app/components/GoogleButton";
import generatePasswordFromUID from "app/modules/password";
import { firebaseConfig } from "app/modules/firebase";

export default function Login({ worker = false }) {
  // Setup form handler
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const config = sConfig.use();
  const { message } = App.useApp();

  const GoogleLogin = async (data) => {
    message.open({
      type: "loading",
      content: language[config.language].msgSigingIn,
      duration: 0,
    });

    const app = initializeApp(firebaseConfig);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const user = {};
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const email = result.user.email;

        console.log(email);

        const uid = auth.currentUser.uid;
        const password = await generatePasswordFromUID(uid);
        user.email = email;
        user.password = password;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
      });

    const response = await POST(
      `/login`,
      {
        email: user.email,
        password: user.password,
      },
      false,
      false
    );
    if (response.status === 200) {
      message.destroy(); // Destroy loading message
      setCookie("accessToken", response.data.data);
      const { data: userData } = await GET(`/${worker ? "account" : "user"}`);
      sAuth.set(
        (pre) =>
          (pre.value = {
            isAuthenticated: true,
            avatar: userData.data.avatar,
            role: decodeJWT(response.data.data)?.role || Role.USER,
            name: userData.data.name,
            email: userData.data.email,
            isLoading: false,
          })
      );
      // Check if the external user log in to the worker portal
      if (worker && decodeJWT(response.data.data).role == "") {
        message.error({
          content: language[config.language].msgErr,
          duration: 2,
        });
      } else {
        message.destroy();
        navigate(worker ? "/worker/dashboard" : "/");
      }
    } else {
      setError("root", { message: errMsg.wrongPassword });
      message.destroy();
    }
  };

  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: language[config.language].msgSigingIn,
      duration: 0,
    });
    const response = await POST(
      `/${worker ? "worker/" : ""}login`,
      {
        email: data.email,
        password: data.password,
      },
      false,
      false
    );
    if (response.status === 200) {
      message.destroy(); // Destroy loading message
      setCookie("accessToken", response.data.data);
      const { data: userData } = await GET(`/${worker ? "account" : "user"}`);
      sAuth.set(
        (pre) =>
          (pre.value = {
            isAuthenticated: true,
            avatar: userData.data.avatar,
            role: decodeJWT(response.data.data)?.role || Role.USER,
            name: userData.data.name,
            email: userData.data.email,
            isLoading: false,
          })
      );
      // Check if the external user log in to the worker portal
      if (worker && decodeJWT(response.data.data).role == "") {
        message.error({
          content: language[config.language].msgErr,
          duration: 2,
        });
      } else {
        message.destroy();
        navigate(worker ? "/worker/dashboard" : "/");
      }
    } else {
      setError("root", { message: errMsg.wrongPassword });
      message.destroy();
    }
  };
  return (
    <div className="w-[700px] mt-12 pt-10 p-4 rounded-lg shadow-2xl bg-secondary">
      <h2 className="text-3xl font-bold mb-6 tracking-widest">
        {worker && language[config.language].worker + " "}
        {language[config.language].title}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-semibold text-base pb-2">
          {language[config.language].email}
        </div>

        <input
          {...register("email")}
          type="text"
          placeholder={language[config.language].emailPlaceholder}
          className={`input-style py-3 px-4 text-base ${
            !errors.email ? "mb-3" : "mb-1"
          }`}
        />
        {errors.email && (
          <div className="text-red-500 mb-2">
            {errors.email.message[config.language]}
          </div>
        )}
        <div className="font-semibold text-base pb-2 flex justify-between">
          {language[config.language].password}{" "}
          <Link
            to={`${worker ? "/worker" : ""}/auth/reset-password`}
            className="text-blue-500"
          >
            {language[config.language].forgot}
          </Link>
        </div>
        <input
          {...register("password")}
          placeholder={language[config.language].passwordPlaceholder}
          type="password"
          className={`input-style py-3 px-4 text-base ${
            !errors.email ? "mb-3" : "mb-1"
          }`}
        />

        {errors.password && (
          <div className="text-red-500 mb-2">
            {errors.password.message[config.language]}
          </div>
        )}
        <p className="text-base text-gray-500">
          {language[config.language].dontHaveAccount}{" "}
          <Link to="/auth/register" className="text-blue-500">
            {language[config.language].signup}
          </Link>
        </p>
        {errors.root && (
          <div className={`text-red-500 mb-2 ${errors.password && "mt-4"}`}>
            {errors.root.message[config.language]}
          </div>
        )}
        <Button
          htmlType="submit"
          type="primary"
          className="w-full mt-4 py-6 font-bold text-lg"
        >
          {language[config.language].title}
        </Button>
      </form>
      {/* <Divider className="text-gray-500">OR</Divider>
      <div className="flex justify-center items-center mt-4">
        <GoogleButton onClick={GoogleLogin}>Sign in with Google</GoogleButton>
      </div> */}

      {/* {!worker && (
        <>
          <p className="text-base text-gray-500">
            {language[config.language].dontHaveAccount}{" "}
            <Link to="/auth/register" className="text-blue-500">
              {language[config.language].signup}
            </Link>
          </p>
          <p className="text-base text-gray-500 mt-4 pb-16">
            {language[config.language].byClicking}
          </p>
        </>
      )} */}
    </div>
  );
}
