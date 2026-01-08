import * as yup from "yup"

export const accountScheme = yup.object({
  email: yup.string().email().required(),
  fullname: yup.string().required(),
  username: yup.string().required(),
  phone: yup.string(),
  dateofbirth: yup.string(),
  address: yup.string(),
  gender: yup.string().oneOf(["Male", "Female", "Other"]),
  role: yup.string().oneOf(["Admin", "User", "Manager"]),
  permissions: yup.array().of(yup.string().oneOf(["READ", "WRITE", "UPDATE", "DELETE", "MANAGE"])),
})

export const createAccountScheme = accountScheme.pick(["email"])

export const updateAccountSchema = accountScheme.omit(["email"])