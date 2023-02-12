const getJWTCookie = () => {
  let token = (decodeURIComponent(document.cookie) as string)
    .split(';')
    .filter((c) => c.trim().startsWith('jwt'));

  return token[0] ? token[0].trim().split('=')[1] : '';
};

export default getJWTCookie;
