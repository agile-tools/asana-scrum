import React from 'react';
import config from '../../config';
import './auth.scss';
import Asana from 'asana';
import cookie from 'react-cookie';

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loaded: false
    };
  }
  componentWillMount() {
    const client = Asana.Client.create({
      clientId: config.asana.oAuth.client_id,
      redirectUri: config.asana.oAuth.redirect_uri
    });
    const token = cookie.load('token');
    if (token) {
      client.useOauth({ credentials: token });
      client.users.me().then((me) => {
        this.setState({
          name: me.name,
          loaded: true
        });
        this.props.onAuthenticated(client);
      }).catch((err) => {
        console.log('Error fetching user: ' + err);
      });
    } else {
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    return (
      <div className="auth-container">
        <div style={this.state.loaded ? { display: 'block' } : { display: 'none' }}>
        { this.state.name ?
          <div>
            <h3>Hello <span className="name">{this.state.name}</span></h3>
          </div>
        : <a href={config.asana.oAuth.url}>
           <img src="/public/images/asana-oauth.png"></img>
          </a>
        }
        </div>
        <div style={!this.state.loaded ? { display: 'block' } : { display: 'none' }}>
          <span className="loader">Loading...</span>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  onAuthenticated: React.PropTypes.func
};

export default Auth;
