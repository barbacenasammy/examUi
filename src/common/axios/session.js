const key = process.env.REACT_APP_SESSION_KEY;
const sessionService = {
     create: (data) => {
          localStorage.setItem(key, JSON.stringify(data));
     },
     get: () => {
          const value = localStorage.getItem(key);

          return value && JSON.parse(value);
     },
     destroy: () => {
          localStorage.removeItem(key);
     },
     token: () => {
          return false;
     }
};

export default sessionService;