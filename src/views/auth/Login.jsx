import React from "react";
import { useFormik } from "formik";

import {
  loginInnitialValues,
  loginFormValidationSchema,
} from "./constants/login-constants";
import useRedirect from "../../common/hooks/useRedirect";
import axiosInstance from "../../services/helper/axiosInstance";
export default function Login() {
  const { redirectTo } = useRedirect();
  const formik = useFormik({
    initialValues: loginInnitialValues,
    validationSchema: loginFormValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        username: values.username,
        password: values.password,
      };
      // axiosInstance.post("/login", payload).then((res) => {
      //   console.log(res);
      // });
      console.log("hi");
      redirectTo("product/list");
    },
  });

  const {
    values,
    setValues,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  console.log("values", values);
  return (
    <div>
      <div>
        <input
          value={values.username}
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <span>{errors.username}</span>
      </div>
      <div>
        <input
          value={values.password}
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <span>{errors.password}</span>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
