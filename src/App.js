import React, { Component } from 'react';
import './App.css';




const PlayerScreen = ({number, word, isRevealed, onReveal, onHide, onForward, onBack}) => (
  <div>
    <button onClick={onBack}>
      Joueur précédent
    </button>
    <h1>Joueur n°{number}</h1>
    <button onClick={onForward}>
      Joueur suivant
    </button>
    <div>
      {isRevealed &&
        <div onClick={onHide}>
          {
            word ? 
              <pre>{word}</pre>
              <p>Contre-espion</p>
          }
        </div>
      }
      {isRevealed || 
        <button onClick={onReveal}>
          Clique-ici pour révéler
        </button>
      }
    </div>
  </div>
)


class StatefulPlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRevealed: false
    };
  }
  
  render() {
    return <PlayerScreen
      number={this.props.number}
      word={this.props.word}
      onBack={this.props.onBack}
      onForward={this.props.onForward}
      isRevealed={this.state.isRevealed}
      onReveal={() => {this.setState({isRevealed: true});}}
      onHide={() => {this.setState({isRevealed: false});}}
    />
  }
}

const PlayerScreens = ({words, currentPlayerNumber, onBack, onForward}) => (
  <PlayerScreen
    word={words[currentPlayerNumber]}
    number={currentPlayerNumber + 1}
    onBack={onBack}
    onForward={onForward}
  />
);



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">test</h1>
        </header>
        <p className="App-intro">
          testtest
        </p>
      </div>
    );
  }
}

export default App;
