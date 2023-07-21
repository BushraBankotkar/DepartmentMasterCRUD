var DateMonth = [{ MonthId: 0, MonthName: 'Jan' },
{ MonthId: 1, MonthName: 'Feb' },
{ MonthId: 2, MonthName: 'Mar' },
{ MonthId: 3, MonthName: 'Apr' },
{ MonthId: 4, MonthName: 'May' },
{ MonthId: 5, MonthName: 'Jun' },
{ MonthId: 6, MonthName: 'Jul' },
{ MonthId: 7, MonthName: 'Aug' },
{ MonthId: 8, MonthName: 'Sep' },
{ MonthId: 9, MonthName: 'Oct' },
{ MonthId: 10, MonthName: 'Nov' },
{ MonthId: 11, MonthName: 'Dec' }
]


var validateCalled = false;

$(function () {
    if (!$('.aspNetDisabled').hasClass('form-control')) {
        $('.aspNetDisabled').addClass('form-control');
    }
    /*
    $('.reqiredTextbox').on('keyup change', RemoveColour);
    $('.Numbers').keydown(function (event) {
        OnlyNNumber(event);
    });
    $('.decimalNumber').keypress(function (event) {
        return DecimalNumber(event, this)
    });

    $('.NumberWithNegative').keypress(function (event) {
         NumberPostiveNegative(event, this)
    });

    $('.DecimalNumberWithNegative').keypress(function (event) {
        NumberPostiveNegativeWithDecimal(event, this)
    });
     
    $('.NumberWithNegative,.DecimalNumberWithNegative').keyup(function (event) {
         ReplaceNegative(event, this); 
    }); 

    $('.Numbers,.decimalNumber,.NumberWithNegative,.DecimalNumberWithNegative').bind('cut copy paste', function (e) {
        e.preventDefault();
    }); 
    $('.alphNumber').blur(function (event) {
        OnlyAlpaNumeric(event);
    }); */
    ShowDetails();

});

$(window).load(function () {
    waitForLoading();
    $('.Numbers,.decimalNumber').attr('maxlength', '16');
});




$(document).on('keyup change', '.reqiredTextbox', RemoveColour);
$(document).on('keypress', '.Numbers', function (event) {
    //OnlyNNumber(event);
    return OnlyNNumber(event, this);
});
$(document).on('keypress', '.decimalNumber', function (event) {
    return DecimalNumber(event, this);
});

$(document).on('keypress', '.NumberWithNegative', function (event) {
    NumberPostiveNegative(event, this);
});

$(document).on('keypress', '.DecimalNumberWithNegative', function (event) {
    NumberPostiveNegativeWithDecimal(event, this);
});

$(document).on('keyup', '.NumberWithNegative,.DecimalNumberWithNegative', function (event) {
    ReplaceNegative(event, this);
});

$(document).on('cut copy paste', '.Numbers,.decimalNumber,.NumberWithNegative,.DecimalNumberWithNegative', function (e) {
    e.preventDefault();
});
$(document).on('keypress', '.alphNumber', function (e) {
    var keyCode = e.keyCode || e.which;
    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9\s]+$/;
    //Validate TextBox value against the Regex.
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        //messsage
    }
    return isValid;
     
    ////OnlyAlpaNumeric(event);
});

$(document).on('keypress', '.Numbers,.decimalNumber,.NumberWithNegative,DecimalNumberWithNegative', function () {
    var isExists = $(this).attr('maxlength');
    if (typeof isExists == typeof undefined || isExists == false) {
        $(this).attr('maxlength', '18');
    }
});

//$(document).on('change', 'div.radio', function () {
//}
//));





$(document).on('change', '.form_date,.popUpDisable', function (e) {
    $('form').data('changed', true);
    RemoveColour()
});

//$(document).on('keyup', $('div.divCkedior').find('iframe').contents().find('body'), function (e) {
//    alert('hi aaa');
//});





//$(document).on('blur', '.time_pick>input', function (e) { 
//    alert('hi');
//    //$('form').data('changed', true);
//    //RemoveColour()
//});


