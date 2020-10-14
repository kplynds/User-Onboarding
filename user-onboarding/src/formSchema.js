import * as yup from "yup"

export default yup.object().shape({
    username: yup
      .string()
      .required("username is required")
      .min(3, "username must be 3 character"),
    email: yup
      .string()
      .email("must be a valid email address")
      .required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(3, "password must be 3 character"),
    tos: yup.boolean()
  });