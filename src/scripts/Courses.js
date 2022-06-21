import CoursesAPI from "./CoursesAPI";
import CoursesView from "./CoursesView";

export default class Courses {
    constructor () {
        this.courses = new CoursesAPI();
        this.view = new CoursesView();
        this.loadCourses();             
    }

    loadCourses() {
        const courses = this.courses.getAllCourses();
        this.setCourses(courses);
    }

    setCourses(courses) {
        this.view.coursesList(courses);
    }
}