function waitForLoading() {
    var IsCkeditorExists = $('textarea.ckeditor');
    if (IsCkeditorExists.length > 0) {
        var CkCOntent = $('div.divCkedior').find('iframe').contents().find('body');
        if (CkCOntent.length > 0) {
            $(CkCOntent).keyup(function (e) {
                $('form').data('changed', true);
                RemoveColour();

            });
        } else {
            window.setTimeout(function () { waitForLoading(); }, 100);
        }
    }
}



$(document).on('blur', '.ValidEmail', function () {

    var $$this = $(this);
    if ($$this.hasClass('reqiredTextbox')) {
        if ($$this.val() != '') {
            if (validateEmail($$this)) {
                //ShowRequiredMessage();
            }
        }
    }
    else {
        validateEmail($$this);
    }


});

$(document).on('blur', '.ValidPancard', function () {
    var $$this = $(this);
    if ($$this.hasClass('reqiredTextbox')) {
        if ($$this.val() != '') {
            if (ValidatePAN($$this)) {
                ShowRequiredMessage();
            }
        }
    }
    else {
        ValidatePAN($$this);
    }
});

$(document).on('blur', '.ValidIfsc', function () {
    var $$this = $(this);
    if ($$this.hasClass('reqiredTextbox')) {
        if ($$this.val() != '') {

            if (validateIfsc($$this)) {
                ShowRequiredMessage();
            }

        }
    }
    else {
        validateIfsc($$this);
    }
});

$(document).on('blur', '.ValidUrl', function () {
    var $$this = $(this);
    if ($$this.hasClass('reqiredTextbox')) {
        if ($$this.val() != '') {

            if (validateurl($$this)) {
                ShowRequiredMessage();
            }
        }
    }
    else {
        validateurl($$this);
    }
});


function ShowRequiredMessage() {
    var sss = $('.reqiredTextbox').attr('style');
    if (sss != undefined) {
        if (!Validate()) {
            errorMessage(ErrorRequiredId);
        }
    }
}

function RemoveColour() {
    $('.reqiredTextbox').not('div.radio.reqiredTextbox')
        .not('textarea.ckeditor.reqiredTextbox').each(function () {
            if ($.trim($(this).val()) != '') {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });


    $('.reqiredTextbox.AutoComplete').each(function () {
        var $$thisControl = $(this);
        var $id = $$thisControl.attr('id');
        if ($.trim($(this).val()) != '') {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });

    $('select.multipleSelect.reqiredTextbox').each(function () {
        var $$thisControl = $(this).parent('div');
        if ($.trim($(this).val()) != '') {
            $$thisControl.css({
                "border": "",
                "background": ""
            });
        }
    });

    $('select.fstElement.reqiredTextbox').each(function () {
        var $$thisControl = $(this).parent('div');
        if ($.trim($(this).val()) != '') {
            $$thisControl.css({
                "border": "",
                "background": ""
            });
        }
    });

    $('div.radio.reqiredTextbox').each(function () {
        var radiolength = $(this).find('[type=radio]:checked').length;
        if (radiolength > 0) {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });


    $('textarea.ckeditor.reqiredTextbox').each(function () {
        var $$this = $(this).siblings('div:eq(0)');
        var editorvalue = $$this.find('iframe').contents().find('body').html();
        if ($.trim(editorvalue) != '' && $.trim(editorvalue) != '<p><br></p>') {
            $$this.css({
                "border": "",
                "background": ""
            });
        }

    });

    if (RemoveMessage()) {
        DisableMessage();
    }


}


function RemoveMessage() {
    var isValid = true;
    requiredId = 0;

    $('.reqiredTextbox').not('div.radio.reqiredTextbox').
        not('textarea.ckeditor.reqiredTextbox').each(function () {
            if ($.trim($(this).val()) == '') {
                isValid = false;
            }
        });
    $('.reqiredTextbox.AutoComplete').each(function () {
        var $$thisControl = $(this);
        var $id = $$thisControl.attr('id');
        if ($.trim($(this).val()) == '') {
            isValid = false;

        }
    });

    $('select.multipleSelect.reqiredTextbox').each(function () {
        var $$thisControl = $(this).parent('div');
        if ($.trim($(this).val()) == '') {
            isValid = false;
        }
    });

    $('div.radio.reqiredTextbox').each(function () {
        var radiolength = $(this).find('[type=radio]:checked').length;
        if (radiolength == 0) {
            isValid = false;
        }
    });


    $('textarea.ckeditor.reqiredTextbox').each(function () {
        var $$this = $(this).siblings('div:eq(0)');
        var editorvalue = $$this.find('iframe').contents().find('body').html();
        if ($.trim(editorvalue) == '' || $.trim(editorvalue) == '<p><br></p>') {
            isValid = false;
        }

    });


    return isValid;

}

function FormValidateByClass(divClass) {
    var isValid = true;
    requiredId = 0;

    $('.' + divClass + ' .reqiredTextbox').each(function () {
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $(this).css({
                "border": "1px solid red",
                "background": ""
            });
            $(this).not('.popUpDisable').focus();
            requiredId = ErrorRequiredId;
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });

        }
    });
    return isValid
}

