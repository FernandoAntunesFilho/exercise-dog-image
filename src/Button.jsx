import React from 'react';

class Button extends React.Component {
  render() {
    const { fetchDog } = this.props;
    return (
      <button onClick={fetchDog}>Mais um doguineo, por favor!</button>
    )
  }
}

export default Button;
