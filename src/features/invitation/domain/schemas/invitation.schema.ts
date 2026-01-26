import { z } from "zod"

const BLOCKED_DOMAINS = ['mailinator.com', 'tempmail.com']

export const invitationSchema = z.object({
  email: z
    .email('Invalid email address').trim()
    .min(1, 'Email is required')
    .refine(
      // 'no-disposable-email',
      // 'Disposable email addresses are not allowed',
      value => {
        if (!value) return false
        const domain = value.split('@')[1]
        return !BLOCKED_DOMAINS.includes(domain)
      }),
})