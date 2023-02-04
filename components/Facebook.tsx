import Script from "next/script"

function Facebook() {
  const props = { theme_color: "#de9f26" }
  return (
    <div>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" {...props} className="fb-customerchat"></div>
      <Script id="fb" src="./chat.js" strategy="lazyOnload" />
    </div>
  )
}

export default Facebook
