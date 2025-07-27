export type ValidationIssue = {
    path: string;
    message: string[];
};

export class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    issues: ValidationIssue[];

    constructor(issues: ValidationIssue[]) {
        super('Validation Failed');
        this.issues = issues;
    }
}
