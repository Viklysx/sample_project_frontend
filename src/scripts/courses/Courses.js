import CoursesAPI from "./CoursesAPI";
import CoursesView from "./CoursesView";
export default class Courses {
    constructor () {
        this.coursesAPI = new CoursesAPI();
        this.view = new CoursesView(this.handlers());
        this.loadCourses();             
    }

    loadCourses() {
        this.coursesAPI.getData("skills")
            .then(courses => this.setCourses(courses))     
    }

    setCourses(courses) {
        this.view.coursesList(courses);
    }

    handlers() {
        return {
            deleteCourse: async (courseId) => {
                await this.coursesAPI.deleteCourse(courseId);
                this.loadCourses();
            },
            searchCourse: async (valueInput) => {
                await this.coursesAPI.searchCourse(valueInput)
                    .then(courses => this.setCourses(courses));
            },
            editCourse: (courseId) => {
                location.href = `${location.href}/edit.html#id=${courseId}`
            }
        }
    }   
}