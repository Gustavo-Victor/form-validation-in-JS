const mainForm = window.document.querySelector('#main-form');
const fields = window.document.querySelectorAll('#main-form input[required]');

mainForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.alert('Your data has been sent succesfully!');
    fields.forEach(field => {
        field.value = '';
        field.style.borderColor = '#fd951f';
    });
});

function start(){
    for (let field of fields) {
        field.addEventListener('invalid', (event) => {        
            event.preventDefault();
            customValidation(event);
        });
        field.addEventListener('blur', customValidation);        
    }
}

function customValidation(event){     
    const input = event.target;
    const validation = validateField(input);        
    validation();
}

function validateField(field){
    function verifyErrors(){
        let foundError = '';
        for(let err in field.validity){
            if(field.validity[err] && !field.validity['valid']){
                foundError = err;
            }
        }
        return foundError;
    }    

    function setMessage(typeError){
        const messages = {
            text: {
                valueMissing: "Name is required"
            },
            email: {
                valueMissing: "Email is required",
                typeMismatch: "Please, enter a valid email address"
            }
        }
        return messages[field.type][typeError];
    }

    function setStyles(message){
        const element = field.parentNode.lastElementChild;
        const label = element.parentNode.querySelector('label');
        if(message != ''){
            element.classList.add('active');
            element.innerHTML = message;
            label.style.transform = 'translateY(-24px)';
            label.style.fontSize = '0.8rem';
            label.style.letterSpacing = '0.1rem';
            field.style.borderColor = 'red';
        }else{
            element.classList.remove('active');
            element.innerHTML = ''; 
            field.style.borderColor = 'green';           
        }
    }

    return function(){
        const error = verifyErrors();
        if(error != ''){
            const message = setMessage(error);
            setStyles(message);
        }else{
            setStyles('');            
        }
    };
}

start();