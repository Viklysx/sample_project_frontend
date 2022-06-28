import Utils from "../utils/Utils";

export default class EditView {
    constructor(idCourse) {
        this.idCourse = idCourse;
        this.courseContent = document.querySelector('#courseContent');
        this.cancel = document.querySelector('.edit__cancel');
        this.save = document.querySelector('.edit__save');
    }

    courseContentView(content) {
        content[0].duration = Utils.getTimeInHours(content[0].duration);
        let source = document.getElementById("edit-template").innerHTML;
        let template = Handlebars.compile(source);
        let context = content[0];
        let html = template(context);

        this.courseContent.innerHTML = html;

        this.handlerClickCancel();
        this.handlerClickSave();
    }

    handlerClickCancel() {
        this.cancel.addEventListener("click", (e) => {
            e.preventDefault();
            location.href = location.origin;
        })
    }

    handlerClickSave() {
        this.save.addEventListener("click", (e) => {
            e.preventDefault();
            const formNode = document.querySelector('#editForm');
            const { elements } = formNode;
            Array.from(elements).forEach((element) => {
            })
            // location.href = location.origin;
        })
    }
}