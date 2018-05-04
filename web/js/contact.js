var contactForm = document.forms['contact-form'];

if(contactForm)
    contactForm.onsubmit = function(data) {
        console.log(data)
        var name = this["name"].value;
        var email = this["email"].value;
        var subject = this["subject"].value;
        var message = this["message"].value;


        console.log(name, email, subject, message);
        //return false;
    }