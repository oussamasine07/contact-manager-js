
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
const contactForm = document.getElementById("contact-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const genderFemaleRadio = document.getElementById("gender-female");
const genderMaleRadio = document.getElementById("gender-male");
const cityInput = document.getElementById("city");
const phoneInput = document.getElementById("phone");

const firstNameContainer = document.getElementById("first-name-container");
const lastNameContainer = document.getElementById("last-name-container");
const emailContainer = document.getElementById("email-container");
const phoneContainer = document.getElementById("phone-container");

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
            message: `the ${ input.dataset.name } field is required`
        }
    } else {
        error = {
            isError: false,
            message: ""
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

    if ( textPatern.test( inputValue ) == false ) {
        error = {
            isError: true,
            message: `the ${ input.dataset.name } field is not a valid text`
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

const showError = ( parrentElement, message ) => {
    // remove prev error
    if (parrentElement.children.length > 2 ) {
        parrentElement.removeChild(parrentElement.children[2]);
    }
    
    // create new error
    const spanError = document.createElement("span");
    spanError.className = "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1";
    spanError.innerText = message;
    // add new error
    parrentElement.appendChild(spanError);
}

const clearErrorMsg = ( parrentElement ) => {
    parrentElement.removeChild( parrentElement.children[2] );
}

// validate forms
firstNameInput.addEventListener("blur", () => {
    let empty = isEmpty( firstNameInput ); // destructuring
    let text = isValidText( firstNameInput); 

    if ( empty.isError ) {
        showError( firstNameContainer, empty.message );
    } else {
        if ( text.isError ) {
            showError( firstNameContainer, text.message );
        } else {
            clearErrorMsg( firstNameContainer );
        }
    }
});

lastNameInput.addEventListener("blur", () => {
    let empty = isEmpty( lastNameInput ); // destructuring
    let text = isValidText( lastNameInput); 

    if ( empty.isError ) {
        showError( lastNameContainer, empty.message );
    } else {
        if ( text.isError ) {
            showError( lastNameContainer, text.message );
        } else {
            clearErrorMsg( lastNameContainer );
        }
    }
});

emailInput.addEventListener("blur", () => {
    let empty = isEmpty( emailInput ); // destructuring
    let text = isValidEmail( emailInput ); 

    if ( empty.isError ) {
        showError( emailContainer, empty.message );
    } else {
        if ( text.isError ) {
            showError( emailContainer, text.message );
        } else {
            clearErrorMsg( emailContainer );
        }
    }
});

phoneInput.addEventListener("blur", () => {
    let empty = isEmpty( phoneInput ); // destructuring
    let text = isValidPhone( phoneInput ); 

    if ( empty.isError ) {
        showError( phoneContainer, empty.message );
    } else {
        if ( text.isError ) {
            showError( phoneContainer, text.message );
        } else {
            clearErrorMsg( phoneContainer );
        }
    }
});

// add contact functionality
const contacts = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];

contactForm.addEventListener("submit", e => {
    e.preventDefault();
    
});