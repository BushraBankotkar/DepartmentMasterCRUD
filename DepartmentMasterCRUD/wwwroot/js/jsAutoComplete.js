
//------ AutoComplete Load--------//
var SelectAutoComplete = function () {

    return {
        LoadSelectByAutoComplete: function ($$Control, dataUrl, isChange, dataValue, dataText) {
            LoadAutoCompleteSelect($$Control, dataUrl, isChange, dataValue, dataText);
        },
        LoadFunction: function ($url) {
            return returnData = CallWebFunction($url);
        },
        LoadAutoCompleteParamSelect: function ($$Control, dataUrl, $$DepControl, isChange, dataValue, dataText) {
            LoadAutoCompleteParamSelect($$Control, dataUrl, $$DepControl, isChange, dataValue, dataText);
        },
        LoadAutoCompleteTwoParamSelect: function ($$Control, dataUrl, $$DepControl1, $$DepControl2, isChange, dataValue, dataText) {
            LoadAutoCompleteTwoParamSelect($$Control, dataUrl, $$DepControl1, $$DepControl2, isChange, dataValue, dataText);
        },
        LoadAutoCompleteMultiParamSelect: function ($$Control, dataUrl, $$DepControl, isChange, dataValue, dataText) {
            LoadAutoCompleteMultiParamSelect($$Control, dataUrl, $$DepControl, isChange, dataValue, dataText);
        }
    };
}();

function CallAjaxGetRequest(urlLink, requestData) {
    var returnData = '';
    $.ajax({
        async: false,
        url: urlLink,
        type: "get",
        dataType: "json",
        data: { prefix: requestData, MenuId: $('#hdnClickMenuId').val()  },
        success: function (data) {
            returnData = data;
        },
        error: function (xhr, status, error) {
        }
    });
    return returnData;
}
function CallAjaxGetRequestParam(urlLink, requestData, param) {
    requestData = { prefix: requestData, MenuId: $('#hdnClickMenuId').val()  };
    var result = {};
    $.extend(result, requestData, param);
    var returnData = '';
    $.ajax({
        async: false,
        url: urlLink,
        type: "get",
        dataType: "json",
        data: result,
        success: function (data) {
            returnData = data;
            //console.log("success");
        },
        error: function (xhr, status, error) {
            //console.log("error");
        }
    });
    return returnData;
}

function LoadAutoCompleteSelect($$Control, dataUrl, isChange, dataValue, dataText) {
    if (typeof (isChange) === 'undefined') isChange = false;
    if (typeof (dataText) === 'undefined') dataText = 'Text';
    if (typeof (dataValue) === 'undefined') dataValue = 'Value';

    var ControlId = $$Control.attr('id');
    if (typeof (ControlId) != 'undefined') {
        ControlId = ControlId.substring(4);
        //var $auto = jQuery.noConflict();
        $($$Control).autocomplete({
            source: function (request, response) {
                var AjxData = CallAjaxGetRequest(dataUrl, request.term);
                response($.map(AjxData, function (item) {
                    return {
                        label: item[dataText],
                        id: item[dataValue]
                    };
                }))
            },
            change: function (event, ui) {
                if (ui.item != null) {
                    if (ui.item.id == '0') {
                        $$Control.val('');
                        $('#' + ControlId).val('');
                    }
                }
                else {
                    $$Control.val('');
                    $('#' + ControlId).val('');
                }
            },
            select: function (e, i) {
                var value = i.item.label;
                var id = i.item.id;
                $$Control.val(value);
                $('#' + ControlId).val(id);
                if (isChange) {
                    $('#' + ControlId).val(id)
                        .trigger('change');
                }
            }
        })
        .bind('focus', function (focus) {
            var self = this;
            jQuery(self).autocomplete("search", " ");;
            ///$(this).autocomplete("search");
        });
    }
};

function LoadAutoCompleteParamSelect($$Control, dataUrl, $$DependendControl, isChange, dataValue, dataText) {

    if (typeof (isChange) === 'undefined') isChange = false;
    if (typeof (dataText) === 'undefined') dataText = 'Text';
    if (typeof (dataValue) === 'undefined') dataValue = 'Value';


    var ControlId = $$Control.attr('id');
    ControlId = ControlId.substring(4)
    //var $auto = jQuery.noConflict();
    $($$Control).autocomplete({
        source: function (request, response) {
            var prefix = request.term;
            var valueId = $$DependendControl.val();
            var param = { ConditionId: valueId, MenuId: $('#hdnClickMenuId').val()  };
            var AjxData = CallAjaxGetRequestParam(dataUrl, prefix, param);

            response($.map(AjxData, function (item) {
                return {
                    label: item[dataText],
                    id: item[dataValue]
                };
            }))
        },
        change: function (event, ui) {
            if (ui.item != null) {
                if (ui.item.id == '0') {
                    $$Control.val('');
                    $('#' + ControlId).val('');
                }
            }
            else {
                $$Control.val('');
                $('#' + ControlId).val('');
            }
            $('#' + ControlId)
                .trigger('change');
           // RemoveColour();

        },
        select: function (e, i) {
            var value = i.item.label;
            var id = i.item.id;

            $$Control.val(value);
            $('#' + ControlId).val(id);
            if (isChange) {
                $('#' + ControlId).val(id)
                    .trigger('change');
            }
            //RemoveColour();
            //alert(i.item.id);

        }
    })
        .bind('focus', function (focus) {
            var self = this;
            jQuery(self).autocomplete("search", " ");
            ///$(this).autocomplete("search");
        });
};
//------ End ---------//

