import { VscGithubInverted } from 'react-icons/vsc'
import { useEffect } from 'react';

import styles from './styles.module.scss';
import { api } from '../../services/api';

type AuthResponse = {
    token: string;
    user : {
        id: string;
        avatar_url:string;
        name: string;
        login: string;
    }
}

export function LoginBox () {
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=4b22ffb07139ae3885b2`;

    async function signIn(githubCode:string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        })

        const { token, user } = response.data;

        localStorage.setItem('@dowhile:token', token);
        console.log(user)
    }
    
    useEffect( () => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');
        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')
            window.history.pushState({}, '', urlWithoutCode)
            signIn(githubCode);
        }
    }, [])

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Login and share your message</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
            <VscGithubInverted size="24" />
            Sign In With Github
            </a>
        </div>
    );
}