function RemoveColorByDivId(divId) {
    $('#' + divId + ' .reqiredTextbox').each(function () {
        $(this).val('')
        $(this).css({
            "border": "",
            "background": ""
        });
    });
}
var requiredId;
function Validate() {
    var isValid = true;
    requiredId = 0;

    $('.reqiredTextbox').
        not('div.radio.reqiredTextbox').
        not('textarea.ckeditor.reqiredTextbox').
        each(function () {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": ""
                });
                //$(this).not('.popUpDisable,.AutoComplete,.subTime').focus();
                requiredId = ErrorRequiredId;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });

            }
        });


    $('.reqiredTextbox.AutoComplete').each(function () {
        var $$thisControl = $(this);
        var $id = $$thisControl.attr('id');
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $(this).css({
                "border": "1px solid red",
                "background": ""
            });
            //$(this).focus();
            requiredId = ErrorRequiredId;
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });

        }
    });

    $('select.multipleSelect.reqiredTextbox').each(function () {
        var $$thisControl = $(this).parent('div');
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $$thisControl.css({
                "border": "1px solid red",
                "background": ""
            });
            $$thisControl.focus();
            requiredId = ErrorRequiredId;
        }
        else {
            $$thisControl.css({
                "border": "",
                "background": ""
            });

        }
    });

    $('div.radio.reqiredTextbox').each(function () {
        var radiolength = $(this).find('[type=radio]:checked').length;
        if (radiolength == 0) {
            isValid = false;
            $(this).css({
                "border": "1px solid red",
                "background": ""
            });
            $(this).focus();
            requiredId = ErrorRequiredId;
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });

    $('textarea.ckeditor.reqiredTextbox').each(function () {
        var $$this = $(this).siblings('div:eq(0)');
        var editorvalue = $$this.find('iframe').contents().find('body').html();
        if ($.trim(editorvalue) == '' || $.trim(editorvalue) == '<p><br></p>') {
            isValid = false;
            $$this.css({
                "border": "1px solid red",
                "background": ""
            });

            requiredId = ErrorRequiredId;
        }
        else {
            $$this.css({
                "border": "",
                "background": ""
            });

        }
    });

    return isValid;
}

