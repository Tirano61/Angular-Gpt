
import { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment";

export const prosConsUseCase = async( prompt: string) => {
    try {
        
        const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if( !resp.ok ) throw new Error('Failed to fetch pros-cons-discusser check');

        const data = await resp.json() as ProsConsResponse;

        return {
            ok: true,
            ...data
        }

    } catch (error) {
        console.error('Error in pros-cons-discusser use case:', error);
        return{
            ok: false,
            role: '',
            content: 'An error occurred while processing the pros-cons request.',
            info: undefined
        }
        
    }
}