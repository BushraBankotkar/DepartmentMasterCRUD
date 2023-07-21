_listUrl = '/EmployeeCRUD/Index?handler=EmployeeList';
var $hdnPryKey = $('#hdn_formId');
var $formMode = $('#hdn_formMode');

$(document).on('click', '#btnAddnewLink', function () {
    ClearField();
    ClearValidationState();
    $hdnPryKey.val('');
    $formMode.val('Add');
    $("#spnHeaderText").text("Add Employee");
});

$('#editClick').click(function (e) {    
    ClearValidationState();
});

$('#btnSave').click(function (e) {
    e.preventDefault(); // Prevent the default form submission
    if ($formMode.val() === "Add") {
        // Call the Add function when the form is in Add mode
        AddData();
    } else if ($formMode.val() === "Edit") {
        // Call the Update function when the form is in Edit mode
        UpdatedData();
    }
});

function AddData(redirectUrl) {
    DisableErrorMsg();    
    var IsValid = Validate();
    if (!IsValid) {
        return false
    }       
    if (IsValid) {
        var form = $('form');
        var frmdata = new FormData($('form').get[0]);       
        var other_data = $('form').serializeArray();
        $.each(other_data, function (key, input) {
            frmdata.append(input.name, input.value);
        });            
        $.ajax({
            type: "POST",
            url: "/EmployeeCRUD/Index?handler=GetAjax",
            data: frmdata,
            processData: false,
            contentType: false,
            headers:
            {
                "RequestVerificationToken": $('input:hidden[name="__RequestVerificationToken"]').val()
            },
            success: function (data) {
                if (data.messageId === 1) {
                    ShowError(data.message);
                    window.scrollTo(0, 0);
                    return false;
                }
                else {                   
                    ClearField();
                    $hdnPryKey.val('');
                    $formMode.val('Add');
                    $('#divInfoForm').removeClass('cd-panel--is-visible');
                    ShowSuccess(data.message);
                  
                    setTimeout(function () {
                        window.location.href = '/EmployeeCRUD/Index';
                    }, 3000);
                }
            }
            
        });
    }
    return IsValid;
}

function loadEmployeeData(id) {
    // Make an AJAX request to get the employee data by ID
    $.ajax({
        type: "GET",
        url: `/EmployeeCRUD/Index?handler=GetEmployee&id=${id}`,
        dataType: "json",
        success: function (data) {
            if (data) {
                // Fill the form fields with the retrieved data
                $("#hdn_formId").val(data.employeeId);
                $("#hdn_formMode").val("Edit");
                $("#employee_emp_FirstName").val(data.emp_FirstName);
                $("#employee_emp_LastName").val(data.emp_LastName);
                $("#employee_emp_Department").val(data.emp_Department);
                $("#employee_emp_Designation").val(data.emp_Designation);

                // Show the right-side modal
                $formMode.val('Edit');
                $("#spnHeaderText").text("Edit Employee");
                $('#divInfoForm').addClass('cd-panel--is-visible');
            }
        },
        error: function (error) {
            // Handle error if any
            console.log(error);
        }
    });
}

function UpdatedData(redirectUrl) {
    DisableErrorMsg();
    var IsValid = Validate();
    if (!IsValid) {
        return false
    }
    if (IsValid) {
        var form = $('form');
        var frmdata = new FormData($('form').get[0]);
        var other_data = $('form').serializeArray();
        var id = $("#hdn_formId").val();
        // Append the id value to the form data
        frmdata.append("employee.EmployeeId", id);
        $.each(other_data, function (key, input) {
            frmdata.append(input.name, input.value);
        });
        $.ajax({
            type: "POST",
            url: "/EmployeeCRUD/Index?handler=UpdateData",
            data: frmdata,
            processData: false,
            contentType: false,
            headers:
            {
                "RequestVerificationToken": $('input:hidden[name="__RequestVerificationToken"]').val()
            },
            success: function (data) {
                if (data.messageId === 1) {
                    ShowError(data.message);
                    window.scrollTo(0, 0);
                    return false;
                }
                else {
                    console.log("Hello");
                    ClearField();
                    $hdnPryKey.val('');
                    $formMode.val('Edit');
                    $('#divInfoForm').removeClass('cd-panel--is-visible');
                    ShowSuccess(data.message);
                    setTimeout(function () {
                        window.location.href = '/EmployeeCRUD/Index';
                    }, 3000);
                }
            }

        });
    }
    return IsValid;
}

function ClearValidationState() {
    $('.reqiredTextbox').each(function () {
        $(this).css({
            "border": "",
            "background": ""
        });
    });
}
$(document).on('input change', '.reqiredTextbox', function () {
    Validate();
    //ClearValidationState();
});

$(document).ready(function () {
    $('#tblDataList').DataTable({
        "paging": true, // Enable pagination
        "lengthChange": false, // Hide page length options
        "pageLength": 10, // Set the number of rows per page
        "sorting": false
    });
});
