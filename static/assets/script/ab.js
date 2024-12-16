const isInsideFrame = (() => {
    try {
        return window.self !== window.parent;
    } catch {
        return true;
    }
})();

if (!isInsideFrame && !/Firefox/.test(navigator.userAgent)) {
    const newWindow = window.open("about:blank", "popupWindow");

    if (!newWindow || newWindow.closed) {
        alert("Popup blocked! Please enable popups and reload the page to proceed. By continuing, you accept our terms.");
    } else {
        const doc = newWindow.document;

        const iframeElement = doc.createElement("iframe");
        iframeElement.src = document.location.href;
        iframeElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;";

        const windowTitle = sessionStorage.getItem("siteTitle") || "NASA";
        const favicon = sessionStorage.getItem("siteFavicon") || "https://www.nasa.gov/wp-content/plugins/nasa-hds-core-setup/assets/favicons/apple-touch-icon-72x72.png";

        doc.title = windowTitle;

        const faviconLink = doc.createElement("link");
        faviconLink.rel = "icon";
        faviconLink.href = favicon;
        doc.head.appendChild(faviconLink);

        doc.body.style.margin = "0";
        doc.body.style.overflow = "hidden";
        doc.body.appendChild(iframeElement);
        document.location.href = "https://www.google.com/search?q=what+is+the+next+nasa+mission";
    }
}
