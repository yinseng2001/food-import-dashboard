/*
* @Author: yinseng
* @Date:   2016-10-25 11:10:55
* @Last Modified by:   yinseng
* @Last Modified time: 2016-10-26 10:17:46
*/


(function() {

    app.service('caret', ['$http', '$rootScope', '$window', function($http, $rootScope, $window) {

        var public_method = {

            getCaretPosition: function(editableDiv) {
                var caretPos = 0,
                    sel, range;
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        if (range.commonAncestorContainer.parentNode == editableDiv) {
                            caretPos = range.endOffset;
                        }
                    }
                } else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    if (range.parentElement() == editableDiv) {
                        var tempEl = document.createElement("span");
                        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
                        var tempRange = range.duplicate();
                        tempRange.moveToElementText(tempEl);
                        tempRange.setEndPoint("EndToEnd", range);
                        caretPos = tempRange.text.length;
                    }
                }
                return caretPos;
            },
            setCaret: function(id, pos) {
                var el = document.getElementById(id);
                var range = document.createRange();
                var sel = window.getSelection();
                range.setStart(el.childNodes[0], pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                el.focus();
            },
            insertTextAtCursor: function(text) {
                var sel, range, html;
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();
                        range.insertNode(document.createTextNode(text));
                    }
                } else if (document.selection && document.selection.createRange) {
                    document.selection.createRange().text = text;
                }
            }


        };

        return public_method;
    }]);

}());