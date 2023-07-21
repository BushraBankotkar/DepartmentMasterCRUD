var _listUrl = '';
var PageNumber = 1;
var PageSize = 15;
var ListDetails = function () {
    function SetValueInControl(DataValue) {
        if (DataValue.length == 19 || DataValue.length == 23) {
            var getDate = DataValue.substr(0, 10).split('-');
            if (getDate.length == 3) {
                if (parseInt(getDate[0]) > 1) {
                    var date = getDate[2];
                    var Month = month[parseInt(getDate[1]) - 1];
                    var fullyear = getDate[0];
                    return date + '-' + Month + '-' + fullyear
                }
                else {
                    return '';
                }
            }
        }
        return DataValue;
    }; 
    var LoadListDetail = function (listUrll) {
        var skipColumnArr = ["PkId", "TotalPage", "TotalCount","CDate"];
        var filterExpression = "";
        var sortExpression = "";
        
        var primaryKeyField = "PkId";
        var tbltableListAdres = "#tblDataList"; 
        $(tbltableListAdres + ' thead').remove();
        $(tbltableListAdres + ' tbody').remove();
        $.ajax({
            url: listUrll,
            data: { PageNumber: PageNumber, PageSize: PageSize, FilterExpression: filterExpression, MenuId: $('#hdnClickMenuId').val() },
            type: "get",
            success: function (data) {
                if (data.length > 0) {
                    var editUrl = "";
                    var viewUrl = "";
                    var columnsIn = data[0];
                    var tdrowId = 0;
                    $(tbltableListAdres).append("<thead> <tr>");
                    $.each(columnsIn, function (index) {
                        var idx = $.inArray(index, skipColumnArr);
                        if (idx == -1) {
                            $(tbltableListAdres + ' thead tr')
                                .append("<th>" + index + "</th>");
                        }
                    });
                    $(tbltableListAdres + ' thead tr').append("<th>Action</th>");
                    $(tbltableListAdres).append("<tbody>");
                    $.each(data, function (index, value) {
                        var strViewUrl = viewUrl + '' + data[index][primaryKeyField];
                        $(tbltableListAdres + ' tbody').append("<tr>")
                        var _html = '';
                        var inx = 1;
                        $.each(columnsIn, function (colum) {
                            var idx = $.inArray(colum, skipColumnArr);
                            if (idx == -1) {
                                var newvalue = (data[index][colum] == null) ? "" : data[index][colum];
                                _html += "<td>" + newvalue + "</td>";
                            }
                            inx += 1;
                        });
                        _html += '<td><a id="editrow_' + tdrowId + '" rel="' + data[index][primaryKeyField] + '" href="javascript:void(0);" class="editDetail js-cd-panel-trigger pl-011" data-panel="main" data-toggle="tooltip" data-placement="bottom" data-original-title="Add New"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></a>';

                        _html += '<a id="deleterow_' + tdrowId + '" rel="' + data[index][primaryKeyField] + '" href="javascript:void(0);" class="deleteDetail"><svg viewBox="0 0 24 24" width="16" height="16" stroke="red" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">< polyline points = "3 6 5 6 21 6" ></polyline ><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg ></a></td>';

                        $(tbltableListAdres + ' tbody tr:last')
                            .append(_html);
                        tdrowId++;
                    });
                    _totalPage = data[0]["TotalPage"];
                    $('#showingResult').text("Showing " + PageNumber + " to " + _totalPage + " of " + data[0]["TotalCount"] + " records");
                }
                DisablePageing();
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);

            }
        });
    }
    return {
        LoadList: function (listUrl) {
            return LoadListDetail(listUrl)
        },
        LoadGui: function (controlValue) {
            return SetValueInControl(controlValue)
        }
    }
}();

function ClearField() {
    $('#divDataDetail').find('input:text').val('');
    $('#divDataDetail').find('select').val('')
    $('#divDataDetail').find('select').val('0') 
    $('#divDataDetail').find('input:checkbox').prop('checked', 0).trigger('change')
}

$(document).on('change', '#ddlSelectPageSize', function () {
    PageSize = $(this).val();
    PageNumber = 1;
    ListDetails.LoadList(_listUrl);
});
$(document).on('click', '#btnPageFirst', function () {
    if (PageNumber != 0) {
        PageNumber = 1;
        ListDetails.LoadList(_listUrl);
    }

});
$(document).on('click', '#btnPagePrev', function () {
    if (PageNumber > 1) {
        PageNumber = PageNumber - 1;
        ListDetails.LoadList(_listUrl);
    }

});
$(document).on('click', '#btnPageNext', function () {
    if (PageNumber < _totalPage) {
        PageNumber = PageNumber + 1;
        ListDetails.LoadList(_listUrl);
    }

});
$(document).on('click', '#btnPageLast', function () {
    if (PageNumber != _totalPage) {
        PageNumber = _totalPage;
        ListDetails.LoadList(_listUrl);
    }

});

