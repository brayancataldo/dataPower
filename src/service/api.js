import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const api = axios.create({
  baseURL: "https://data-power-api.herokuapp.com/dataPower",
});


export const Cadastrar = async (data) => {
  try {
    const response = await api.post('/usuario/save', data)
    setCookiesSessionData(response.data)
  } catch (error) {
    return false
  }
    return true
}

export const Entrar = async (nomeUsuario, senha) => {
  try {
    const response = await api.get(`/usuario/login?nomeUsuario=${nomeUsuario}&senha=${senha}`)
  setCookiesSessionData(response.data)
  } catch (error) {
    return false
  }
    return true
}

export const setCookiesSessionData = (data) => {
    cookies.set(
        'userSession',
        data,
        { path: '/' }
      );
}

export const Logout = () => {
  cookies.remove('userSession');
}

export const getCookieSessionData = () => {
    return cookies.get('userSession');
  };


export default api;