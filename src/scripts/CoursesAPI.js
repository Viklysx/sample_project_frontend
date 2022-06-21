export default class CoursesAPI {
    constructor() {

    }

    getAllCourses() {
        let skills;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:4000/skills", false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();
        if (xhr.status === 200) {
            skills = JSON.parse(xhr.response);
            return skills;
        };
    }
}