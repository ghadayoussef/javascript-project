$(document).ready(function(){
    $("form").submit(function(e){
         e.preventDefault();
        let name=$("#name").val()
        let email=$("#email").val()
        let subject=$("#subject").val()
        let message=$("#message").val()
        if(name &&email&&subject&&message){
            sendFeedback(name,email,subject,message);
        }
      });
  });
function sendFeedback(name,email,subject,message){
    const data = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
    fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data.status);
            if(data.status){
                $("#popup").click()
            }
            else{
                alert("Error,try again")
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
