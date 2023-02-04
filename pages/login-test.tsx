import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { firebaseConfig } from "../helpers/config";

interface FormData {
  password: string;
  email: string;
}

const API_KEY = firebaseConfig.apiKey;

const LoginTest = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onSubmit = async ({ email, password }: FormData) => {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then(function (response) {
        if (response.data.idToken) {
          setIsLoggedIn(true);
          // get url param named path
          // const path = router.query.path as string | undefined;
          // router.push(path || "/admin");
        }
      })
      .catch(function (error: any) {
        setError(error.message);
      });
  };

  return (
    <>
      {isLoggedIn && <div>Logged In!</div>}
      <form
        className="w-300 [&>label]:mb-1 [&>label]:block"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>
          Email:
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                className="input"
                type="email"
                placeholder="Email Address"
                {...field}
              />
            )}
          />
        </label>
        {errors.email && <span>Email is required</span>}
        <label>
          Password:
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                className="input"
                type="password"
                placeholder="Password"
                {...field}
              />
            )}
          />
        </label>
        {errors.password && <span>Password is required</span>}
        <br />
        <button className="btn-secondary" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginTest;
