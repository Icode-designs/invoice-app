"use client";
import { AuthForm } from "@/styles/components/authStyles";
import React, { FormEvent, useState } from "react";

import VariableButton from "@/components/ui/Button";
import {
  FlexBox,
  PasswordContainer,
  StyledTextInput,
} from "@/styles/components/UI.styles";
import TextInput from "@/components/ui/TextInput";
import { InputContainer } from "@/styles/components/NewInvoiceForm.styles";
import { signupUser } from "@/utils/actions/signupUser";
import { FaRegEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { redirect } from "next/navigation";
import Link from "next/link";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password")!;
    const confirmPassword = formData.get("confirmPassword")!;

    if (password !== confirmPassword) {
      alert("passwords do not match");
      setSubmitting(false);
      return;
    }

    if (typeof password === "string" && password.length < 8) {
      alert("Password must be at least 8 characters");
      setSubmitting(false);
      return;
    }

    await signupUser(formData);

    setSubmitting(false);
    redirect("/onBoarding/login");
  }

  return (
    <main>
      <AuthForm action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <FlexBox $variant="secondary">
          <TextInput name="firstName" label="first name" type="text" required />
          <TextInput name="lastName" label="last name" type="text" required />
        </FlexBox>
        <InputContainer>
          <TextInput
            label="Street Address"
            name="street"
            type="text"
            required
          />
          <FlexBox $variant="secondary">
            <FlexBox>
              <TextInput label="City" name="city" type="text" required />
              <TextInput
                label="Post Code"
                name="postcode"
                type="number"
                required
              />
            </FlexBox>
            <TextInput label="country" name="country" type="text" required />
          </FlexBox>
        </InputContainer>
        <TextInput type="email" label="email" name="email" required />
        <FlexBox $variant="secondary">
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
          <StyledTextInput>
            <label htmlFor="confirmPassword">
              <p>
                confirm password<span>*</span>
              </p>
            </label>

            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
            />
          </StyledTextInput>
        </FlexBox>
        <FlexBox $width="100%" $justify="flex-end">
          <Link href="/onBoarding/login">
            {" "}
            <p>
              Already have an account? <span className="icon">Login</span>
            </p>
          </Link>
        </FlexBox>
        <VariableButton variant="btn-600" type="submit">
          {!submitting ? "Submit" : "Submitting..."}
        </VariableButton>
      </AuthForm>
    </main>
  );
};

export default SignInPage;
