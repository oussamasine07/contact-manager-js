
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
            message: `the ${ input.dataset.inputName } fiels is required`
        }
    }
    return error;
}

// validate email
const isValidaEmail = ( input ) => {
    let inputValue = input.value;

}
// validate text