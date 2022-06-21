export default class CoursesView {
    constructor() {
        this.search = document.querySelector(".search");
        this.coursesLoad = document.querySelector(".courses__load");
    }

    coursesList(courses) {        
        let coursesLength = courses.skills.length;
        let coursesListCount = this.coursesListAdd(courses, 0, coursesLength);

        this.search.classList.remove("search_hidden");
        this.coursesLoad.classList.remove("courses__load_hidden");

        this.coursesLoad.addEventListener("click", () => {
            coursesListCount = this.coursesListAdd(courses, coursesLength-coursesListCount, coursesListCount);
            if (coursesListCount === 0) {
                this.coursesLoad.classList.add("courses__load_disabled");
            }           
        })
    }

    coursesListAdd(courses, index, coursesLength) {
        let coursesContent = {};
        let skills = [];
        let count = (coursesLength >= 10) ? 10 : coursesLength;

        for (let i = index; i < (index + count); i++) {
            courses.skills[i].duration = this.getTimeInHours(courses.skills[i].duration);
            skills.push(courses.skills[i]);
        }

        coursesContent.skills = skills;
        this.coursesListView(coursesContent);

        return(coursesLength - count);
    }

    coursesListView(courses) {
        const courseCatalog = document.querySelector("#loadMore");
        let source = document.getElementById("entry-template").innerHTML;
        let template = Handlebars.compile(source);
        let context = courses;
        let html = template(context);

        // courseCatalog.innerHTML = "";
        courseCatalog.insertAdjacentHTML("beforebegin", html);

        document.querySelectorAll(".course__delete").forEach(courseCatalogItem => {
            courseCatalogItem.addEventListener("click", () => {
                const deleteCourse = confirm("Are you sure?");
                if (deleteCourse) {

                }
            });
        })
    }

    getTimeInHours(minutes) {
        return `${Math.trunc(minutes/60)} h ${minutes % 60} min`;
    };
}