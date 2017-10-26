import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash';
import availableWordsString from './words';

const availableWords = availableWordsString
  .split('\n')
  .map(s => s.trim())
  .filter((s) => s.length > 0);
window.availableWords = availableWords;

const secretWord = _.sample(availableWords);

class PlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRevealed: false
    };
  }
  
  reveal = () => {
    this.setState({isRevealed: true});
  }

  hide = () => {
    this.setState({isRevealed: false});
  }

  render() {
    const {number, word, onForward, onBack} = this.props;
    const {isRevealed} = this.state;
    return <div className="screen player-screen">
      <div className="player-title">
        {
          onBack && <button onClick={() => {this.hide(); onBack();}}>
            {'<<'}
          </button>
        }
        <h1>Joueur n°{number}</h1>
        {
          onForward && <button onClick={() => {this.hide(); onForward();}}>
            >>
          </button>
        }
      </div>
      <div className="revealer">
        {isRevealed ?
          (word ? 
            <pre onClick={this.hide}>{word}</pre> :
            <p onClick={this.hide}>Contre-espion</p>
          ) :
          <button onClick={this.reveal}>
          Clique pour révéler
        </button>
        }
      </div>
    </div>;
  }
}

const IntroScreen = ({onChoosingNumberOfPlayers}) => {
  const options = _.range(3, 20);  
  return <div className="screen intro-screen">
    <h1>Test</h1>
    <p>Pick a number of players</p>
    <select onChange={(e) => onChoosingNumberOfPlayers(parseInt(e.target.value, 10))}>
      {
        options.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))
      }
    </select>    
  </div>
};

class FullSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPlayers: null,
      currentPlayerIndex: null,
      words: null
    };
  }

  onChoosingNumberOfPlayers = (nb) => {
    const words = new Array(nb);
    words.fill(null);
    words[0] = this.props.secretWord;
    words[1] = this.props.secretWord;
    this.setState({
      numberOfPlayers: nb,
      currentPlayerIndex: 0,
      words: _.shuffle(words)
    })
  };

  onBack = () => {
    this.setState({
      currentPlayerIndex: this.state.currentPlayerIndex - 1
    })
  }

  onForward = () => {
    this.setState({
      currentPlayerIndex: this.state.currentPlayerIndex + 1
    })
  }

  render() {
    if (this.state.numberOfPlayers === null){
      return <IntroScreen
        onChoosingNumberOfPlayers={this.onChoosingNumberOfPlayers}
      />
    }
    return <PlayerScreen
      number={this.state.currentPlayerIndex + 1}
      word={this.state.words[this.state.currentPlayerIndex]}
      onBack={this.state.currentPlayerIndex > 0 ? this.onBack : null}
      onForward={this.state.currentPlayerIndex < this.state.numberOfPlayers - 1 ? this.onForward : null}
    />;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <FullSteps secretWord={secretWord}/>
      </div>
    );
  }
}

export default App;
