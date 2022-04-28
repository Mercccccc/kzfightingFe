var httpRequest;
let myButton = document.getElementById("post");

myButton.addEventListener("click", makeRequest);

function test() {
    alert("test");
}

function makeRequest() {
    let httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Giving up : (Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', '127.0.0.1:678/records/number', false);
    httpRequest.send();
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let data = JSON.parse(httpRequest.responseText);
            alert(data.data);
        } else {
            alert('There was a problem with the request.');
        }
    }
}
