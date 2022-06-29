import Utils from "../utils/Utils";

export default class EditView {
    constructor(idCourse, {cancelCourse, saveCourse}) {
        this.idCourse = idCourse;
        this.cancelCourse = cancelCourse;
        this.saveCourse = saveCourse;
        this.courseContent = document.querySelector('#courseContent');       
    }

    courseContentView(content) {
        content[0].duration = Utils.getTimeInHoursAndMinutes(content[0].duration);
        let source = document.getElementById("edit-template").innerHTML;
        let template = Handlebars.compile(source);
        let context = content[0];
        let html = template(context);

        this.courseContent.innerHTML = html;

        this.handlerClickCancel();
        this.handlerClickSave();
        this.handlerClickDeleteAuthor();
    }

    handlerClickDeleteAuthor() {
        const deteleAuthor = document.querySelectorAll(".delete-author");
        deteleAuthor.forEach(element => {
            element.addEventListener("click", () => {
                element.parentNode.remove();
            })
        })
    }

    handlerClickCancel() {
        const cancel = document.querySelector(".edit__cancel");
        cancel.addEventListener("click", (e) => {
            e.preventDefault();
            this.cancelCourse();
        })
    }

    handlerClickSave() {
        const save = document.querySelector(".edit__save");

        save.addEventListener("click", (e) => {
            e.preventDefault();
            const formNode = document.querySelector('#editForm');
            const { elements } = formNode;
            let dataObject = {};
            save.classList.add("edit__save_disabled");
            save.insertAdjacentHTML("afterbegin", "<span class='submit-spinner'></span>")

            Array.from(elements).forEach((element) => {
                switch (element.id) {
                    case "idCourse":
                        dataObject.id = element.value;
                        break;
                    case "title":
                        dataObject.title = element.value;
                        break;
                    case "date":
                        dataObject.date = element.value;
                        break;
                    case "duration":
                        dataObject.duration = Utils.getTimeInMinutes(element.value);
                        break;
                    case "description":
                        dataObject.description = element.value;
                        break;
                }            
            })
            dataObject.authors = [];

            const authors = document.querySelectorAll(".author__name");
            if (authors) {
                authors.forEach(nameAuthor => {
                    dataObject.authors.push(nameAuthor.textContent)
                })
            }

            this.saveCourse(dataObject);
            this.cancelCourse();
        })
    }
}