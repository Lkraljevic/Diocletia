var contactForm = document.forms['contact-form'];

if(contactForm)
    contactForm.onsubmit = function() {
        var name = this["name"];
        var email = this["email"];
        var subject = this["subject"];
        var message = this["message"];


        console.log(name, email, subject, message);
        //return false;
    }