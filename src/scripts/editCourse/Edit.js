import EditRequest from "./EditRequest";
import API from "../utils/API";
import EditView from "./EditView";

export default class Edit {
    constructor() {
        this.idCourse = location.hash.split("=")[1];
        this.editRequest = new EditRequest();
        this.api = new API();
        this.view = new EditView(this.idCourse)
        this.loadDataCourse(); 
    }

    async loadDataCourse() {       
        await this.editRequest.loadCourse(this.idCourse)
            .then(courseData => this.setDataCourse(courseData)) 
    }

    setDataCourse(data) {
        this.view.courseContentView(data);
    }
}