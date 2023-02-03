import Link from "next/link"
import { FC, useState } from "react"
import Facebook from "./Facebook"

export const Navbar: FC<Props> = ({ bottom, transparent, isAdmin }) => {
  const [navbar, setNavbar] = useState(false)
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: `/products${isAdmin ? "" : "/all"}`, label: "Products" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <div
        className={`${
          navbar ? "block" : "hidden"
        } fixed inset-0 z-0 bg-text opacity-90`}
      ></div>
      <nav
        className="bg-cover bg-center bg-no-repeat bg-blend-multiply"
        style={{
          backgroundImage:
            transparent || bottom ? "" : `url("/bg.png"), url("/asset1.png")`,
        }}
      >
        <div className="z-21 h-100 md:px-18 relative mx-auto justify-between px-12 pt-10 md:flex md:items-center lg:max-w-7xl">
          <div>
            <div className="flex items-center justify-between py-3 md:block md:py-5">
              <Link href="/">
                <h2
                  className={`text-xl uppercase text-${
                    bottom ? "secondary-dark" : "primary"
                  }`}
                >
                  BioBibar {isAdmin && "Admin"}
                </h2>
              </Link>
              {!bottom && (
                <div className="md:hidden">
                  <button
                    className="rounded-md p-2 text-primary outline-none focus:border focus:border-primary"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <div
              className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                {links.map((link) => (
                  <li key={isAdmin ? `/admin${link.href}` : link.href}>
                    <Link
                      href={isAdmin ? `/admin${link.href}` : link.href}
                      className={`mr-2 px-3 py-1 text-xl uppercase text-${
                        bottom ? "secondary-dark" : "primary"
                      } `}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* {bottom && !isAdmin && <Facebook />} */}
      </nav>
    </>
  )
}

interface Props {
  bottom?: boolean
  transparent?: boolean
  isAdmin?: boolean
}
