import * as yup from "yup"

export const invitationSchema = yup.object({
  email: yup.string().email().required(),
})