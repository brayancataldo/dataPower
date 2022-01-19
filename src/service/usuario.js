import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const Cadastrar = async (data) => {
    const response = await axios.post('http://localhost:8080/dataPower/usuario/save', data)
    setCookiesSessionData(response.data)
    return 
}

const setCookiesSessionData = (data) => {
    cookies.set(
        'userSession',
        {data},
        { path: '/' }
      );
}

export const getCookieSessionData = () => {
    return cookies.get('userSession');
  };

// export const Login = async (data) => {
//     return await axios.post('http://localhost:8080/dataPower/save', data)
// }