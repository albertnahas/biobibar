import { NextPage } from "next"
import { useEffect } from "react"
import Router from "next/router"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "../helpers/config"

interface AuthenticatedPageProps {
  isAuthenticated: boolean
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const withAuthentication = <P extends AuthenticatedPageProps>(
  Page: NextPage<P>
) => {
  const AuthenticatedPage: NextPage<any> = (props) => {
    useEffect(() => {
      if (!props.isAuthenticated) {
        Router.push("/admin/login")
      }
      console.log("auth check", props.isAuthenticated)
    }, [props.isAuthenticated])

    return <Page {...props} />
  }

  AuthenticatedPage.getInitialProps = async (ctx) => {
    const user = auth.currentUser

    if (!user) {
      ctx?.res?.writeHead(302, {
        Location: "/admin/login?path=" + ctx?.asPath || "/",
      })
      ctx?.res?.end()
      return { props: {} }
    }

    const isAuthenticated = !!user

    // Pass the authentication status to the page props
    const pageProps = Page.getInitialProps && (await Page.getInitialProps(ctx))
    return { ...pageProps, isAuthenticated }
  }

  return AuthenticatedPage
}

export default withAuthentication