function DisablePageing() {
    $('#liFirst,#liPrev,#liNext,#liLast').removeClass('disabled');
    if (PageNumber == 1) {
        $('#liFirst,#liPrev').addClass('disabled')
    }

    if (PageNumber == _totalPage) {
        $('#liNext, #liLast').addClass('disabled')
    }
}
function BindField(dataDetail) {
    if (dataDetail != null) {
        $.each(dataDetail, function (detail) {
            try {
                if (detail != null) {
                    var control = $('[id=' + detail + ']');
                    if (control != null && control.length > 0) {
                        var controlType = ''
                        if (control[0].type != undefined) {
                            controlType = control[0].type.toLowerCase();
                        }
                        else {
                            controlType = control[0].tagName.toLowerCase();
                        }
                        var strValue = '';
                        if (dataDetail[detail] != null) {
                            strValue = dataDetail[detail].toString();
                        }
                        strValue = ListDetails.LoadGui(strValue);//select-multiple
                        switch (controlType) {
                            case "checkbox":
                                if (strValue == 'true' || strValue == 'false') {
                                    strValue = strValue == 'true' ? 1 : 0;
                                }
                                control.prop('checked', parseInt(strValue)).trigger('change');
                                break;
                            case "select-multiple":
                                multiselectExits = true;
                                var selectedValue = strValue.split(',');
                                for (var i = 0; i < selectedValue.length; i++) {
                                    $(control).find('option[value="' + $.trim(selectedValue[i]) + '"]').attr('selected', 'selected');

                                }
                                break;
                            case "radio":
                                $(control).filter('[value="' + strValue + '"]').prop('checked', true);
                                if (strValue == "true") {
                                    $(control[0]).filter('[value="Yes"]').prop('checked', true);
                                    $(control[1]).filter('[value="No"]').prop('checked', false);
                                }
                                else {
                                    $(control[0]).filter('[value="Yes"]').prop('checked', false);
                                    $(control[1]).filter('[value="No"]').prop('checked', true);
                                }

                                break;
                            case "textarea":
                                if ($(control).hasClass('ckeditor')) {

                                    $(control).siblings('div#cke_' + detail).find('iframe').contents().find("body").html(strValue.trim());
                                }
                                else {
                                    control.val(strValue.trim()).change();
                                }

                                break;
                            case "label":
                                var lblvalue = strValue.substring(0, 40) + '.....';
                                control.text(lblvalue).change();
                                $('#hdn_' + detail).val(strValue).change();
                                // CheckBoxStatus(control);
                                break;
                            case "file":
                                break;
                            default:
                                if (control.hasClass('OnlyYear') || control.hasClass('OnlyDate')) {
                                    if (strValue.trim() != '') {
                                        control.datepicker('update', strValue.trim());
                                    }
                                }
                                else {
                                    if (control.hasClass('OnlyMonth')) {
                                        var valueMoth = $.grep(OnlyMonthDate, function (detail) {
                                            return detail.MonthName == strValue.trim();
                                        });
                                        if (valueMoth.length > 0) {
                                            strValue = valueMoth[0].MonthId;
                                        }
                                    }
                                }


                                control.val(strValue.trim()).change();
                                control.val(strValue.trim()).trigger('change');

                        }

                    }

                }
            }
            catch (err) {
                console.warn(err)
            }

        });
    }



};

