export default class CoursesAPI {
    constructor() {
        this.url = "http://localhost:4000";
    }

    async posthData(route, data = {}) {
        const response = await fetch(`${this.url}/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async getData(route) {
        const response = await fetch(`${this.url}/${route}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    }

    deleteCourse(courseId) {
        const idValue = {
            courseId
        };

        return this.posthData("deleteCourse", idValue)
            .then((data) => {
                return data;
            });
    }
}