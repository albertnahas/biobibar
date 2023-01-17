import { initializeApp } from "firebase/app"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState, FormEvent, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { SplashScreen } from "../../components/SplashScreen"
import { firebaseConfig } from "../../helpers/config"

interface FormData {
  password: string
  email: string
}
const app = initializeApp(firebaseConfig)

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, email, password)
      // get url param named path
      const path = router.query.path as string | undefined
      router.push(path || "/admin")
    } catch (err: any) {
      setError(err.message)
    }
  }

  // listen for Firebase state change
  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        const path = router.query.path as string | undefined
        router.push(path || "/admin")
      } else {
        // User is signed out
      }
    })
    return () => unsubscribe()
  }, [router])

  return (
    <>
      {loading && <SplashScreen />}
      <div className="flex h-screen w-screen flex-col items-center pt-12">
        <Image
          src="/logo.png"
          className="md:h-64 md:w-64"
          width="300"
          height="300"
          alt={""}
        />
        <h1 className="my-4 text-4xl">Admin login</h1>
        <form
          className="w-300 [&>label]:mb-1 [&>label]:block"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>
            Email:
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
          </label>
          {errors.email && <span>Email is required</span>}
          <label>
            Password:
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              )}
            />
          </label>
          {errors.password && <span>Password is required</span>}
          <br />
          <button className="btn-secondary" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  )
}

export default LoginPage
