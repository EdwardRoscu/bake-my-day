const isUserLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default isUserLoggedIn;