var emailid;
function validateEmail(emailField) {
    emailid = 0;
    var emailValue = emailField.val();
   // var reg = /^([a-zA-Z])+([a-zA-Z0-9_.+-])+\@(([a-zA-Z])+\.+?(com|co|in|org|net|edu|info|gov|vekomy))\.?(com|co|in|org|net|edu|info|gov)?$/;
    var reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if ($.trim(emailValue) != '') {
        if (reg.test(emailValue) == false) {
            $(emailField).css({
                "border": "1px solid red",
                "background": ""
            });
            emailid = ErrorInValidEmail;
            errorMessage(emailid);
            return false;
        }
        else {

            $(emailField).css({
                "border": "",
                "background": ""
            });
            DisableMessage();
        }
    } else {
        $(emailField).css({
            "border": "",
            "background": ""
        });
        DisableMessage();
    }

    return true;

}
var panId;
function ValidatePAN(PanField) {
    var PANNo = PanField.val();
    if ($.trim(PANNo) != '') {
        var ObjVal = PANNo;
        var panPattern = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        var matchArray = ObjVal.match(panPattern);
        if (matchArray == null) {
            $(PanField).css({
                "border": "1px solid red",
                "background": ""
            });
            panId = ErrorPanCard;
            errorMessage(panId);
            return false;
        }
        else {
            $(PanField).css({
                "border": "",
                "background": ""
            });
            DisableMessage();
        }
    }
    else {
        $(PanField).css({
            "border": "",
            "background": ""
        });
        DisableMessage();
    }
    return true;
};
var ifscId
function validateIfsc(ifscField) {
    ifscId = 0;
    var IiscValue = ifscField.val();
    var reg = /^[A-Za-z]{4}\d{7}$/;
    if ($.trim(IiscValue) != '') {
        if (reg.test(IiscValue) == false) {
            $(ifscField).css({
                "border": "1px solid red",
                "background": ""
            });
            ifscId = ErrorIfsc;
            errorMessage(ifscId);
            return false;
        }
        else {
            $(ifscField).css({
                "border": "",
                "background": ""
            });
            DisableMessage();
        }
    } else {
        $(ifscField).css({
            "border": "",
            "background": ""
        });
        DisableMessage();
    }

    return true;

}
var urlId;
function validateurl(urlField) {
    urlId = 0;
    var urlcValue = urlField.val();
    //return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    var reg = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;
    //var reg = new RegExp( "^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
    if ($.trim(urlcValue) != '') {
        if (reg.test(urlcValue) == false) {
            $(urlField).css({
                "border": "1px solid red",
                "background": ""
            });
            urlId = ErrorUrl;
            errorMessage(urlId);
            return false;
        }
        else {
            $(urlField).css({
                "border": "",
                "background": ""
            });
            DisableMessage();
        }
    } else {
        $(urlField).css({
            "border": "",
            "background": ""
        });
        DisableMessage();
    }

    return true;

}
function CheckValidData() {
    var errorId = 0;
    if (!Validate()) {
        errorId = requiredId;
        return errorId;
    }
    $(".ValidEmail").each(function () {
        var $$this = $(this);;
        if (!validateEmail($$this)) {
            errorId = ErrorInValidEmail;
            return errorId;
        }
    });
    $(".ValidPancard").each(function () {
        var $$this = $(this);;
        if (!ValidatePAN($$this)) {
            errorId = ErrorPanCard;
            return errorId;
        }
    });
    $(".ValidIfsc").each(function () {
        var $$this = $(this);;
        if (!validateIfsc($$this)) {

            errorId = ErrorIfsc;
            return errorId;
        }
    });
    $(".ValidUrl").each(function () {
        var $$this = $(this);;
        if (!validateurl($$this)) {
            errorId = ErrorUrl;
            return errorId;
        }
    });



    return errorId;
}

$(".ValidateImage").change(function () {
    var a = "";
    var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        $(this).val(a);
        $('#ImageError').show();
        $('#Newsimage').hide();
        return false;
    } else {
        $('#ImageError').hide();
        $('#Newsimage').show();
        return true;
    }
});




function OnlyAlpaNumeric(e) {
    var k;
    document.all ? k = e.keycode : k = e.which;
    return ((k > 47 && k < 58) || (k > 64 && k < 91) || (k > 96 && k < 123) || k == 0 || k == 32);
}
function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32)
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}



function OnlyNNumber(e, element) {
    //if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 || //110
    //    // Allow: Ctrl+A, Command+A , 190
    //    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    //    // Allow: home, end, left, right, down, up
    //    (e.keyCode >= 35 && e.keyCode <= 40)) {
    //    return
    //}
    //// Ensure that it is a number and stop the keypress
    //if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    //    e.preventDefault();
    //}
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
}

//decimal Number
function DecimalNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 8) {
    }
    else if ((charCode != 46 || $(element).val().indexOf('.') != -1) &&
        (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
    }
    return true;
}


