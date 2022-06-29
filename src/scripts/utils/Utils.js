export default class Utils {
    constructor() {}

    static getTimeInHoursAndMinutes(minutes) {
        return `${Math.trunc(minutes/60)} h ${minutes % 60} min`;
    };

    static getTimeInMinutes(string) {
        let hours = Number(string.split("h")[0].trim());
        let minutes = string.split("min")[0].trim();
        minutes = Number(minutes.split("h")[1].trim());

        return hours * 60 + minutes;
    };
}