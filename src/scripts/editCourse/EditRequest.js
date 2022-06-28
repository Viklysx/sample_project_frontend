import API from "../utils/API";

export default class EditRequest {
    constructor() {
        this.api = new API();
    }

    loadCourse(courseId) {
        const idValue = {
            courseId
        };

        return this.api.postData("loadCourse", idValue)
            .then((data) => {
                return data;
            });
    }
   
    saveCourse(courseId) {
        const idValue = {
            courseId
        };

        return this.api.postData("saveCourse", idValue)
            .then((data) => {
                return data;
            });
    }
}