// some default values
const defaultConfig = {
  width: 500,
  height: 500
}

// classes are functions that create objects
// and we're exporting it to use in another file
export class StartScreen {
  // constructor function is the equivalent of
  // the init function
  

  // table at bottom of game showing match balls, current user & score
  constructor (canvasId = 'startGame', config) {
    // get the canvas and context
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')

    // world/physics settings
    // merge default config & any passed in config
    this.config = {
      ...defaultConfig,
      ...config
    }

    // set the canvas size
    this.canvas.width = 500
    this.canvas.height = 500

    // begin update loop
    // use an arrow function so that we can use `this` properly
    document.addEventListener('DOMContentLoaded', () => this.update());

    this.canvas.addEventListener('click', (event) => {
        console.log("start game");
        return true;
    })
  }
  
  update () {

  }
}

export default StartScreen
