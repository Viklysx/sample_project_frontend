import Utils from "../utils/Utils";

export default class EditView {
    constructor() {
        this.courseContent = document.querySelector('#courseContent');
    }

    courseContentView(content) {
        content[0].duration = Utils.getTimeInHours(content[0].duration);
        let source = document.getElementById("edit-template").innerHTML;
        let template = Handlebars.compile(source);
        let context = content[0];
        let html = template(context);

        this.courseContent.innerHTML = html;
    }
}