//----- Call Post Function ----//
function CallWebFunction(webfunction) {
    var returnData = '';
    $.ajax({
        async: false,
        url: webfunction,
        type: 'POST',
        //data: {},
        success: function (data) {
            returnData = JSON.parse(data);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
    return returnData;
}
 
function LoadAutoCompleteTwoParamSelect($$Control, dataUrl, $$DependendControl1, $$DependendControl2, isChange, dataValue, dataText) {

    if (typeof (isChange) === 'undefined') isChange = false;
    if (typeof (dataText) === 'undefined') dataText = 'Text';
    if (typeof (dataValue) === 'undefined') dataValue = 'Value';
     
    var ControlId = $$Control.attr('id');
    ControlId = ControlId.substring(4)
    //var $auto = jQuery.noConflict();
    $($$Control).autocomplete({
        source: function (request, response) {
            var prefix = request.term;
            var valueId1 = $$DependendControl1.val();
            var valueId2 = $$DependendControl2.val();
            var param = { ConditionId1: valueId1, ConditionId2: valueId2, MenuId: $('#hdnClickMenuId').val()  };
            var AjxData = CallAjaxGetRequestParam(dataUrl, prefix, param);

            response($.map(AjxData, function (item) {
                return {
                    label: item[dataText],
                    id: item[dataValue]
                };
            }))
        },
        change: function (event, ui) {
            if (ui.item != null) {
                if (ui.item.id == '0') {
                    $$Control.val('');
                    $('#' + ControlId).val('');
                }
            }
            else {
                $$Control.val('');
                $('#' + ControlId).val('');
            }
            RemoveColour();

        },
        select: function (e, i) {
            var value = i.item.label;
            var id = i.item.id;

            $$Control.val(value);
            $('#' + ControlId).val(id);
            if (isChange) {
                $('#' + ControlId).val(id)
                    .trigger('change');
            }
            RemoveColour();
            //alert(i.item.id);

        }
    }).bind('focus', function (focus) {
        var self = this;
        $(self).autocomplete("search", " ");;
        ///$(this).autocomplete("search");
    });
};

function LoadAutoCompleteMultiParamSelect($$Control, dataUrl, $$DependendControl, isChange, dataValue, dataText) {

    if (typeof (isChange) === 'undefined') isChange = false;
    if (typeof (dataText) === 'undefined') dataText = 'Text';
    if (typeof (dataValue) === 'undefined') dataValue = 'Value';

    var ControlId = $$Control.attr('id');
    ControlId = ControlId.substring(4) 
    $($$Control).autocomplete({
        source: function (request, response) {
            var prefix = request.term;
            let result = {};
            let filterXml = '', contValue = -1;
            $.each($$DependendControl, function (index, elememt) {
                if ($('#' + elememt.Control).prop('type') != undefined) {
                    if (elememt.Key != 'PaymentCycle') {
                        contValue = ~~$('#' + elememt.Control).val();
                        contValue = contValue > 0 ? contValue : -1;
                    }
                    else {
                        contValue = $('#' + elememt.Control).val();
                    }
                }
                else {
                    contValue = elememt.Control;
                }
                filterXml += "<Detail Key='" + elememt.Key + "'  Value='" + contValue + "' ></Detail>";
                //$.extend(result, { condion: $(value).val() });
            })
            //var valueId1 = $$DependendControl1.val();
            //var valueId2 = $$DependendControl2.val();
            var param = { Filter: filterXml, MenuId: $('#hdnClickMenuId').val() };
            //result = $.extend(result, param);
            var AjxData = CallAjaxGetRequestParam(dataUrl, prefix, param);

            response($.map(AjxData, function (item) {
                return {
                    label: item[dataText],
                    id: item[dataValue]
                };
            }))
        },
        change: function (event, ui) {
            if (ui.item != null) {
                if (ui.item.id == '0') {
                    $$Control.val('');
                    $('#' + ControlId).val('');
                }
            }
            else {
                $$Control.val('');
                $('#' + ControlId).val('');
            }
            $('#' + ControlId)
                .trigger('change');
            RemoveColour();

        },
        select: function (e, i) {
            var value = i.item.label;
            var id = i.item.id;

            $$Control.val(value);
            $('#' + ControlId).val(id);
            if (isChange) {
                $('#' + ControlId).val(id)
                    .trigger('change');
            }
            RemoveColour();
            //alert(i.item.id);

        }
    }).bind('focus', function (focus) {
        var self = this;
        $(self).autocomplete("search", " ");;
        ///$(this).autocomplete("search");
    });
};