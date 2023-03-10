import Link from "next/link"
import { ReactSVG } from "react-svg"
import { Info } from "../types/info"

export const Footer = ({ info }: { info?: Info }) => {
  return (
    <footer className="footer mb-24">
      <div className="container m-auto px-12 pt-20 md:px-24">
        <div className="grid md:grid-cols-2 [&_td]:p-2">
          <div className="col-1 mb-8 md:mb-0">
            <table>
              <tbody>
                <tr>
                  <td>
                    <ReactSVG src="/location.svg" className="h-6 w-6" />
                  </td>
                  <td className="text-secondary-dark">{info?.address}</td>
                </tr>
                <tr>
                  <td>
                    <ReactSVG src="/phone.svg" className="h-6 w-6" />
                  </td>
                  <td className="text-secondary-dark">{info?.phone}</td>
                </tr>
                <tr>
                  <td>
                    <ReactSVG src="/time.svg" className="h-6 w-6" />
                  </td>
                  <td className="w-80 text-secondary-dark">{info?.hours}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-2">
            <table>
              <tbody>
                <tr>
                  <td>
                    <Link href={info?.facebook || "#"}>
                      <ReactSVG src="/facebook.svg" className="h-6 w-6" />
                    </Link>
                  </td>
                  <td className="text-secondary-dark">
                    <Link
                      href={info?.facebook || "#"}
                      className="text-secondary-dark"
                    >
                      BIO_BIBAR
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href={info?.instagram || "#"}>
                      <ReactSVG src="/instagram.svg" className="h-6 w-6" />
                    </Link>
                  </td>
                  <td className="text-secondary-dark">
                    <Link
                      href={info?.instagram || "#"}
                      className="text-secondary-dark"
                    >
                      @BIO_BIBAR
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href={info?.telegram || "#"}>
                      <ReactSVG src="/telegram.svg" className="h-6 w-6" />
                    </Link>
                  </td>
                  <td className="text-secondary-dark">
                    <Link
                      href={info?.telegram || "#"}
                      className="text-secondary-dark"
                    >
                      BIO_BIBAR
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </footer>
  )
}
