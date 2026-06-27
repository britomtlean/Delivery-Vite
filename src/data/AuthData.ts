
export class AuthData {
    static async login(user: Record<string, any>, url: string): Promise<string> {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            credentials: 'include',
        });

        const data = await res.text();

        if (!res.ok) {
            throw Error(data);
        }

        localStorage.setItem('token', JSON.stringify(data));

        return data;
    }

    static async getProfile(token: string, http: string): Promise<Record<string, any>> {
        const res = await fetch(http, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw Error(data);
        }

        return data;
    }
}
