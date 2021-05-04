import Ball from './Ball'

// some default values
const defaultConfig = {
  width: 500,
  height: 500
}

// classes are functions that create objects
// and we're exporting it to use in another file
export class Scene {
  // constructor function is the equivalent of
  // the init function
  

  // table at bottom of game showing match balls, current user & score
  constructor (canvasId = 'gameCanvas', config) {
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
    this.canvas.width = this.config.width
    this.canvas.height = this.config.height

    this.createBalls()
    // Checks the color & radius of the last ball to see if a valid match was made
    // 0 index element = ball colour, 1st index element = ball size
    var lastClickedBall = ["",""] 

    // begin update loop
    // use an arrow function so that we can use `this` properly
    document.addEventListener('DOMContentLoaded', () => this.update());

    this.canvas.addEventListener('click', (event) => {
      const rect = this.canvas.getBoundingClientRect(); // dimensions of canvas rectangle
      // positions inside the canvas (not of the entire browser)
      const x = event.clientX - rect.left; 
      const y = event.clientY - rect.top;
      console.log(this.balls.length);
      

      for (let i=0; i<this.balls.length; i++) {
        var currentBall = this.balls[i];
        var currentColor = currentBall.props.color;
        var currentRadius = currentBall.props.radius;
        if (this.balls[i].clickBall(x, y)) { // First ball of match pair clicked
          // when a ball is clicked, it is always removed from balls array, so it stops drawing in canvas
          this.balls.splice(i,1); 
          if (lastClickedBall[0] == "") {
            lastClickedBall = [currentColor, currentRadius]
          }
          else if (currentColor == lastClickedBall[0] && currentRadius == lastClickedBall[1]) { // Match made!
            lastClickedBall = ["",""]; // reset last clicked ball to empty array to start new pair
          } else { // Match was not made
            // respawn 2 balls back to canvas: current clicked ball & last clicked ball
            console.log(lastClickedBall[0])
            this.addBall(currentColor,currentRadius)
            this.addBall(lastClickedBall[0],lastClickedBall[1])
            lastClickedBall = ["", ""] // reset last clicked ball to empty array to start new pair
          }
          break;
        }
      }
    })
  }

  addBall(lastColor, size) {
    const { config } = this
    this.balls.push(
      new Ball(
        // random X Y position
        Math.random() * config.width, Math.random() * config.height,
        // scene config
        {
          // default width, height
          ...config
        },
        // ball properties
        {
          // extra bouncey
          bounce: 1,
          radius: size,
          color: lastColor
        }
      )
    )
  }

  createBalls () {
    const { config } = this
    // const colors = ['purple', 'red', 'blue', 'lime', 'magenta', 'orange','yellow','green','aqua','navy','pink', 'gray']
    const colors = ['purple', 'red'];
    // build an array of ball objects
    const balls = []

    for (let i = 0; i < colors.length; i++) {
      // size 20-40
      let size = Math.random() * 20 + 20
      balls.push(
        new Ball(
          // random X Y position
          Math.random() * config.width, Math.random() * config.height,
          // scene config
          {
            // default width, height
            ...config
          },
          // ball properties
          {
            // extra bouncey
            bounce: 1,
            radius: size,
            // One ball of each color
            color: colors[i]
          }
        )
      )

      // repeat ball for matching
      balls.push(
        new Ball(
          // random X Y position
          Math.random() * config.width, Math.random() * config.height,
          // scene config
          {
            // default width, height
            ...config
          },
          // ball properties
          {
            // extra bouncey
            bounce: 1,
            radius: size,
            // One ball of each color
            color: colors[i]
          }
        )
      )
    }

    this.balls = balls
  }

  update () {
    // destructure the scene's variables
    const { ctx, config, balls, allBalls } = this

    // queue the next update
    window.requestAnimationFrame(() => this.update())

    // clear the canvas
    ctx.clearRect(0, 0, config.width, config.height)

    // update objects
    balls.forEach(ball => ball.update())

    // draw objects
    balls.forEach(ball => ball.draw(ctx))

    // Game over if all balls are removed
    if (this.balls.length==0) {
      const countdownEl = document.getElementById('timer').innerHTML;
      alert("You win! Time taken: " + countdownEl);
      location.reload();
    }
  }
}

export default Scene