function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        evt.preventDefault();
    return true;
}




function CheckingNegative(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode == 45 && $(element).val().indexOf('-') == 0) ||
        ($(element).val().length > 1 && charCode == 45)) {
        evt.preventDefault();
    }
    return true;
}



function NumberPostiveNegative(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE. 
        (charCode < 48 || charCode > 57))
        evt.preventDefault();

    return true;
}



function NumberPostiveNegativeWithDecimal(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&
        (charCode < 48 || charCode > 57))
        evt.preventDefault();
    return true;
}




function ReplaceNegative(event, element) {
    var $$this = $(element).val();
    //alert($$this);
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode == 189 && $$this.indexOf('-') > 0) {
        value = $$this.replace('-', '');
        $(element).val(value);
        event.preventDefault();
    }
}

function ReplaceDecimal(event, element) {
    var $$this = $(element).val();
    //alert($$this);
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode == 189 && $$this.indexOf('.') == 0) {
        value = $$this.replace('.', '');
        $(element).val(value);
        event.preventDefault();
    }
}

function strToDate(str) {
    try {
        var array = str.split('-');
        var year = parseInt(array[2]);
        var month = parseInt(array[1]);
        var day = array.length > 2 ? parseInt(array[0]) : 1;
        if (year > 0 && month >= 0) {
            return new Date(year, month - 1, day);
        } else {
            return null;
        }
    } catch (err) { }; // just throw any illegal format
};

function strToDateFormat(str) {
    try {
        var array = str.split('-');
        var year = parseInt(array[2]);
        var monthname = array[1];
        var monthdtl = $.grep(DateMonth, function (details) {
            return details.MonthName == monthname;
        });
        var month = monthdtl[0].MonthId;

        var day = array.length > 2 ? parseInt(array[0]) : 1;
        if (year > 0 && month >= 0) {
            return new Date(year, month, day);
        } else {
            return null;
        }
    } catch (err) { }; // just throw any illegal format
};

function Checkdata() {
    var isValid = true;
    validateCalled = true;
    $('.checkdata').each(function () {
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $(this).css({
                "border": "1px solid red",
                "background": ""
            });
            $(this).focus();

        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });
    validateCalled = false;
    return isValid;
}

function CheckDate(fromDate, toDate, lblId) {
    $('#' + lblId).text('');
    var dtFromDate = strToDate(fromDate);
    var dtToDate = strToDate(toDate);
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (dtFromDate < today) {
        $('#' + lblId).text('From-Date should be greater than today');
        return false;
    }
    if (dtFromDate < dtToDate) {
        return true;
    }
    else {
        $('#' + lblId).text('To-Date Should be greater than From-Date.');
        return false;
    }
}


var DateCompare = function (FromDate, ToDate, Errorid) {
    var errorID = 0;
    //var startDate = $('#' + fromDateId +'').val();
    //var endDate = $('#' + toDateId+'').val();
    // console.log(Date.parse(FromDate.val()));
    if ((Date.parse(FromDate.val()) > Date.parse(ToDate.val()))) {
        // alert("End date should be greater than Start date");
        ToDate.val('');
        errorID = Errorid;

    }
    else if ((Date.parse(FromDate.val()) == Date.parse(ToDate.val()))) {
        // alert("End date should be greater than Start date");
        ToDate.val('');
        errorID = Errorid;

    }
    return errorID;
};

// nikhikll 
var DateCompareNik = function (FromDate, ToDate, Errorid) {
    var errorID = 0;
    //var startDate = $('#' + fromDateId +'').val();
    //var endDate = $('#' + toDateId+'').val();
    // console.log(Date.parse(FromDate.val()));
    if ((Date.parse(FromDate.val()) > Date.parse(ToDate.val()))) {
        // alert("End date should be greater than Start date");
        FromDate.val('');
        errorID = Errorid;

    }
    else if ((Date.parse(FromDate.val()) == Date.parse(ToDate.val()))) {
        // alert("End date should be greater than Start date");
        FromDate.val('');
        errorID = Errorid;

    }
    return errorID;
};


