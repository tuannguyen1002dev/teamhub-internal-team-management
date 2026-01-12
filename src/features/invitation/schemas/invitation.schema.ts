import * as yup from "yup"

const BLOCKED_DOMAINS = ['mailinator.com', 'tempmail.com']

export const invitationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('Email is required')
    .test(
      'no-disposable-email',
      'Disposable email addresses are not allowed',
      value => {
        if (!value) return false
        const domain = value.split('@')[1]
        return !BLOCKED_DOMAINS.includes(domain)
      }),
})