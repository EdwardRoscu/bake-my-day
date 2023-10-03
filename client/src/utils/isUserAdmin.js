const isUserAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.isAdmin;
};

export default isUserAdmin;