

export interface MessageInterface {
    text: string;
    isGpt: boolean;
    info?: {
        userScore: number;
        message: string;
        errors: string[];
    },
    audioUrl?: string; // Optional property to hold the URL of the audio file 
   
}