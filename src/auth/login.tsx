import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "./services/use-login";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { mutate } = useLogin();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        // localStorage.setItem('auth_token', data.token)
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div
      style={{
        width: "",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "#fff",
          width: "600px",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Login
          </label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Login is required" })}
            style={{
              width: "100%",
              padding: ".5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {errors.username && (
            <p style={{ color: "red", fontSize: ".875rem" }}>
              {errors.username.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            style={{
              width: "100%",
              padding: ".5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: ".875rem" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: ".75rem",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
