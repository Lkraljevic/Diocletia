var contact_submit = document.getElementById('contact_submit');

if(contact_submit)
contact_submit.onclick = function(event) {
    event.preventDefault();
    grecaptcha.execute();
}


function contact_onSubmit(token) {
    var contactForm = document.forms['contact-form'];
    var name = contactForm["name"].value;
    var email = contactForm["email"].value;
    var subject = contactForm["subject"].value;
    var message = contactForm["message"].value;

    console.log(token);
    console.log(name, email, subject, message);
} 