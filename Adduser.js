let nameJs = document.getElementById("name");
let emailJs = document.getElementById("email");
let nameErrorJs = document.getElementById("nameErrMsg");
let emailErrorJs = document.getElementById("emailErrMsg");
let workingStatus = document.getElementById("status");
let genderMaleJs = document.getElementById("genderMale");
let genderFemaleJs = document.getElementById("genderFemale");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
}

nameJs.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrorJs.textContent = "required*"
    } else {
        nameErrorJs.textContent = "";
    }
    formData.name = event.target.value;
})

emailJs.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrorJs.textContent = "required*"
    } else {
        emailErrorJs.textContent = "";
    }
    formData.email = event.target.value;
})

workingStatus.addEventListener("change", function(event) {
    formData.status = event.target.value;
})

genderMaleJs.addEventListener("change", function(event) {
    formData.gender = event.target.value;
})

genderFemaleJs.addEventListener("change", function(event) {
    formData.gender = event.target.value;
})

function formVlidData(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrorJs.textContent = "Required*";
    }
    if (email === "") {
        emailErrorJs.textContent = "Required*";
    }
}


function submitClicked(formData) {
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 463eba34fc6efba19713535542f70e6631c56dd0adce0cd64f737f5709f3a43b",
        },
        body: JSON.stringify(formData)
    }
    let url = "https://gorest.co.in/public-api/users";
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            console.log(jsonData)
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrorJs.textContent = "Email Already Exists";
                }
            }
        })
}

let addUserForm = document.getElementById("addUserForm");
addUserForm.addEventListener("submit", function(event) {
    event.preventDefault();
    formVlidData(formData)
    submitClicked(formData)
})