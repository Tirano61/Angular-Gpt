

export interface MessageInterface {
    text: string;
    isGpt: boolean;
    info?: {
        userScore: number;
        message: string;
        errors: string[];
    } // Optional property to hold additional information, such as response metadata
}