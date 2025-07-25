
import { TranslateResponse } from "@interfaces/translate.response";
import { environment } from "environments/environment";

export const translateUseCase = async( prompt: string, lang: string) => {
    try {
        
        const resp = await fetch(`${environment.backendApi}/translate`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, lang }),
        });

        if( !resp.ok ) throw new Error('Failed to fetch translate check');

        const { message } = await resp.json() as TranslateResponse;

        return {
            ok: true,
            message: message
        }

    } catch (error) {
        console.error('Error intranslate use case:', error);
        return{
            ok: false,
            message: 'No se pudo realizar la traducción !!!',
        }
    }
}