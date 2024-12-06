export const isUserAuthenticated = () => {
    return (localStorage.getItem('user') !== null) && (localStorage.getItem('token') !== null);
}