import * as k from "./keycloak.js";

//token, authUrl, realm, clientId, clientSecret, subjectIssuer
export async function exchangeToken(options) {
  var settings = {
    async: true,
    crossDomain: true,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
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

  // const tokenExchangeAdapter = {
  //     login(options) {
  //         console.log("Login called")
  //     }
  // }

  // var keycloak = new Keycloak({
  //     url: authUrl,
  //     realm,
  //     clientId,
  //     clientSecret,
  // });
  // console.log(k)
  // var keycloak = new Keycloak({
  //     adapter: tokenExchangeAdapter,
  // })

  // keycloak.init()
}
