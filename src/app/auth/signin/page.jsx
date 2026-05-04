"use client";
import React, { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log("form submitted", userData);

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      callbackURL: "/",
    });
    if (data) {
      alert("LogIn Success");
    }
    if (error) {
      alert("Error signing", error.message);
    }
    console.log("signin response", { data, error });
  };

  return (
    <div className="mx-auto my-auto border py-8 px-3 rounded-2xl shadow-xl">
      <h3 className="text-center text-2xl font-bold my-6">Log In</h3>
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        {/* email */}
        <TextField
          className="w-full max-w-[280px] mx-auto"
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input name="email" placeholder="Enter Your Email" />
          <FieldError />
        </TextField>
        {/* password */}
        <TextField className="w-full mx-auto max-w-[280px]" name="password">
          <Label>Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full max-w-[280px]"
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
            />
            <InputGroup.Suffix className="pr-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>
        <div className="flex gap-2 justify-center">
          <Button type="submit">Log In</Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;
