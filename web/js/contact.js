var contact_submit = document.getElementById('contact_submit');

if(contact_submit)
contact_submit.onclick = function(event) {
    event.preventDefault();
    grecaptcha.execute();
}

function contact_onSubmit(response) {
    var contactForm = document.forms['contact-form'];
    var name = contactForm["name"].value;
    var email = contactForm["email"].value;
    var subject = contactForm["subject"].value;
    var message = contactForm["message"].value;

    submitMesage({
        formData: { name,email,subject,message },
        response: response
    })



    

} 
 function submitMesage(data) {
    var that = this;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var responseText = JSON.parse(this.responseText);
        if(responseText.success) {
            var response =  document.getElementById('contact-response');
            if(response) response.classList.add('contact__message--visible');
            contactForm.style.display = 'none';
        }
      }
    };
    
    xhttp.open("POST", "https://diocletia.hr/googlevalidate.php", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
  }