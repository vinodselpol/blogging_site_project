// auth.js
export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('isAuthenticated'));
  };
  
export const signIn = () => {
    localStorage.setItem('isAuthenticated', 'true');


  };
  
export const signOut = () => {
    localStorage.removeItem('isAuthenticated');
  };
  