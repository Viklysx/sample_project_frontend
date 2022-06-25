export default class CoursesView {
    constructor({deleteCourse}) {
        this.search = document.querySelector(".search");
        this.loadCourses = document.querySelector(".courses__load");
        this.deleteCourse = deleteCourse;
    }

    coursesList(courses) {        
        let coursesLength = courses.skills.length;
        let coursesListCount = this.coursesListAdd(courses, 0, coursesLength, 10);

        this.search.classList.remove("search_hidden");
        this.loadCourses.classList.remove("courses__load_hidden");

        if (coursesLength <= 10) {
            this.loadCourses.classList.add("courses__load_disabled")
        } else {
            this.loadCourses.addEventListener("click", () => {
                coursesListCount = this.coursesListAdd(courses, coursesLength-coursesListCount, coursesListCount, 5);
                if (coursesListCount === 0) {
                    this.loadCourses.classList.add("courses__load_disabled");
                }           
            })
        }      
    }

    coursesListAdd(courses, index, coursesLength, amount) {
        let coursesContent = {};
        let skills = [];
        let count = (coursesLength >= amount) ? amount : coursesLength;

        for (let i = index; i < (index + count); i++) {
            courses.skills[i].duration = this.getTimeInHours(courses.skills[i].duration);
            skills.push(courses.skills[i]);
        }

        coursesContent.skills = skills;
        this.coursesListView(coursesContent);

        return(coursesLength - count);
    }

    coursesListView(courses) {
        const courseCatalog = document.querySelector('#courseCatalog'); 
        let source = document.getElementById("entry-template").innerHTML;
        let template = Handlebars.compile(source);
        let context = courses;
        let html = template(context);
        
        courseCatalog.insertAdjacentHTML("beforeend", html);

        document.querySelectorAll(".course__delete").forEach(courseCatalogItem => {
            courseCatalogItem.addEventListener("click", () => {
                const deleteCourse = confirm("Are you sure?");
                if (deleteCourse) {
                    courseCatalog.innerHTML = "";
                    this.deleteCourse(courseCatalogItem.parentNode.parentNode.id);
                    if (this.loadCourses.classList.contains("courses__load_disabled")) {
                        this.loadCourses.classList.remove("courses__load_disabled")
                    }
                }
            });
        })
    }

    getTimeInHours(minutes) {
        return `${Math.trunc(minutes/60)} h ${minutes % 60} min`;
    };
}