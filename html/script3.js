document.getElementById('postData').addEventListener('submit', sendData);
function sendData(event){
    event.preventDefault();
    let message = document.getElementById('message').value;
    let name = document.getElementById('name').value;
    let subject = document.getElementById('subject').value;
    let email = document.getElementById('email').value;
    fetch('http://js.vacsera.com/api/final-project', {
        method: 'POST',
        mode: "no-cors",
        headers: new Headers({
            'Content-Type': 'application/json','Accept': 'application/json',}),
        body:JSON.stringify({
            message:message,
            name:name,
            subject:subject,
            email:email,
        })
    }).then((resp) => resp.json()).then(function(data) {
            console.log(data)
        })
        .catch(function(error) {

        });
}
