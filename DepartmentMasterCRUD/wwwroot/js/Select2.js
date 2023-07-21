 
    let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
    ];

    // getting all required elements
    const searchWrapper = document.querySelector(".search-inputauto");
    const inputBox = searchWrapper.querySelector("input");
    const suggBox = searchWrapper.querySelector(".autocom-box");
    const icon = searchWrapper.querySelector(".iconsearch");
    let linkTag = searchWrapper.querySelector("a");
    let webLink;

    // if user press any key and release
    inputBox.onkeyup = (e)=>{
        let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = () => {
            webLink = "https://www.google.com/search?q=" + userData;
            linkTag.setAttribute("href", webLink);
            console.log(webLink);
            linkTag.click();
        }
            emptyArray = suggestions.filter((data)=>{
                return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            });
            emptyArray = emptyArray.map((data)=>{
                return data = '<li>'+ data +'</li>';
            });
    searchWrapper.classList.add("active");
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
        allList[i].setAttribute("onclick", "select(this)");
            }
        }else{
        searchWrapper.classList.remove("active");
        }
    }

    function select(element){
        let selectData = element.textContent;
    inputBox.value = selectData;
        icon.onclick = ()=>{
        webLink = "https://www.google.com/search?q=" + selectData;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
        }
    searchWrapper.classList.remove("active");
    }

    function showSuggestions(list){
        let listData;
    if(!list.length){
        userValue = inputBox.value;
    listData = '<li>'+ userValue +'</li>';
        }else{
        listData = list.join('');
        }
    suggBox.innerHTML = listData;
    }
$(".enter-mail-id").keydown(function (e) {

    if (e.keyCode == 13 || e.keyCode == 32) {
        var getValue = $(this).val();
        $('.all-mail').append('<span class="email-ids">' + getValue + ' <span class="cancel-email">x</span></span>');
        $(this).val('');
    }
});


$(document).on('click', '.cancel-email', function () {
    $(this).parent().remove();
});


function LoadMultiSelectAutoComplete($$Control, dataUrl, isChange, dataValue, dataText) {
    if (typeof (isChange) === 'undefined') isChange = false;
    if (typeof (dataText) === 'undefined') dataText = 'Text';
    if (typeof (dataValue) === 'undefined') dataValue = 'Value';

    var ControlId = $$Control.attr('id'); 
    if (typeof (ControlId) != 'undefined') {
        ControlId = ControlId.substring(4);
        let spanId = 'span_' + ControlId;
        //var $auto = jQuery.noConflict();
        $($$Control).autocomplete({
            source: function (request, response) {
                var prefix = request.term;
                var selectedTo = $('span#span_empEmailTo .control-value').map(function (idx, ele) {
                    return $(ele).val();
                }).get();
                var selectedCC = $('span#span_empEmailCC .control-value').map(function (idx, ele) {
                    return $(ele).val();
                }).get();
                //var tablChk = $('table tr td input[id^=chk_emp_]:checked').map(function (idx, ele) {
                //    return $(ele).attr('rel');
                //}).get();

                var param = { SelectedItem: selectedTo.concat(selectedCC).join(',') };
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
                    }
                }
                else {
                    $$Control.val('');
                }
            },
            select: function (e, i) {
                var value = i.item.label;
                var id = i.item.id;
                $$Control.val('');
                if (id != "0") {
                    $('span#' + spanId).append('<span class="control-text email-ids">' + value + '  <input type="hidden" class="control-value" value="' + id + '"></input><span class="cancel-email">x</span></span>');
                }
                e.preventDefault();
            }
        })
            .bind('focus', function (focus) {
                var self = this;
                jQuery(self).autocomplete("search", " ");;
                ///$(this).autocomplete("search");
            });
    }
};
