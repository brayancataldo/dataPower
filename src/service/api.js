import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const Cadastrar = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/dataPower/usuario/save', data)
    setCookiesSessionData(response.data)
  } catch (error) {
    return false
  }
    return true
}

export const Entrar = async (nomeUsuario, senha) => {
  try {
    const response = await axios.get(`http://localhost:8080/dataPower/usuario/login?nomeUsuario=${nomeUsuario}&senha=${senha}`)
  setCookiesSessionData(response.data)
  } catch (error) {
    return false
  }
    return true
}

const setCookiesSessionData = (data) => {
    cookies.set(
        'userSession',
        data,
        { path: '/' }
      );
}

export const Logout = () => {
  cookies.remove('userSession')
}

export const getCookieSessionData = () => {
    return cookies.get('userSession');
  };

const api = axios.create({
  baseURL: "http://localhost:8080/dataPower",
});

export default api;