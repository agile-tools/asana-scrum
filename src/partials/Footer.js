import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="container">
        <footer>
          © {this.props.year} {this.props.brand}
        </footer>
      </div>
    );
  }
}

Footer.propTypes = {
  year: React.PropTypes.string,
  brand: React.PropTypes.string
};

export default Footer;
