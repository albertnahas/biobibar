import Script from "next/script"

function Facebook() {
  const props = { theme_color: "#de9f26" }
  return (
    <div>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" {...props} className="fb-customerchat"></div>

      <Script id="fb" strategy="lazyOnload">
        {`
      var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "105410252199747");
      chatbox.setAttribute("attribution", "biz_inbox");

      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v16.0'
        });
      };
      window.addEventListener("messengerDialog", function (event) {
        event.detail === "open" ? FB.CustomerChat.showDialog() : FB.CustomerChat.hideDialog();
    });

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
    </div>
  )
}

export default Facebook
