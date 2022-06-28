import API from "../utils/API";
export default class CoursesRequests {
    constructor() {
        this.api = new API();
    }

    deleteCourse(courseId) {
        const idValue = {
            courseId
        };

        return this.api.postData("deleteCourse", idValue)
            .then((data) => {
                return data;
            });
    }

    searchCourse(value) {
        const valueInput = {
            value
        };

        return this.api.postData("searchCourses", valueInput)
            .then((data) => {
                return data;
            });
    }
}