export async function getToken(): Promise<string> {
    const token: string | null = await localStorage.getItem('token');

    if (!token) {
        throw Error('Você não possui permissão!');
    }

    return token;
}

export function deleteToken(){

    localStorage.removeItem('token');
}
