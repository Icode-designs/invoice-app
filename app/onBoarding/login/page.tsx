"use client";
import VariableButton from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { useMediaQuery } from "@/hooks/useMedia";
import { AuthForm } from "@/styles/components/authStyles";
import {
  FlexBox,
  PasswordContainer,
  StyledErrorMessage,
  StyledTextInput,
} from "@/styles/components/UI.styles";
import { loginUser } from "@/utils/actions/loginUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";

const LogInPage = () => {
  const [error, setError] = useState<string | undefined>();
  const isLargeScreen = useMediaQuery(768);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  const Wrapper = isLargeScreen ? "h1" : "h2";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await loginUser(formData);
    if (!res.success) {
      setError(res.error);
      return;
    }
    redirect("/");
  }

  return (
    <main>
      <AuthForm $variant="login" action="" onSubmit={handleSubmit}>
        <FlexBox $width="100%" $justify="center">
          <Wrapper>Welcome Back</Wrapper>
        </FlexBox>
        <TextInput label="email" type="email" name="email" required />

        <StyledTextInput>
          <label htmlFor="password">
            <p>
              password<span>*</span>
            </p>
          </label>

          <PasswordContainer>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
            />{" "}
            <button type="button" onClick={handleShowPassword}>
              <p>
                {" "}
                {!showPassword ? (
                  <GoEyeClosed size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </p>
            </button>
          </PasswordContainer>
        </StyledTextInput>
        <FlexBox $width="100%" $justify="flex-end">
          <FlexBox $width="fit-content">
            {" "}
            <p>Dont have an account? </p>
            <Link href="/onBoarding/signup">
              <span className="icon">Signup</span>{" "}
            </Link>
          </FlexBox>
        </FlexBox>

        <VariableButton variant="btn-600" type="submit">
          Login
        </VariableButton>
        {error && (
          <FlexBox $width="100%" $justify="center">
            <StyledErrorMessage>
              could not find user data, check your inputs and try again
            </StyledErrorMessage>
          </FlexBox>
        )}
      </AuthForm>
    </main>
  );
};

export default LogInPage;
