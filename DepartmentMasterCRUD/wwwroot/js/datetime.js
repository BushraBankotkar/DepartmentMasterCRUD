$(function () {
    $(".datepicker").datepicker({
        autoclose: true,
        todayHighlight: true,
        format:"dd-M-yyyy"
    }).datepicker('update', new Date());

});
$('.timepicker').timepicki({
    show_meridian: false,
    min_hour_value: 0,
    max_hour_value: 23,
    step_size_minutes: 15,
    overflow_minutes: true,
    increase_direction: 'up',
    disable_keyboard_mobile: true
});

var twelveHour = $('.timepicker-24-hr').wickedpicker({ twentyFour: true });