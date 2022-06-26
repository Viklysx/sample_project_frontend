export default class Utils {
    constructor() {}

    static getTimeInHours(minutes) {
        return `${Math.trunc(minutes/60)} h ${minutes % 60} min`;
    };
}