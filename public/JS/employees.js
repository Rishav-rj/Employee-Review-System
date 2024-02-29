var assignButtons = document.querySelectorAll('.assign');
var modal = document.getElementById('assignEmployeeModal');
var employeeIdInput = document.getElementById('employeeId');
var employeeToReviewSelect = document.getElementById('employeeToReview');
var fullname;

var userId = document.getElementById("userId")
var employeeName = document.getElementById("editName")
var employeeDesig = document.getElementById("editDesig")
var employeeEmail = document.getElementById("editEmail")
var employeeIsAdmin = document.getElementById("isAdmin")


assignButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        var employeeId = button.getAttribute('data-employee-id');
        employeeIdInput.value = employeeId;

        var optionToRemove = employeeToReviewSelect.querySelector('option[value="' + employeeId + '"]');
        fullname = optionToRemove.innerText
        if (optionToRemove) {
            employeeToReviewSelect.removeChild(optionToRemove);
        }
    });
});

modal.addEventListener('hidden.bs.modal', function () {
    if(employeeIdInput && fullname){
        const optionToAdd = `<option value="${employeeIdInput.value}">${fullname}</option>` 
        employeeToReviewSelect.innerHTML += optionToAdd;
        console.log(optionToAdd);
    }
    fullname = '';
    employeeIdInput.value = '';
});


function editEmployee(employeeId, fullname, designation, email, isAdmin){
    console.log(employeeId, fullname, designation, email, isAdmin);

    userId.value =  employeeId
    employeeName.value =  fullname
    employeeDesig.value = designation
    employeeEmail.value = email
    employeeIsAdmin.checked = (isAdmin === "true")
}