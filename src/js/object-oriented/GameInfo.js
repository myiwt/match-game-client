import Ball from './Ball'

// some default values
const defaultConfig = {
  width: 500,
  height: 100
}

// classes are functions that create objects
// and we're exporting it to use in another file
export class GameInfo {
  // constructor function is the equivalent of
  // the init function
  // table at bottom of game showing match balls, current user & score
  constructor (canvasId = 'gameInfo', config) {
    // get the canvas and context
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')

    // merge default config & any passed in config
    this.config = {
      ...defaultConfig,
      ...config
    }
    
    // set the canvas size
    this.canvas.width = this.config.width 
    this.canvas.height = this.config.height

    // begin update loop
    // use an arrow function so that we can use `this` properly
    //document.addEventListener('DOMContentLoaded', () => this.update())

    var event = new CustomEvent('firstBall', Ball)
    
    this.canvas.addEventListener('click', (event) => {
        console.log("game info clicked")
    })
  }
}

/* drawFirstBall(ball: Ball) {
    ball.draw
} */


export default GameInfo
