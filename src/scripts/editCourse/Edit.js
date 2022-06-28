import EditRequest from "./EditRequest";
import API from "../utils/API";
import EditView from "./EditView";

export default class Edit {
    constructor() {
        this.editRequest = new EditRequest();
        this.api = new API();
        this.view = new EditView()
        this.loadDataCourse(); 
    }

    async loadDataCourse() {
        const idCourse = location.hash.split("=")[1];
        
        await this.editRequest.loadCourse(idCourse)
            .then(courseData => this.setDataCourse(courseData)) 
    }

    setDataCourse(data) {
        this.view.courseContentView(data);
    }
}