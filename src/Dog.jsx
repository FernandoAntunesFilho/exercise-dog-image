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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.imgUrl.includes('terrier')) return false;
    return true;
  }

  componentDidUpdate(prevPros, prevState) {
    if (this.state.imgUrl !== '' && this.state.imgUrl !== prevState.imgUrl) {
      const dogArray = this.state.imgUrl.split('/');
      alert(dogArray[4].toUpperCase());
    }
  }

  async fetchDog() {
    this.setState({ loadStatus: true },
      async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const responseJson = await response.json()
        this.setState(({ imagesList }) => ({
          imgUrl: responseJson.message,
          imagesList: [...imagesList, responseJson.message],
          loadStatus: false,
        }));
        localStorage.setItem('imgUrl', this.state.imgUrl);
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
