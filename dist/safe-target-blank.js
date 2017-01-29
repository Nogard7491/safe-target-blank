;(function () {

    /**
     * Устанавливает обработчик события.
     *
     * @param event событие
     * @param element элемент
     * @param handler обработчик события
     */
    function addEvent(event, element, handler) {
        if (element.addEventListener) {
            element.addEventListener('click', openSafeWindow, false)
        } else {
            element.attachEvent('on' + event, openSafeWindow);
        }
    }

    /**
     * Устанавливает обработчик события загрузки документа.
     *
     * @param e событие
     */
    function onDocumentReady(e) {
        addEvent('click', document.body, openSafeWindow);
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