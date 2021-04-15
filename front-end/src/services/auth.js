
export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const USER_NAME = '&user-name';
export const CLIENT_EMAIL = '&client-email';


export const login = token => { localStorage.setItem(TOKEN_KEY,token); }
export const logout = () => { localStorage.clear() };

export const setIdUsuario = id => localStorage.setItem(ID_USUARIO,id);
export const getIdUsuario = () => localStorage.getItem(ID_USUARIO);

export const setNomeUsuario = nome => localStorage.setItem(USER_NAME,nome);
export const getNomeUsuario = () => localStorage.getItem(USER_NAME);

export const setEmailUsuario = email => localStorage.setItem(CLIENT_EMAIL,email);
export const getEmailUsuario = () => localStorage.getItem(CLIENT_EMAIL);

export const getToken = () => localStorage.getItem(TOKEN_KEY)