$(document).ready(function(){
    $("form").submit(function(e){
         e.preventDefault();
        sendFeedback($("#name").val(),$("#email").val(),$("#subject").val(),$("#message").val());
      });
  });
function sendFeedback(fname,email,subject,message){
    console.log(fname+email+subject+message)
    fetch("http://js.vacsera.com/api/final-project"
,{
    method: "POST",
    mode: "no-cors",
    headers : new Headers(),
    body:JSON.stringify({
        name:fname,
        email:email,
        subject:subject,
        message:message
    })
})
.then((resp) => resp.json())
.then(function(data) {
    console.log(data);
})
.catch(function(error) {
   alert("Message Send Success")
    window.location.href="index.html"
});
}
