
// set the modal menu element
const addContactModal = document.getElementById('modal-add-contact');
const addContactBtn = document.getElementById("add-contact-btn");

const closeAddContact = document.getElementById("close-add-contact");

addContactBtn.addEventListener("click", () => {
    addContactModal.classList.remove("hidden");
    addContactModal.classList.remove("z-10");
});

closeAddContact.addEventListener("click", () => {
    addContactModal.classList.add("hidden");
    addContactModal.classList.add("z-10");
});

// select all input elements
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const genderFemaleRadio = document.getElementById("gender-female");
const genderMaleRadio = document.getElementById("gender-male");
const cityInput = document.getElementById("city");
const phoneInput = document.getElementById("phone");

// declare error object
let error = {
    isError: false,
    message: ""
}

// validate empty
const isEmpty = ( input ) => {
    if ( input.value == "" ) {
        error = {
            isError: true,
            message: `the ${ input.dataset.name } fiels is required`
        }
    }
    return error;
}


// validate email
const isValidEmail = ( input ) => {
    
    let inputValue = input.value;
    let emailPatern = /^([a-zA-Z0-9_.-]+)@([a-z]+)\.([a-z]+)$/;
    if ( !emailPatern.test( inputValue ) ) {
        error = {
            isError: true,
            message: `the ${ input.dataset.name } fiels is not a valid email`
        }
    }
    return error;
}

// validate text
const isValidText = ( input ) => {
    let inputValue = input.value;
    let textPatern = /^[a-z\s]+$/;
    if ( !textPatern.test( inputValue ) ) {
        error = {
            isError: true,
            message: `the ${ input.dataset.name } fiels is not a valid text`
        }
    }
    return error;
}

// validate phone
const isValidPhone = ( input ) => {
    let inputValue = input.value;
    let phonePatern = /^((06)|(05)|(07))([0-9]{8})$/;
    if ( !phonePatern.test( inputValue ) ) {
        error = {
            isError: true,
            message: `the ${ input.dataset.name } fiels is not a valid phone number`
        }
    }
    return error;
}
