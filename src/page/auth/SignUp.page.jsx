import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Formik, Form, ErrorMessage } from "formik";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../store/service/endpoints/auth.endpoint";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "../../components/guard/Auth.guard";

const SignUpPage = () => {
  const nav=useNavigate()
  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const { toast } = useToast();
  const [fun, data] = useSignUpMutation();
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name should be longer than 2 letters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invaid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be 8 letter"),
    password_confirmation: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be 8 letter")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const handleSubmit = async (value) => {
    await fun(value);
    console.log(data);
  };
  useEffect(() => {
    if (data.error) {
      toast({
        title: "Auth Error From Server",
        description: data.error.data.message,
      });
    }else if(data.data){
      nav("/")
    }
  }, [data]);
  return (
    <AuthGuard>
      <div className="w-3/5 mx-auto  h-full flex justify-center items-center">
        <Card className=" basis-2/4 py-5 ">
          <CardHeader className="flex flex-row justify-between mb-5">
            <CardTitle>Sign Up</CardTitle>
            <CardDescription className="text-basic">
              <Link to="/">I already have an account.</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValue}
              onSubmit={handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ handleBlur, handleChange, values, isSubmitting }) => (
                <>
                  <Form className=" flex flex-col gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      type="text"
                      name="name"
                      id="name"
                    />
                    <ErrorMessage
                      className=" text-danger text-sm"
                      component={"p"}
                      name="name"
                    />
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      className=" text-danger text-sm"
                      component={"p"}
                      name="email"
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      type="password"
                      name="password"
                      id="password"
                    />
                    <ErrorMessage
                      className=" text-danger text-sm"
                      component={"p"}
                      name="password"
                    />
                    <Label htmlFor="password_confirmation">
                      Password Confirmation
                    </Label>
                    <Input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password_confirmation}
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                    />
                    <ErrorMessage
                      className=" text-danger text-sm"
                      component={"p"}
                      name="password_confirmation"
                    />
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-basic mt-3"
                    >
                      Sign Up
                      {isSubmitting && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
};

export default SignUpPage;
