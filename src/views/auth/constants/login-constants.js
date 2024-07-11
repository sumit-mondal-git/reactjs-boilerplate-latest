import * as Yup from "yup";
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
export const loginInnitialValues = {
  username: "",
  password: "",
};
const loginValidationRule = {
  username: Yup.string().required("Please Enter Username"),
  password: Yup.string().required("Please Enter Password"),
};
export const loginFormValidationSchema = Yup.object(loginValidationRule);
