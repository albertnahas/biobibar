var chatbox = document.getElementById('fb-customer-chat');
// chatbox.setAttribute("page_id", "105410252199747");
chatbox.setAttribute("page_id", "104294979153163");
chatbox.setAttribute("attribution", "biz_inbox");

var chatroot = document.getElementById('fb-root');
chatroot.style.visibility = "hidden";

window.fbAsyncInit = function () {
    FB.init({
        xfbml: true,
        version: 'v16.0'
    });
    // FB.Event.subscribe('xfbml.render', finished_rendering);
};
window.addEventListener("messengerDialog", function (event) {
    if (event.detail === "open") {
        window.FB.CustomerChat.showDialog();
        chatroot.style.visibility = "visibile";
    } else {
        FB.CustomerChat.hideDialog();
        chatroot.style.visibility = "hidden";
    };
});

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));