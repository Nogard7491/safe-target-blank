/**
 * Opens external links in a new "safe" window.
 */
;(function () {

    /**
     * Attach an event handler.
     *
     * @param event Event
     * @param element Element
     * @param handler Handler
     */
    function addEvent(event, element, handler) {
        if (element.addEventListener) {
            element.addEventListener('click', openSafeWindow, false)
        } else {
            element.attachEvent('on' + event, openSafeWindow);
        }
    }

    /**
     * Attach the document onload event.
     *
     * @param e Event
     */
    function onDocumentReady(e) {
        addEvent('click', document.body, openSafeWindow);
    }

    /**
     * Open "safe" window if target is a link with data-target attribute.
     *
     * @param e Event
     */
    function openSafeWindow(e) {

        var node,
            bool,
            safeWindow;

        node = e.target || e.srcElement;
        while (node != null && node !== document.body) {

            bool = (
                node.tagName != null &&
                node.tagName.toLowerCase() == 'a' &&
                node.hasAttribute('data-target') &&
                node.getAttribute('data-target') == '_blank' &&
                node.hasAttribute('href')
            );

            if (bool) {

                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }

                safeWindow = window.open();
                safeWindow.opener = null;
                safeWindow.location = node.getAttribute('href');

                break;
            }
            node = node.parentNode;
        }
    }

    addEvent('load', document, onDocumentReady);
})();