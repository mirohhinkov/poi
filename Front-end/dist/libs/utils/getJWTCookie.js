const getJWTCookie = () => {
    let token = decodeURIComponent(document.cookie)
        .split(';')
        .filter((c) => c.trim().startsWith('jwt'));
    return token[0] ? token[0].trim().split('=')[1] : '';
};
export default getJWTCookie;
//# sourceMappingURL=getJWTCookie.js.map