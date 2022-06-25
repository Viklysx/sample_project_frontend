import CoursesAPI from "./CoursesAPI";
import CoursesView from "./CoursesView";

export default class Courses {
    constructor () {
        this.coursesAPI = new CoursesAPI();
        this.view = new CoursesView(this.handlers());
        this.loadCourses();             
    }

    loadCourses() {
        // const courses = this.coursesAPI.getAllCourses();
        // this.setCourses(courses);
        this.coursesAPI.getData("skills")
            .then(courses => this.setCourses(courses))
    }

    setCourses(courses) {
        this.view.coursesList(courses);
    }

    handlers() {
        return {
            deleteCourse: async (courseId) =>{
                await this.coursesAPI.deleteCourse(courseId);
                this.loadCourses();
            }
        }
    }

    
}