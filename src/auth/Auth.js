import React from 'react';
import config from '../../config';
// import Asana from 'asana';

class Auth extends React.Component {
  componentWillMount() {
    // const client = Asana.Client.create({
    //   clientId: config.asana.oAuth.client_id,
    //   redirectUri: config.asana.oAuth.redirect_uri
    // });

    // Configure the way we want to use Oauth. This auto-detects that we're
    // in a browser and so defaults to the redirect flow, which we want.
    // client.useOauth();

    // client.authorize().then(() => {
    //   // The client is authorized! Make a simple request.
    //   return client.users.me().then((me) => {
    //     console.log('Hello ' + me.name);
    //   });
    // }).catch(function(err) {
    //   console.log('An error occurred', err);
    // });
  }

  render() {
    return (
      <div>
        <a href={config.asana.oAuth.url}>
          <img src="/public/images/asana-oauth.png"></img>
        </a>
      </div>
    );
  }
}

export default Auth;
