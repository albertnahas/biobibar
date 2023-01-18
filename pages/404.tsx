import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>Page not found - BIOBIBAR</title>
        <meta name="description" content="Page not found." />
      </Head>
      <div className="flex h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="h-26 mx-auto  w-auto"
            width="300"
            height="200"
            src="/logo.png"
            alt="Logo"
          />
          <h1 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-900">
            Oops, looks like the page you&apos;re looking for doesn&apos;t
            exist.
          </h1>
          <div className="mt-8">
            <div className="mx-auto max-w-md text-center">
              <p className="text-base leading-6 text-gray-500">
                You might have typed the address incorrectly or the link that
                brought you here is broken.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="rounded-md bg-indigo-500 py-2 px-4 font-medium text-white hover:bg-indigo-600"
                >
                  Go to homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
