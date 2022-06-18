
// const Handlebars = require("Handlebars");
let source = document.getElementById("entry-template").innerHTML;
let template = Handlebars.compile(source);
let context = {
    title: "My New Post",
    body: "This is my first post!"
};
let html = template(context);
console.log(html)

function getSkills() {
    let skills;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/skills", false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    if (xhr.status == 200) {
        skills = JSON.parse(xhr.response);
        return skills;
    };
}