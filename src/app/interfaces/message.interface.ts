

export interface MessageInterface {
    text: string;
    isGpt: boolean;
    info?: {
        userScore: number;
        message: string;
        errors: string[];
    },
    audioUrl?: string;
    imageInfo?: {
        url: string;
        alt: string;
    }
}