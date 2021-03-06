;(function () {

    /**
     * Обработчик события загрузки документа.
     *
     * @param e событие
     */
    function onDocumentReady(e) {
        if (window.document.body.addEventListener) {
            window.document.body.addEventListener('click', openSafeWindow, false)
        } else {
            window.document.body.attachEvent('onclick', openSafeWindow);
        }
    }

    /**
     * Открывает новое и безопасное окно при клике на ссылку с data-target атрибутом.
     * Значение атрибута должно быть "_blank".
     *
     * @param e событие
     */
    function openSafeWindow(e) {

        var node,
            bool,
            safeWindow;

        node = e.target || e.srcElement;
        while (node != null && node !== window.document.body) {

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

    if (window.document.addEventListener) {
        window.document.addEventListener('DOMContentLoaded', onDocumentReady , false);
    } else {
        window.document.attachEvent('onreadystatechange', onDocumentReady);
    }
})();