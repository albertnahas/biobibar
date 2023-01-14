import axios from "axios"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { DATABASE_URL } from "../helpers/constants"

export const ContactForm = ({ source }: { source?: string }) => {
  interface FormData {
    name: string
    phone: string
    email: string
    source?: string
  }
  const {
    control,
    setError,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (data: FormData) => {
    axios
      .post(`${DATABASE_URL}/contacts.json`, {
        ...data,
        ...(source && { source }),
      })
      .then((response) => {
        reset()
        setSubmitted(true)
      })
      .catch((e) => {
        setError("name", {
          type: "server",
          message: "Something went wrong please try again later",
        })
      })
  }

  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 px-12 md:grid-cols-4 md:px-24">
            <div>
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => (
                  <input className="input" placeholder="Name" {...field} />
                )}
              />
              {errors.name && <span>Name is required</span>}
            </div>
            <div>
              <Controller
                control={control}
                name="phone"
                rules={{ required: true }}
                render={({ field }) => (
                  <input className="input" placeholder="Phone" {...field} />
                )}
              />
              {errors.phone && <span>Phone is required</span>}
            </div>
            <div>
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className="input"
                    type="email"
                    placeholder="Email Address"
                    {...field}
                  />
                )}
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <button className="btn-secondary uppercase">Contact us</button>
          </div>
        </form>
      ) : (
        <p className="text-center text-2xl">
          Thank you for contacting us, we will reach out to you soon
        </p>
      )}
    </>
  )
}
