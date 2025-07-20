import { OrthographyResponse } from "@interfaces/orthography.response";
import { environment } from "environments/environment";



export const orthographyUseCase = async( prompt: string) => {
    try {
        
        const resp = await fetch(`${environment.backendApi}/orthography-check`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if( !resp.ok ) throw new Error('Failed to fetch orthography check');

        const data = await resp.json() as OrthographyResponse;

        return {
            ok: true,
            ...data
        }

    } catch (error) {
        console.error('Error in orthography use case:', error);
        return{
            ok: false,
            userScore: 0,
            errors: [],
            message: 'An error occurred while processing the orthography request.'

        }
        
    }
}