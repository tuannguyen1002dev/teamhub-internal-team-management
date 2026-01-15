'use client'
import { useForm, Controller, SubmitHandler, } from "react-hook-form"

import { useInvitationContext } from "../hooks/InvitationContext";
import { InvitationFormInputProps } from "@/shared/contracts/invitation/invitation-formInput.contract"
import { yupResolver } from "@hookform/resolvers/yup"
import { invitationSchema } from "../schemas/invitation.schema";
import { useToast } from "@/contexts/alertToastContext";


export default function InvitationForm() {

  const { createInvitation, loading } = useInvitationContext();
  const { showToast } = useToast()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InvitationFormInputProps>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(invitationSchema),
  })

  async function onSubmit(data: InvitationFormInputProps) {
    try {
      await createInvitation(data.email)
    } catch {
      // setError("email", { type: "manual", message: "Email or password is invalid", })
      showToast(`${errors.email?.message}`, "error")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <label htmlFor="addUserInput" className="text-2xl font-bold">Invitation section</label>
      <div className="input-field-xl-container">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} placeholder='email address'
            className="input-field-xl-primary"
          />} />
        <button disabled={loading} className="btn-primary" type="submit">
          Send Invitation
        </button>
      </div>
    </form>
  )
}