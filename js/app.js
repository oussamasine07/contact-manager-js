
// set the modal menu element
const addContactModal = document.getElementById('modal-add-contact');
const addContactBtn = document.getElementById("add-contact-btn");

const closeAddContact = document.getElementById("close-add-contact");

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

const contactsList = document.getElementById("contacts-list");

const singleContact = document.getElementById("show-single-contact");
const closeSingleContact = document.getElementById("close-single-contact");

const clearInputs = () => {
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    cityInput.value = "";
    phoneInput.value = "";
}

let formType = "";

addContactBtn.addEventListener("click", () => {
    addContactModal.classList.remove("hidden");
    addContactModal.classList.remove("z-10");
    formType = "add";
});

closeAddContact.addEventListener("click", () => {
    addContactModal.classList.add("hidden");
    addContactModal.classList.add("z-10");
    clearInputs();
    formType = "";
});



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


const createListItem = ( contact ) => {
    const contactItem = document.createElement("li");
    contactItem.className = "flex justify-between gap-x-6 py-2 md:py-6";
    contactItem.id = `contact-item-${ contact.id }`;

    contactItem.innerHTML = `
        <div class="flex min-w-0 gap-x-4 items-center">
            <img class="size-12 flex-none rounded-full bg-gray-50" src="/assets/person.jpg" alt="">
            <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-sky-100" id="list-fullname-${ contact.id }">${ contact.firstName } ${ contact.lastName }</p>
                <p class="mt-1 truncate text-sm text-blue-300 hidden md:block" id="list-email-${ contact.id }">${ contact.email }</p>
            </div>
        </div>
        <div class=" flex justify-between items-center">
            ${
                contact.gender == "male" 
                ? 
                    '<span class="hidden md:block inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-400">Male</span>' 
                : 
                    '<span class="hidden md:block inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400">Female</span>'
            }
            

            <button data-id="${ contact.id }" onclick="showSingleContact(this)" class="bg-blue-500 border-2 border-blue-500 transition ease-in-out delay-150 hover:bg-transparent hover:text-blue-500 text-blue-950 font-bold text-sm ml-3 px-2 md:px-4 rounded-md ">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button data-id="${ contact.id }" onclick="showUpdateForm(this)" class="bg-yellow-500 border-2 border-yellow-500 transition ease-in-out delay-150 hover:bg-transparent hover:text-yellow-500 text-blue-950 font-bold text-sm ml-3 px-2 md:px-4 rounded-md ">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button data-id="${ contact.id }" onclick="deleteContact(this)" class="bg-red-500 border-2 border-red-500 transition ease-in-out delay-150 hover:bg-transparent hover:text-red-500 text-blue-950 font-bold text-sm ml-3 px-2 md:px-4 rounded-md ">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    contactsList.appendChild( contactItem )
}

const listContacts = ( contacts ) => {
   
    contacts.forEach(contact => {
        createListItem( contact );
    });
}


// add contact functionality
let contacts = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];

listContacts( contacts );

const findContact = contactId => contacts.filter( contact => contact.id == contactId )[0];

let foundContact = {}

const showSingleContact = ( e ) => {
    const contactId = parseInt(e.dataset.id);
    foundContact = findContact( contactId );

    document.getElementById("first-name-show").innerText = foundContact.firstName;
    document.getElementById("last-name-show").innerText = foundContact.lastName;
    document.getElementById("email-show").innerText = foundContact.email;
    document.getElementById("phone-show").innerText = foundContact.phone;
    document.getElementById("city-show").innerText = foundContact.city;
    document.getElementById("gender-show").innerHTML = foundContact.gender == "male" ? '<span class="inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-400">Male</span>' : '<span class="inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400">Female</span>'

    singleContact.classList.remove("hidden");
    singleContact.classList.remove("z-10");
}

closeSingleContact.addEventListener("click", () => {
    singleContact.classList.add("hidden");
    singleContact.classList.add("z-10");
    foundContact = {}
})

const showUpdateForm = ( e ) => {
    const contactId = parseInt(e.dataset.id);
    formType = "update";
    foundContact = findContact( contactId );

    firstNameInput.value = foundContact.firstName
    lastNameInput.value = foundContact.lastName
    emailInput.value = foundContact.email

    if ( foundContact.gender == "male" ) genderMaleRadio.checked = true;

    if ( foundContact.gender == "female" ) genderFemaleRadio.checked = true;
    
    phoneInput.value = foundContact.phone

    addContactModal.classList.remove("hidden");
    addContactModal.classList.remove("z-10");


}

const deleteContact = ( e ) => {
    const contactId = parseInt(e.dataset.id);
    foundContact = findContact( contactId );

    const contactItem = document.getElementById(`contact-item-${ foundContact.id }`);
    contactsList.removeChild( contactItem )
}

contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const newContact = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        gender: genderMaleRadio.checked ? "male" : "female",
        city: cityInput.value 
    }

    switch ( formType ) {
        case "add":
            newContact.id = contacts.length > 0 ? contacts[contacts.length - 1 ].id + 1 : 1,
            contacts.push(newContact);
        
            localStorage.setItem("contacts", JSON.stringify(contacts));
            clearInputs();
            closeAddContact.click();
        
            setTimeout(() => {
                createListItem( newContact );
            }, 700)

            break;

        case "update":
            contacts = contacts.map( contact => contact.id == foundContact.id ? {...contact, ...newContact} : contact );
        
            localStorage.setItem("contacts", JSON.stringify(contacts));
            // update UI
            document.getElementById(`list-fullname-${ foundContact.id }`).innerText = `${ newContact.lastName } ${ newContact.firstName }`
            document.getElementById(`list-email-${ foundContact.id }`).innerText = `${ newContact.email }`

            
            clearInputs();
            
            closeAddContact.click();
            break
    }
    

});