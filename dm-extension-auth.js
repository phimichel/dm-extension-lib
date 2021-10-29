import * as k from "./keycloak.js";

//token, authUrl, realm, clientId, clientSecret, subjectIssuer
export async function exchangeToken(options) {
  const params = {
    client_id: options.clientId,
    client_secret: options.clientSecret,
    grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
    subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
    requested_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
    subject_token: options.token,
    subject_issuer: options.subjectIssuer,
  };

  const response = await fetch(options.authUrl, {
    method: "POST",
    body: new URLSearchParams(params),
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

export async function exchangeTokenAndInitKeycloak(options, kcInstance) {
  // 1. exchange token
  const tokenData = await exchangeToken(options);
  if (tokenData) {
    //2. init keycloak with exchanged token
    return kcInstance.init({
      token: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      enableLogging: true,
      checkLoginIframe: false,
    });
  }
  return Promise.reject(new Error('got no token from exchange'));
}
