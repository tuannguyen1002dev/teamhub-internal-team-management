import { AuthService } from "@/shared/services/auth.services"
import { useAuth } from "@/contexts/AuthProvider"
import { LoginPayload } from "../../domain/types"

export function useLogin() {
  const auth = useAuth()

  async function submit(data: LoginPayload) {
    try {
      await auth.login(data)
    } catch {
      throw new Error("INVALID_CREDENTIALS")
    }
  }

  return { submit }
}
