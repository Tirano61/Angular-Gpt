import { environment } from "environments/environment";


export const createThreadUseCase = async() => {
    try {
        const resp = await fetch(`${ environment.assistantApi }/create-thread`, {method: 'POST'});

        const { id } = await resp.json() as {id:string};
        console.log('Thread created with ID:', id);
        return id;
    } catch (error) {
        throw new Error('Error al crear la thread ID');
    }
}