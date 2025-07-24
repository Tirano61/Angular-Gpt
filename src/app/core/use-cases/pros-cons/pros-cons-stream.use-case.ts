import { environment } from 'environments/environment';
import { prosConsUseCase } from './pros-cons.use-case';
import { ProsConsResponse } from '@interfaces/pros-cons.response';


export async function* prosConsStreamUseCase (prompt: string) {
    try {
        const resp = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
    
        if( !resp.ok ) throw new Error('Failed to fetch pros-cons-discusser check');
    
        const reader = resp.body?.getReader();
        if (!reader) throw new Error('Failed to get reader from response body');

        const decoder = new TextDecoder();
        let text = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            text += chunk;
            yield text;
        }

        return text;
        
    } catch (error) {
        return null;
    }
}