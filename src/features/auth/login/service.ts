// features/auth/service.ts
import API from "@/shared/utils/api"
import { LoginPayload } from "./types"

export async function login(payload: LoginPayload) {
  const { data } = await API.post("/auth/login", payload)
  return data
}
