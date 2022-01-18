import axios from 'axios'

export const Cadastro = async (data) => {
    return await axios.post('http://localhost:8080/dataPower/usuario/save', data)
}

// export const Login = async (data) => {
//     return await axios.post('http://localhost:8080/dataPower/save', data)
// }