var requiredTabId;
function ValidateTab() {
    var isValid = true;
    // validateCalled = true;
    requiredTabId = 0;
    //var count = $('.active .reqiredTextbox').length;
    var blankCount = 0;
    $('.active .reqiredTextbox').each(function () {
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $(this).css({
                "border": "1px solid red",
                "background": ""
            });
            //$(this).focus();
            $(this).not('.popUpDisable').focus();
            requiredTabId = ErrorRequiredId;

            blankCount += 1;
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });

        }

    });
    if (blankCount == 0)
        RemoveColour()

    return requiredTabId;
    //validateCalled = false;
    //return isValid;
}



//Need To change By Smith
//$(document).on('keyup change', '.active .reqiredTextbox', function () {
//    requiredTabId = 0;
//    //var count = $('.active .reqiredTextbox').length;
//    var blankCount = 0;
//    $('.active .reqiredTextbox').each(function () {
//        if ($.trim($(this).val()) == '') {
//            isValid = false;
//            //$(this).css({
//            //    "border": "1px solid red",
//            //    "background": ""
//            //});
//            //$(this).focus();
//            //requiredTabId = ErrorRequiredId;

//            blankCount += 1;
//        }
//    });
//    if (blankCount == 0) {
//        DisableMessage();
//        // console.log('ok');
//    }

//});



function ShowDetails() {
    $(".ShowDetail").each(function (index, element) {
        $('label[for="' + $(element).attr('id') + '"]').addClass('ShowDetail');

    });
}




