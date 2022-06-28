import Utils from "../utils/Utils";

export default class CoursesView {
    constructor({deleteCourse, searchCourse, editCourse}) {
        this.search = document.querySelector(".search");
        this.searchButton = document.querySelector(".search__btn");
        this.searchValue = document.querySelector(".search__input");
        this.loadCourses = document.querySelector(".courses__load");
        this.courseCatalog = document.querySelector('#courseCatalog');
        this.deleteCourse = deleteCourse;
        this.searchCourse = searchCourse;
        this.editCourse = editCourse;
        this.coursesLength = "";
        this.coursesListCount = "";
        this.courses = {};
        this.handlerClickLoadMore();
        this.handlerClickSearch();
    }

    coursesList(courses) {
        this.courses = Object.assign({}, courses);
        this.coursesLength = courses.skills.length;
        this.coursesListCount = this.coursesListAdd(courses, 0, this.coursesLength, 10);

        this.search.classList.remove("search_hidden");
        this.loadCourses.classList.remove("courses__load_hidden");

        if (this.coursesLength <= 10) {
            this.loadCourses.classList.add("courses__load_disabled")
        } else {
            this.loadCourses.classList.remove("courses__load_disabled")
        }
    }

    coursesListAdd(courses, index, coursesLength, amount) {
        let coursesContent = {};
        let skills = [];
        let count = (coursesLength >= amount) ? amount : coursesLength;

        for (let i = index; i < (index + count); i++) {
            courses.skills[i].duration = Utils.getTimeInHours(courses.skills[i].duration);
            skills.push(courses.skills[i]);
        }

        coursesContent.skills = skills;
        this.coursesListView(coursesContent);

        return (coursesLength - count);
    }

    coursesListView(courses) {      
        let source = document.getElementById("entry-template").innerHTML;
        let template = Handlebars.compile(source);
        let context = courses;
        let html = template(context);

        this.courseCatalog.insertAdjacentHTML("beforeend", html);

        this.handlerClickDelete();
        this.handlerClickEdit();            
    }

    handlerClickDelete() {
        const courseDeleteButtons = document.querySelectorAll(".course__delete");

        courseDeleteButtons.forEach(courseCatalogItem => {
            courseCatalogItem.addEventListener("click", () => {
                const deleteCourse = confirm("Are you sure?");
                if (deleteCourse) {
                    this.courseCatalog.innerHTML = "";
                    this.search.classList.add("search_hidden");
                    this.loadCourses.classList.add("courses__load_hidden");
                    this.deleteCourse(courseCatalogItem.parentNode.parentNode.id);
                    if (this.loadCourses.classList.contains("courses__load_disabled")) {
                        this.loadCourses.classList.remove("courses__load_disabled")
                    }
                }
            });
        })
    }

    handlerClickEdit() {
        const courseEditButtons = document.querySelectorAll(".course__edit");

        courseEditButtons.forEach(courseCatalogItem => {
            courseCatalogItem.addEventListener("click", () => {
                this.editCourse(courseCatalogItem.parentNode.parentNode.id);
            });
        })
    }

    handlerClickSearch() {
        this.searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            const searchValue = this.searchValue.value.trim().toLowerCase();
            if (searchValue !== '') {
                this.courseCatalog.innerHTML = "";
                this.searchCourse(searchValue);
            } else {
            }
        })
    }

    handlerClickLoadMore() {    
        this.loadCourses.addEventListener("click", () => {
            this.coursesListCount = this.coursesListAdd(this.courses, this.coursesLength - this.coursesListCount, this.coursesListCount, 5);

            if (this.coursesListCount === 0) {
                this.loadCourses.classList.add("courses__load_disabled");
            }
        })
    }
}