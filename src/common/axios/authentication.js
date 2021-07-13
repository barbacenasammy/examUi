import history from '../utils/history';
import sessionService from './session';

const authenticateUser = {
     login: (data) => {
          // axios.get('/subject')
          //      .then(response => console.log(response.data))
          //      .catch(error => console.log(error))

          sessionService.create('sdjfljasdkfhcnasdhfksjhsjdh');
          history.push('/')
     },
     logout: () => {
          sessionService.destroy();
          history.push('/login');
     },
     authenticated: () => {
          const token = sessionService.get()
          return token;
     }



}
export default authenticateUser