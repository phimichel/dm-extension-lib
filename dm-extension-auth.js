import Keycloak, { KeycloakAdapter }  from './keycloak.js'

export function exchangeToken(token, authUrl, realm, clientId, clientSecret, subjectIssuer) {
    var settings = {
        async: true,
        crossDomain: true,
        url: authUrl,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
            subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
            requested_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
            subject_token: token,
            subject_issuer: subjectIssuer,
        }
    }

    const tokenExchangeAdapter = {
        login(options) {
            console.log("Login called")
        }
    }

    // var keycloak = new Keycloak({
    //     url: authUrl,
    //     realm,
    //     clientId,
    //     clientSecret,
    // });
    var keycloak = new Keycloak({
        adapter: tokenExchangeAdapter,
    })

    keycloak.init()
}