export interface FormData {
    name: {
        firstName: string;
        lastName: string;
    };
    age: number | null;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    stepCount: number;
    phoneNumbers: string[];
}