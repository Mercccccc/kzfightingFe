let button = document.getElementById("post");
let page = 1;
let number = 0;
var main = document.getElementById('content-Area');
var text = document.getElementsByTagName('input');
var comment = document.getElementsByTagName("textarea");
let postButton = document.getElementById('postButton');
var load = document.getElementById('load');
var loadP = document.getElementById('loading');

function Record(Receiver, Content, Time) {
    this.Receiver = Receiver;
    this.Content = Content;
}

let getNumber = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://39.106.3.178:678/records/number');
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var jsobj = JSON.parse(xhr.responseText)

            number = jsobj.data.number;
        }
    }
}

var removeload = function() {
    
}

let showContent = function() {
    let xhr = new XMLHttpRequest();
    let url = 'http://39.106.3.178:678/records?page=' + page.toString();
    xhr.open('get', url);
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var jsobj = JSON.parse(xhr.responseText)
            if(jsobj.data.records.length === 0) {
                page = page - 1;
                load.removeChild(loadP);
                return;
            }
            let receivers = new Array();
            let contents = new Array();
            let times = new Array();
            for(var i = 0; i < jsobj.data.records.length; i++){
                receivers[i] = jsobj.data.records[i].Receiver;
                contents[i] = jsobj.data.records[i].Content;
                times[i] = jsobj.data.records[i].CreatedAt;
            }
            
            var fragment = document.createDocumentFragment();

            for(var i = 0; i < contents.length; i++) {
                var to = document.createElement("h2");
                to.innerText = "To";
                var time = document.createElement("p");
                let record = document.createElement("div");
                let contentInfo = document.createElement("div");
                let receiver = document.createElement("h5");
                let content = document.createElement("p");
                contentInfo.className = 'content-info';
                record.className = 'content';
                time.innerText = splitTime(times[i]);
                receiver.innerText = receivers[i];
                content.innerText = contents[i];
                contentInfo.appendChild(to);
                contentInfo.appendChild(receiver);
                record.appendChild(contentInfo);
                record.appendChild(content);
                record.appendChild(time);
                fragment.appendChild(record);
            }

            main.appendChild(fragment)
        }
    }
}

var addNewContent = function(Record) {
    var to = document.createElement("h2");
    to.innerText = "To";
    let record = document.createElement("div");
    let contentInfo = document.createElement("div");
    let receiver = document.createElement("h5");
    let content = document.createElement("p");
    contentInfo.className = 'content-info';
    record.className = 'content';
    receiver.innerText = Record.Receiver;
    content.innerText = Record.Content;
    contentInfo.appendChild(to);
    contentInfo.appendChild(receiver);  
    record.appendChild(contentInfo);
    record.appendChild(content);
    main.appendChild(record);
}

var postRecord = function() {
    var receiver = text[0].value;
    var content = comment[0].value;
    if(content.length > 0 && receiver.length > 0){
        var record = new Record(receiver, content);
        var xhr = new XMLHttpRequest();
        var url = 'http://39.106.3.178:678/record'
        xhr.open('post', url, true);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(record));
        if (xhr.readyState === 4 && xhr.status === 200) {
            postButton.innerText = "success";
        }
    } else {
        alert('please input something!');
    }
}

// function getScrollTop(){
//     var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
//     if(document.body){
//         bodyScrollTop = document.body.scrollTop;
//     }
//     if(document.documentElement){
//         documentScrollTop = document.documentElement.scrollTop;
//     }
//         scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
//         return scrollTop;
//     }

// function getScrollHeight(){
//     var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
//     if(document.body){
//         bodyScrollHeight = document.body.scrollHeight;
//     }
//     if(document.documentElement){
//         documentScrollHeight = document.documentElement.scrollHeight;
//     }
//     scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
//     return scrollHeight;
// }

// function getWindowHeight(){
//     var windowHeight = 0;
//     if(document.compatMode == "CSS1Compat"){
//         windowHeight = document.documentElement.clientHeight;
//     }else{
//         windowHeight = document.body.clientHeight;
//     }
//         return windowHeight;
//     }
     
//     window.onscroll = function(){
//     if(getScrollTop() + getWindowHeight() == getScrollHeight()){
//         page = page + 1;
//         showContent();
//     }
// };

var loading = function() {
    page = page + 1;
    showContent();
}

let splitTime = function(timeString) {
    date = timeString.split('T');
    hour = date[1].split(":");
    return date[0] + " " + hour[0] + ":" + hour[1];
}

showContent();
load.addEventListener("click", loading);
postButton.addEventListener("click", postRecord);