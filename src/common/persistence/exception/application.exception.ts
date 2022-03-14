export class ApplicationExceptions extends Error {
    constructor(message = 'An unexpected error ocurred.'){
        super(message);
    }
}