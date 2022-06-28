import CoursesRequests from "./CoursesRequests";
import CoursesView from "./CoursesView";
import API from "../utils/API";
export default class Courses {
    constructor () {
        this.coursesRequests = new CoursesRequests();
        this.api = new API();
        this.view = new CoursesView(this.handlers());
        this.loadCourses();             
    }

    loadCourses() {
        this.api.getData("skills")
            .then(courses => this.setCourses(courses))     
    }

    setCourses(courses) {
        this.view.coursesList(courses);
    }

    handlers() {
        return {
            deleteCourse: async (courseId) => {
                await this.coursesRequests.deleteCourse(courseId);
                this.loadCourses();
            },
            searchCourse: async (valueInput) => {
                await this.coursesRequests.searchCourse(valueInput)
                    .then(courses => this.setCourses(courses));
            },
            editCourse: (courseId) => {
                location.href = `${location.href}edit.html#id=${courseId}`
            }
        }
    }   
}