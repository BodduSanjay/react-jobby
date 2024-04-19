import Popup from 'reactjs-popup'
import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import ImageItem from '../ImageItem'

import './index.css'

class GameResultView extends Component {
  state = {
    selectedId: '',
    ramdomId: '',
    listOfRPS: [],
    score: 0,
    isClicked: false,
    selectedImage: '',
    ramdomImage: '',
    gameStatus: '',
  }

  componentDidMount() {
    const {choicesList} = this.props
    this.setState({
      listOfRPS: choicesList,
    })
  }

  gameStarted = (id, imageUrl) => {
    const {listOfRPS} = this.state
    const randomNum = Math.floor(Math.random() * listOfRPS.length)
    const selectRandomId = listOfRPS[randomNum].id
    const selectramdomImage = listOfRPS[randomNum].imageUrl
    this.setState(
      {
        selectedId: id,
        selectedImage: imageUrl,
        isClicked: true,
        ramdomId: selectRandomId,
        ramdomImage: selectramdomImage,
      },
      this.setScore,
    )
  }

  setScore = () => {
    const {selectedId, ramdomId} = this.state

    if (selectedId === ramdomId) {
      this.setState({gameStatus: 'drow'})
    } else if (selectedId === 'ROCK' && ramdomId === 'SCISSORS') {
      this.setState(prevState => ({
        gameStatus: 'win',
        score: prevState.score + 1,
      }))
    } else if (selectedId === 'ROCK' && ramdomId === 'PAPER') {
      this.setState(prevState => ({
        gameStatus: 'loss',
        score: prevState.score - 1,
      }))
    } else if (selectedId === 'PAPER' && ramdomId === 'ROCK') {
      this.setState(prevState => ({
        gameStatus: 'win',
        score: prevState.score + 1,
      }))
    } else if (selectedId === 'PAPER' && ramdomId === 'SCISSORS') {
      this.setState(prevState => ({
        gameStatus: 'loss',
        score: prevState.score - 1,
      }))
    } else if (selectedId === 'SCISSORS' && ramdomId === 'PAPER') {
      this.setState(prevState => ({
        gameStatus: 'win',
        score: prevState.score + 1,
      }))
    } else if (selectedId === 'SCISSORS' && ramdomId === 'ROCK') {
      this.setState(prevState => ({
        gameStatus: 'loss',
        score: prevState.score - 1,
      }))
    }
  }

  onClickPlayAgain = () => {
    this.setState({
      isClicked: false,
      gameStatus: '',
    })
  }

  renderDrow = (selectedImage, ramdomImage) => (
    <div>
      <div className="image-container">
        <div className="image-width-cont">
          <h1 className="heading">YOU</h1>
          <img className="image-item" src={selectedImage} alt="your choice" />
        </div>
        <div className="image-width-cont">
          <h1 className="heading">OPPONENT</h1>
          <img className="image-item" src={ramdomImage} alt="opponent choice" />
        </div>
        <div className="result-container">
          <p className="heading">IT IS DROW</p>
          <button
            className="play-btn"
            type="button"
            onClick={this.onClickPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )

  renderWin = (selectedImage, ramdomImage, ramdomId, selectedId) => (
    <div>
      <div className="image-container">
        <img className="image-item" src={selectedImage} alt={selectedId} />
        <img className="image-item" src={ramdomImage} alt={ramdomId} />
        <div className="result-container">
          <p className="heading">YOU WON</p>
          <button
            type="button"
            className="play-btn"
            onClick={this.onClickPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )

  renderLoss = (selectedImage, ramdomImage, ramdomId, selectedId) => (
    <div>
      <div className="image-container">
        <img className="image-item" src={selectedImage} alt={selectedId} />
        <img className="image-item" src={ramdomImage} alt={ramdomId} />
        <div className="result-container">
          <p className="heading">YOU LOSE</p>
          <button
            type="button"
            className="play-btn"
            onClick={this.onClickPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )

  getResults = () => {
    const {gameStatus, selectedImage, selectedId} = this.state

    const {ramdomImage, ramdomId} = this.state
    switch (gameStatus) {
      case 'win':
        return this.renderWin(selectedImage, ramdomImage, ramdomId, selectedId)
      case 'loss':
        return this.renderLoss(selectedImage, ramdomImage, ramdomId, selectedId)
      case 'drow':
        return this.renderDrow(selectedImage, ramdomImage, ramdomId, selectedId)
      default:
        return null
    }
  }

  render() {
    const {score, isClicked, listOfRPS} = this.state
    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="game-name">
            ROCK
            <br />
            PAPER
            <br />
            SCISSORS
          </h1>
          <div className="score-cont">
            <p className="score-para">Score</p>
            <p className="score-para">{score}</p>
          </div>
        </div>
        {isClicked ? (
          <div>{this.getResults()}</div>
        ) : (
          <div>
            <ul className="image-container">
              {listOfRPS.map(image => (
                <ImageItem
                  image={image}
                  key={image.id}
                  gameStarted={this.gameStarted}
                />
              ))}
            </ul>
          </div>
        )}
        <div className="btn-container">
          <Popup
            modal
            trigger={
              <button type="button" className="play-btn">
                Rules
              </button>
            }
          >
            {close => (
              <div className="popup-container">
                <button
                  className="btn-cont"
                  aria-label="Close"
                  type="button"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
                <div className="image-cont">
                  <img
                    className="rules-img"
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}
export default GameResultView
