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
   
    saveCourse(dataCourse) {
        console.log(dataCourse)
        return this.api.postData("saveCourse", dataCourse)
            .then((data) => {
                return data;
            });
    }
}