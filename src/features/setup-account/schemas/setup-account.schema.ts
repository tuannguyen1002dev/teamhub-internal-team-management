import * as yup from "yup"

export const setupAccountSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required().matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "incorrect username").min(4, "Username must be at least 4 characters").max(20, "Username must be at most 20 characters"),
  fullname: yup.string().required().matches(/^[\p{L}][\p{L}'\-\. ]{1,48}[\p{L}]$/u, "this is not an actual name for a person"),
  phone: yup.string().required(),
  address: yup.string().required(),
  password: yup.string().required().min(8, "Password must be at least 8 characters").required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain atlest one uppercase, one number and one special character"),
  confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Passwords must match").required("Please re-enter the password"),
})