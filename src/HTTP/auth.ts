import { useMutation } from "@tanstack/react-query";
import { env } from "../env";
import { getAuthRequest } from "./Type/authType";

const baseURL = env.VITE_API_URL;

export function authCreate() {

    return useMutation({
        mutationKey: ['authCreate'],
        mutationFn: async (data: getAuthRequest) => {
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Response from authCreate:', result);
            return result;
        },

        onSuccess: (data) => {
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            // Aqui você pode adicionar lógica para redirecionar o usuário ou atualizar o estado global
        }
    });
}