import axios from './axios'

const Csrf = {
     getCookie() {
          axios.get("/csrf-cookie");
     }
}
export default Csrf