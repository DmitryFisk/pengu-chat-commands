import config from "./config";

export default class Command {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;

        this.config = config;
    }
}
