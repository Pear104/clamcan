import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { App, Button, Divider } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schemas";
import { POST } from "app/modules/request";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/Authentication/Register.json";
import errMsg from "app/locales/errMsg.json";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "app/components/GoogleButton";
import generatePasswordFromUID from "app/modules/password";

export default function Register() {
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { message } = App.useApp();
  const config = sConfig.use();

  const GoogleSignup = async (data) => {
    message.open({
      type: "loading",
      content: language[config.language].msgSigingIn,
      duration: 0,
    });

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDx9Q0J7J1_Xr7tnfYB-OFPj6pN6Xardq8",
      authDomain: "react-35756.firebaseapp.com",
      projectId: "react-35756",
      storageBucket: "react-35756.appspot.com",
      messagingSenderId: "645717377771",
      appId: "1:645717377771:web:f15b9e95860bda16a0b4ae",
    };

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

    const response = await POST("/register", {
      email: user.email,
      password: user.password,
    });
    if (response.status === 200) {
      navigate("/succeed-confirm");
    } else {
      setError("root", { message: errMsg.alreadyUsed });
    }
    message.destroy();
  };

  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: language[config.language].msgSigingUp,
      duration: 0,
    });
    const response = await POST(
      "/register",
      {
        email: data.email,
        password: data.password,
      },
      false,
      false
    );
    if (response.status === 200) {
      navigate("/succeed-confirm");
    } else {
      setError("root", { message: errMsg.alreadyUsed });
    }
    message.destroy();
  };
  return (
    <div className="w-[700px] mt-12  py-8 p-4 rounded-lg shadow-2xl bg-secondary">
      <h2 className="text-3xl font-bold mb-2 tracking-widest">
        {language[config.language].title}
      </h2>
      <p className="text-gray-600 mb-4">{language[config.language].guide}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-semibold text-base pb-2">
          {language[config.language].email}
        </div>
        <input
          {...register("email")}
          placeholder={language[config.language].emailPlaceholder}
          className="input-style mb-3 py-3 px-4 text-base"
        />
        {errors.email && (
          <div className="text-red-500 mb-2">
            {errors.email.message[config.language]}
          </div>
        )}
        <div className="font-semibold text-base pb-2">
          {language[config.language].password}
        </div>
        <input
          {...register("password")}
          type="password"
          placeholder={language[config.language].passwordPlaceholder}
          className="input-style mb-3 py-3 px-4 text-base"
        />
        {errors.password && (
          <div className="text-red-500 mb-2">
            {errors.password.message[config.language]}
          </div>
        )}
        <div className="font-semibold text-base pb-2">
          {language[config.language].confirmPassword}
        </div>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder={language[config.language].confirmPasswordPlaceholder}
          className="input-style mb-3 py-3 px-4 text-base"
        />
        {errors.confirmPassword && (
          <div className="text-red-500 mb-2">
            {errors.confirmPassword.message[config.language]}
          </div>
        )}
        {errors.root && (
          <div
            className={`text-red-500 mb-2 ${errors.confirmPassword && "mt-4"}`}
          >
            {errors.root.message[config.language]}
          </div>
        )}
        <p className="my-2 text-base text-gray-500">
          {language[config.language].alreadyHaveAccount}{" "}
          <Link to="/auth/login" className="text-blue-500">
            {language[config.language].signin}
          </Link>
        </p>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-2 py-6 font-bold text-base"
        >
          {language[config.language].signup}
        </Button>
      </form>
      {/* <Divider className="text-gray-500">OR</Divider>
      <GoogleButton onClick={GoogleSignup}>Sign up with Google</GoogleButton> */}

      {/* <p className="text-base text-gray-500 mt-4">
        {language[config.language].byClicking}
      </p> */}
    </div>
  );
}