function setTimeForm(strtime) {
    try {
        if (strtime.length > 0) {
            var dtTime = strtime.split(':');
            if (dtTime.length == 3) {
                var hrs = $.trim(dtTime[0]);
                var mi = $.trim(dtTime[1]);
                var secs = "00";
                var ttt = $.trim(dtTime[2]);
                var actualTime = hrs + ':' + mi + ':' + secs + ' ' + ttt;
                return actualTime;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    } catch (err) { }; // just throw any illegal format
};

function CalculateDifferenceintime(Starttime, Endtime) {
    var TempDate = '1 1 1970 ',
        StartTime = Starttime.replace(/ /g, ''),
        Starttime = StartTime.slice(0, 5) + ' ' + StartTime.slice(6, 8)
    EndTime = Endtime.replace(/ /g, ''),
        Endtime = EndTime.slice(0, 5) + ' ' + EndTime.slice(6, 8)

    //var StarttimetimeZone = Starttime.slice(6, 8);
    //var Starttimehour = Starttime.slice(0, 2);

    //if (StarttimetimeZone == "PM") {
    //    Starttimehour = parseInt(Starttimehour) + 12;
    //}
    //if (Starttimehour == 12 && StarttimetimeZone == "AM") {
    //    Starttimehour = 00;
    //}

    //var Starttimemin = Starttime.slice(3, 5);

    //var EndtimetimeZone = Endtime.slice(6, 8);
    //var Endtimehour = Endtime.slice(0, 2);
    //if (EndtimetimeZone == "PM") {
    //    Endtimehour = parseInt(Endtimehour) + 12;
    //}
    //if (Endtimehour == 12 && EndtimetimeZone == "AM") {
    //    Endtimehour = 00;

    //}

    //var Endtimemin = Endtime.slice(3, 5);
    //Endtime = Endtimehour + ":" + Endtimemin;
    //Startime = Starttimehour + ":" + Starttimemin;

    //GetMinute = (Date.parse(TempDate + Endtime) - Date.parse(TempDate + Startime)) / 1000 / 60;


    var diff = (new Date(TempDate + Endtime) - new Date(TempDate + Starttime));
    if (diff > 0) {
        diff = Math.abs(diff);
        var seconds = Math.floor(diff / 1000); //ignore any left over units smaller than a second
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        return (hours + " hrs " + minutes + " mins")
    }
    else {
        return '-1';
    }


    //var Gethours = Math.floor(GetMinute / 60);
    //var realmin = (GetMinute % 60) 
    //return (Gethours + ' hrs' + ' ' + realmin + ' mins'); 
}


function Convert24to12hour(time) {

    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    time[0] = time[0].toString().length == 1 ? ('0' + time[0]) : time[0];
    time.splice(3, 2, ": "); return time.join(' ');

}; //tConvert('18:10:00');;


// code added by khalid for validation of tabs

var isSubmitClicked = false;
function AlertTabError() {
    isSubmitClicked = true;
    $('#myTab li a').css('color', '');
    $('.reqiredTextbox').each(function () {
        if ($.trim($(this).val()) == '') {
            var tabid = $(this).closest('.tab-pane').attr('id');
            $('#myTab li a[href="#' + tabid + '"]').css('color', 'red');
            //$('.tab-pane').removeClass('active');
            //$(this).closest('form').closest('div[id^=tab_]').css('color', 'red');//.addClass('active');                
        }
    });
}
$(document).on('keyup change', '.active .reqiredTextbox', function () {
    var tabid = $(this).closest('.tab-pane').attr('id');
    if (isSubmitClicked)
        $('#myTab li a[href="#' + tabid + '"]').css('color', 'red');
    var blankCount = 0;
    $('div.tab-content div.active').find('.reqiredTextbox').each(function () {
        if ($.trim($(this).val()) == '') {
            blankCount += 1;
        }
    });
    if (blankCount == 0) {
        $('#myTab li a[href="#' + tabid + '"]').css('color', '');
    }
});

//end
function CalculateTimeDiffHours(startTime, endTime) {
    var Start = startTime.split(':')
    var StartHRS = parseInt(Start[0])
    var StartMin = parseInt(Start[1])

    var End = endTime.split(':')
    var endHRS = parseInt(End[0])
    var endMin = parseInt(End[1])
    var newStartHrs, newEndHRS, i = 0;
    if (endHRS <= StartHRS) {
        i = 2;
        newStartHrs = endHRS + ":" + endMin;
        newEndHRS = StartHRS + ":" + StartMin;
    }
    else {
        newStartHrs = StartHRS + ":" + StartMin;
        newEndHRS = endHRS + ":" + endMin;
        i = 1;
    }
    var diff = (new Date("1970-1-" + i + " " + newStartHrs) - new Date("1970-1-1 " + newEndHRS)) / 1000 / 60 / 60;
    return Math.abs(diff);
}


String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second parm
    var hours = Math.floor(sec_num / 3600);
    //  alert(hours);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    // var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    //if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes;
    return time;
}


function CalculateTimeDiffHourMin(startTime, endTime) {
    //var t1 = new Date();
    //var parts = time1.split(":");
    //t1.setHours(parts[0], parts[1]);
    //var t2 = new Date();
    //parts = time2.split(":");
    //t2.setHours(parts[0], parts[1]);
    // return (parseInt(Math.abs(t1.getTime() - t2.getTime()) / 1000)).toString().toHHMMSS();
    var Start = startTime.split(':')
    var StartHRS = (Start[0].trim())
    var StartMin = (Start[1].trim())
    var End = endTime.split(':')
    var endHRS = (End[0].trim())
    var endMin = (End[1].trim())
    var newStartHrs, newEndHRS, i = 0;
    if (startTime === "00:00" && endTime === "00:00") {
        newStartHrs = "00" + ":" + "00";
        newEndHRS = "00" + ":" + "00";
        i = 1;
    }
    else if (startTime === endTime) {
        newStartHrs = "00" + ":" + "00";
        newEndHRS = "00" + ":" + "00";
        i = 1;
    }
    else if (endHRS <= StartHRS) {
        i = 2;
        newStartHrs = endHRS + ":" + endMin;
        newEndHRS = StartHRS + ":" + StartMin;
    }
    else {
        newStartHrs = StartHRS + ":" + StartMin;
        newEndHRS = endHRS + ":" + endMin;
        i = 1;
    }
    return (parseInt(Math.abs(new Date("1970-1-" + i + " " + newStartHrs) - new Date("1970-1-1 " + newEndHRS))) / 1000).toString().toHHMMSS();
}

function validateDateFunction(FromDateID, ToDateID) {
    var isValid;
    var fromdate = FromDateID.val().replace('-', '/'),
        Todate = ToDateID.val().replace('-', '/');
    if (fromdate == '' && Todate != '') { errorMessage(StartDateEnd); return isValid = false; }
    else if (Todate == '' && fromdate != '') { return isValid = false; }
    else if (fromdate == '' && Todate == '') { return isValid = true; }
    else if (DateCompare(FromDateID, ToDateID, StartDateEnd) > 0) { errorMessage(StartDateEnd); return isValid = false; }
    else { return isValid = true; }
}

function CheckValidDataForSide(frmId) {
    var errorId = 0;
    if (!ValidateForm(frmId)) {
        errorId = requiredId;
        return errorId;
    }
    $("#" + frmId + " .ValidEmail").each(function () {
        var $$this = $(this);
        $$this.siblings('small.errormessage').addClass('hide');
        if (!validateEmail($$this)) {
            errorId = ErrorInValidEmail;
            $$this.siblings('small.errormessage').removeClass('hide');
            return errorId;
        }
       
    });
    $("#" + frmId + " .ValidPancard").each(function () {
        var $$this = $(this);
        $$this.siblings('small.errormessage').addClass('hide');
        if (!ValidatePAN($$this)) {
            errorId = ErrorPanCard;
            $$this.siblings('small.errormessage').removeClass('hide');
            return errorId;
        }
    });
    $("#" + frmId + " .ValidIfsc").each(function () {
        var $$this = $(this);
        $$this.siblings('small.errormessage').addClass('hide');
        if (!validateIfsc($$this)) {

            errorId = ErrorIfsc;
            $$this.siblings('small.errormessage').removeClass('hide');
            return errorId;
        }
    });
    $("#" + frmId + " .ValidUrl").each(function () {
        var $$this = $(this);
        $$this.siblings('small.errormessage').addClass('hide');
        if (!validateurl($$this)) {
            errorId = ErrorUrl;
            $$this.siblings('small.errormessage').removeClass('hide');
            return errorId;
        }
    });



    return errorId;
}

function ValidateForm(frmId) {
    var isValid = true;
    requiredId = 0;

    $('#' + frmId + ' .reqiredTextbox').
        not('div.radio.reqiredTextbox').
        not('textarea.ckeditor.reqiredTextbox').
        each(function () {
            if ($.trim($(this).val()) == '') {
                isValid = false; 
                $(this).siblings('small.errormessage').removeClass('hide')
                requiredId = ErrorRequiredId;
            }
            else {
                $(this).siblings('small.errormessage').addClass('hide')

            }
        });


    $('#' + frmId + ' .reqiredTextbox.AutoComplete').each(function () {
        var $$thisControl = $(this);
        var $id = $$thisControl.attr('id');
        if ($.trim($(this).val()) == '') {
            isValid = false;
             
            //$(this).focus();
            requiredId = ErrorRequiredId;
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });

        }
    });

    $('#' + frmId + ' select.multipleSelect.reqiredTextbox').each(function () {
        var $$thisControl = $(this).parent('div');
        if ($.trim($(this).val()) == '') {
            isValid = false;
             
            requiredId = ErrorRequiredId;
        }
        else {
            $$thisControl.css({
                "border": "",
                "background": ""
            });

        }
    });

    $('#' + frmId + ' div.radio.reqiredTextbox').each(function () {
        var radiolength = $(this).find('[type=radio]:checked').length;
        if (radiolength == 0) {
            isValid = false;
           
            requiredId = ErrorRequiredId;
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });

    $('#' + frmId + ' textarea.ckeditor.reqiredTextbox').each(function () {
        var $$this = $(this).siblings('div:eq(0)');
        var editorvalue = $$this.find('iframe').contents().find('body').html();
        if ($.trim(editorvalue) == '' || $.trim(editorvalue) == '<p><br></p>') {
            isValid = false; 
            requiredId = ErrorRequiredId;
        }
        else {
            $$this.css({
                "border": "",
                "background": ""
            });

        }
    });

    return isValid;
}