var GetValue = function (srtValue, tblrow) {
    srtValue = srtValue == null ? '' : srtValue;
    var actualValue = srtValue;
    var dateValue = srtValue;
    var tdValue = '';

    if (dateValue.length >= 19 && dateValue.length <= 23) {
        dateValue = dateValue.toString();
        dateValue = dateValue.substring(0, 10);
        dateValue = dateValue.split('-');
        if (dateValue.length != 3) {
            tdValue = actualValue;
        }
        else {
            var year = dateValue[0];
            var getMOnth = dateValue[1];
            var date = dateValue[2];
            var isDateValue = new Date(year, getMOnth, date);
            if (isDateValue == 'Invalid Date') {
                tdValue = actualValue;
            }
            else {
                if (dateColums.indexOf(dateColu) == -1) {
                    dateColums.push(dateColu)
                }
                DefaultValues.isDateValue = true;
                var Month = month[parseInt(getMOnth) - 1];
                tdValue = date + '-' + Month + '-' + year;
            }
        }
    }
    else {
        tdValue = actualValue.toString();
    }

    if (typeof (tdValue.length) === 'undefined' || tdValue.length <= __stringLength) {
        if (tdValue.length != 7) {
            //tdValue = ReplaceTag(tdValue);

            if (tdValue.indexOf('/FileUpload/NotInUse/') == -1) {
                tdValue = '<span class="control-label" id="lbl_' + tblrow + '">' + ReplaceTag(tdValue) + '</span>';
            }
        }
        else {
            // for colour
            if (tdValue.indexOf('#') != 0) {
                tdValue = '<span class="control-label" id="lbl_' + tblrow + '">' + ReplaceTag(tdValue) + '</span>';
            }
            else {
                tdValue = '<span class="control-label" id="lbl_' + tblrow + '"><span style="background-color:' + tdValue + ';color:' + tdValue + ';padding:1px 35px"></span></span>';
            }
        }
    }
    else {
        var strActualValue = tdValue;
        var fileExits = strActualValue.indexOf('/FileUpload/');
        if (fileExits == -1) {
            let atag = strActualValue.indexOf('atag');
            if (atag == -1) {
                var subvalue = tdValue.substr(0, __stringLength) + '...';
                tdValue = '<span class="control-label ShowDetail" style="cursor: pointer;" id="lbl_' + tblrow + '">' + ReplaceTag(subvalue) + '</span>';
                tdValue += '<span class="control-label hide" id="hdn_lbl_' + tblrow + '">' + ReplaceTag(strActualValue) + '</span>';
            }
            else {
                tdValue = strActualValue;
            }
            //tdValue += '<input type="hidden" id="hdn_lbl_' + tblrow + '"  value="'+ ReplaceTag(strActualValue) + '">'
        }
        else {
            var fileIndex = strActualValue.split('/').length - 1
            var fileNaa = strActualValue.split('/')[fileIndex];
            if (strActualValue.indexOf('.') != -1) {
                if (strActualValue.indexOf('nuf') == -1) {
                    if (strActualValue.indexOf('/FileUpload/NotInUse/Image') > -1) {
                        tdValue = strActualValue;

                    } else if (strActualValue.split(',').length == 1) {
                        tdValue = '<a href="' + strActualValue + '" target="_blank" rel="fileDisplay" class="btn btn-default btn-sm" style="padding: 4px 6px 2px 9px!important;font-size: 12px!important;margin-top: 3px!important;"><i class="fa fa-download"></i></a>';
                    }
                    else {
                        tdValue = '<a id="Downloadrow_' + tblrow + '" href="javascript:void(0)" Files="' + strActualValue + '"  class="btn btn-default btn-sm" style="padding: 4px 6px 2px 9px!important;font-size: 12px!important;margin-top: 3px!important;"><i class="fa fa-download"></i></a>';
                    }
                }
                else {
                    tdValue = "<a rel='fileDisplay' class='btn btn-default btn-sm' style='padding: 4px 6px 2px 9px!important;font-size: 12px!important;margin-top: 3px!important; background-color: rgb(220, 216, 216); border: 1px solid rgb(171, 169, 169); color: grey; '><i class='fa fa-download'></i></a>";
                }
            }
            else {
                if (strActualValue.indexOf('/FileUpload/NotInUse/') == -1) {
                    var subvalue = tdValue.substr(0, __stringLength) + '...';
                    tdValue = '<span class="control-label ShowDetail" id="lbl_' + tblrow + '">' + ReplaceTag(subvalue) + '</span>';
                    tdValue += '<span class="control-label hide" id="hdn_lbl_' + tblrow + '">' + ReplaceTag(strActualValue) + '</span>';
                    //tdValue += '<input type="hidden" id="hdn_lbl_' + tblrow + '"  value="' + ReplaceTag(strActualValue) + '">'
                }
                else {
                    tdValue = strActualValue;
                }
            }
        }
    }

    return tdValue;

}

const toast = document.querySelector(".toastSucces");
const toastError = document.querySelector(".toastError");
$(document).on("click", '.closebtn', () => {
    toast.classList.remove("active");
    toastError.classList.remove("active");
    setTimeout(() => {
        $(".progress").removeClass("active");
    }, 3000);

    clearTimeout(timer1);
    clearTimeout(timer2);
});
function ShowSuccess(message) {
    toast.classList.add("active");
    $(".progress").addClass("active");

    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 5000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
        $(".progress").removeClass("active");
    }, 5300);

}

function ShowError(message) {
    toastError.classList.add("active");
    $(".progress").addClass("active");
    $('#spanError').text(message);
}

function DisableErrorMsg() {
    toast.classList.remove("active");
    toastError.classList.remove("active");
    $(".progress").removeClass("active");
    $('#spanError').text('');
}