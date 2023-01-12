import { ReactSVG } from "react-svg"

export const Footer = () => {
  return (
    <footer className="footer mb-24">
      <div className="container px-12 pt-20 md:px-24">
        <div className="grid md:grid-cols-2 [&_td]:p-2">
          <div className="col-1 mb-8 md:mb-0">
            <table>
              <tbody>
                <tr>
                  <td>
                    <ReactSVG src="/location.svg" className="h-6 w-6" />
                  </td>
                  <td className="text-secondary-dark">
                    Aleppo, Syria, the industrial zone
                  </td>
                </tr>
                <tr>
                  <td>
                    <ReactSVG src="/phone.svg" className="h-6 w-6" />
                  </td>
                  <td className="text-secondary-dark">2-337-741-997-963+</td>
                </tr>
                <tr>
                  <td>
                    <ReactSVG src="/time.svg" className="h-6 w-6" />
                  </td>
                  <td className="text-secondary-dark">
                    10am to 9pm from Sunday to Thursday <br /> 9.30am to 6pm on
                    Saturday
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-2">
            <table>
              <tbody>
                <tr>
                  <td>
                    <a href="#">
                      <ReactSVG src="/facebook.svg" className="h-6 w-6" />
                    </a>
                  </td>
                  <td className="text-secondary-dark">
                    <a href="#" className="text-secondary-dark">
                      BIO_BIBAR
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">
                      <ReactSVG src="/instagram.svg" className="h-6 w-6" />
                    </a>
                  </td>
                  <td className="text-secondary-dark">
                    <a href="#" className="text-secondary-dark">
                      @BIO_BIBAR
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">
                      <ReactSVG src="/telegram.svg" className="h-6 w-6" />
                    </a>
                  </td>
                  <td className="text-secondary-dark">
                    <a href="#" className="text-secondary-dark">
                      BIO_BIBAR
                    </a>
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
