import getJWTCookie from './getJWTCookie.js';
const setHeaders = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', `Bearer ${getJWTCookie()}`);
    headers.append('cookie', document.cookie);
    return headers;
};
export default setHeaders;
//# sourceMappingURL=setHeaders.js.map