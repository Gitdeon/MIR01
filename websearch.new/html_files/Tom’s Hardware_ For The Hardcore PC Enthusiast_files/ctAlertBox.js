/**
 * Created by tlist on 9/28/17.
 */

var sCookie = '';

(function () {

    function createCookie(CookieName, value, days) {
        var expires;
        if (!days) {
            days = 365 * 3;
        }

        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = CookieName + "=" + value + "; expires=" + date.toGMTString() + "; path=/";

    }


// Read cookie
    function readCookie(CookieName) {
        var CookieNameEQ = CookieName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(CookieNameEQ) === 0) {

                return c.substring(CookieNameEQ.length, c.length);
            }
        }
        return '';
    }


    var ctAlertBox = function (AlertBoxMessage, AlertBoxPlacement, Selector, CookieName, callback, Zindex, CookieDays) {

        var template =
            '<style>' +
            '.alertBoxMessage {' +
            'position : relative;' +
            ' z-index : ' + Zindex + ';' +
            ' cursor: pointer;' +
            '}' +
            '.tosCookieMessage { ' +
            'width: 100%;' +
            ' margin : 0;' +
            ' position: fixed;' +
            ' left: 0;' +
            ' right: 0;' +
            ' bottom: 0;' +
            ' }' +
            '.tosCookieMessage .alertBoxContainer {' +
            'min-height: 80px;' +
            'width : 990px;' +
            ' margin : 0 auto;' +
            ' background-color: #DDD;' +
            ' border: 1px solid #EEEEEE;' +
            ' padding: 3px 10px;' +
            ' box-shadow: 0 0 20px 0 rgba(0, 0, 0, .5);' +
            ' z-index: 999999;' +
            ' box-sizing: border-box;' +
            ' -moz-box-sizing: border-box;' +
            ' -webkit-box-sizing: border-box;' +
            ' } ' +
            '.forum-section .tosCookieMessage .alertBoxContainer, .faq-section .tosCookieMessage .alertBoxContainer { ' +
            'width : 1400px;' +
            ' }' +
            '.tosCookieMessage #close-btn{' +
            'cursor: pointer;' +
            ' }' +
            '@media screen and (min-width: 0px) and (max-width: 950px) {' +
            ' .tosCookieMessage .alertBoxContainer { ' +
            'width : auto;' +
            ' }' +
            ' .forum-section .alertCookieMessage .alertBoxContainer, .faq-section .tosCookieMessage .alertBoxContainer { ' +
            'width : auto;' +
            ' } ' +
            '}' +
            '</style>' +
            '<div class="alertBoxMessage">' +
            '<div class="tosCookieMessage" id="' + CookieName + '">' +
            '<div class="alertBoxContainer line">' +
            '<div class="spaceL5 line">' +
            '<a class="close-btn" title="Close" id="unitR"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94DGQovAwjTWTsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAf0lEQVQoz42QsQ2AMAwETxEVG7BQ2CQtC7AIyha0TMIiUELjQGQehKUUed9JtuGuDl0yT8AGRJdHy5OHD3t7JUX7l94lTVVYpNHBh3EABCC7pn/ZOP5ID7hU/yL0Co5iZnWIV3j9kmYxcyN2movQAotYsD7EYhy1NIhrBMsv+AR/E0dSf0dzTQAAAABJRU5ErkJggg==" /></a>' +
            '<p class="lastUnit"><span class="spaceR5" style="font-family: Helvetica,Oswald,sans-serif;">' + AlertBoxMessage + '</span></p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        sCookie = readCookie(CookieName);


        if (sCookie === 'false') {
            var ctAlert = document.querySelector('body');
            ctAlert.insertAdjacentHTML('beforeend', template);
        }

        function closeAlert() {
            createCookie(CookieName, 'true');
            callback('/');
            var overlayElement = document.querySelector(".alertBoxMessage");
            overlayElement.setAttribute('style', 'display:none');
            document.body.style.overflow = '';
        }

        var closeBtn = document.querySelector('.tosCookieMessage .close-btn');

        if (closeBtn) {
            closeBtn.onclick = function (e) {
                closeAlert();
            };
        }
    };


    window.Purch = window.Purch || {};
    window.Purch.ctAlertBox = ctAlertBox;
})();
