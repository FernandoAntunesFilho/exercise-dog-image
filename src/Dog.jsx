import React from 'react';
import './Dog.css';
import Button from './Button';

class Dog extends React.Component {
  constructor() {
    super()

    this.state = { 
      imgUrl: '',
      imagesList: [],
      loadStatus: true,
    }

    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  async fetchDog() {
    this.setState({ loadStatus: true },
      async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const responseJson = await response.json()
        this.setState(({ imagesList }) => ({
          imagesList: [...imagesList, responseJson.message],
          loadStatus: false,
        }));
      })
  }

  render() {
    const { imagesList, loadStatus } = this.state;
    const loadingText = <span>Loading...</span>
    return (
      <div>
        <Button fetchDog={this.fetchDog} />
        <p>{ loadStatus === true ? loadingText : "" }</p>
        {imagesList.map((atual, index) => <img
          className='doguineo'
          src={atual} key={index}
          alt='Imagem de um cachorro'
        />)}
      </div>
    )
  }
}

export default Dog;
