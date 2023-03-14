import axios from 'axios'
import Env from "@ioc:Adonis/Core/Env"

export async function getToken(rol:number): Promise<string>{
    const endpoint = '/api/v1/login'
    let body = {email:'',password:''}
    switch (rol) {
        case 1:
            body['email'] = "admin@mail.com"
            body['password'] = "password"
            break;
        case 2:
            body['email'] = "student@mail.com"
            body['password'] = "password"
        case 3:
            body['email'] = "teacher@mail.com"
            body['password'] = "password"
        default:
            break;
    }
    let axiosResponse = await axios.post(`${Env.get('PATH_APP')}` + endpoint, body)
    return axiosResponse.data['token']
}