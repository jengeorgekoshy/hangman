import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import img7 from './7.jpg';
import { ENGLISH_WORDS } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6, img7],
  };

  constructor(props) {
    super(props);
    let randWord =
      ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randWord,
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.wrongGuess = this.wrongGuess.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  playAgain() {
    let randWord =
      ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randWord,
    });
  }
  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    let flag = 1;
    this.state.answer.split('').map((elem) => {
      if (this.state.guessed.has(elem)) {
        console.log('ok');
      } else {
        flag = 0;
      }
    });
    if (this.state.nWrong !== 7 && flag !== 1) {
      return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr, index) => (
        <button
          className="keys"
          key={index}
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
        >
          {ltr}
        </button>
      ));
    } else {
      let flag = 1;
      this.state.answer.split('').map((elem) => {
        if (this.state.guessed.has(elem)) {
          console.log('ok');
        } else {
          flag = 0;
        }
      });
      if (flag === 1) {
        return (
          <div>
            <p>You guessed it correctly !!!</p>
            <p>The word was {this.state.answer}</p>
            <button onClick={this.playAgain} className="PlayAgain">
              Play Again
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <p>You lost!!!</p>
            <p>The word was {this.state.answer}</p>
            <button onClick={this.playAgain} className="PlayAgain">
              Play Again
            </button>
          </div>
        );
      }
    }
  }

  wrongGuess() {
    return <p>No:of wrong guesses : {this.state.nWrong}</p>;
  }

  /** render: render game */
  render() {
    let a = this.state.nWrong + ' wrong guesses';
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <div className="content">
          <img src={this.props.images[this.state.nWrong]} alt={a} />
          <div className="right">
            <div className="Hangman-word">{this.guessedWord()}</div>
            {this.wrongGuess()}
            <div className="Hangman-btns">{this.generateButtons()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
