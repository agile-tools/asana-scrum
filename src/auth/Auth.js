import React from 'react';
import config from '../../config';
import './auth.scss';

import Asana from 'asana';

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }
  componentWillMount() {
    const client = Asana.Client.create({
      clientId: config.asana.oAuth.client_id,
      redirectUri: config.asana.oAuth.redirect_uri
    });

    // Configure the way we want to use Oauth. This auto-detects that we're
    // in a browser and so defaults to the redirect flow, which we want.
    client.useOauth();

    client.authorize().then(() => {
      // The client is authorized! Make a simple request.
      return client.users.me().then((me) => {
        this.setState({
          name: me.name
        });
        console.log('Hello ' + me.name);
      });
    }).catch((err) => {
      console.log('An error occurred', err);
    });
  }

  render() {
    return (
      <div className="auth-container">
        { this.state.name ?
          <div>
            <h3>Hello <span className="name">{this.state.name}</span></h3>
          </div>
        : <a href={config.asana.oAuth.url}>
           <img src="/public/images/asana-oauth.png"></img>
          </a>
        }
      </div>
    );
  }
}

export default Auth;
