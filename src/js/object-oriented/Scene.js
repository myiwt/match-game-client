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

    // begin update loop
    // use an arrow function so that we can use `this` properly
    document.addEventListener('DOMContentLoaded', () => this.update())
    this.canvas.addEventListener('click', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (let i=0; i<this.balls.length; i++) {
        if (this.balls[i].clickBall(x, y)) {
          this.balls.splice(i,1); // remove ball from balls array, so they stop drawing
          break;
        }
      }
    })
  }

  createBalls () {
    const { config } = this
    //const colors = ['purple', 'red', 'blue', 'lime', 'magenta', 'orange','yellow','green','aqua','navy','pink', 'gray']
    const colors = ['purple', 'red']
    // build an array of ball objects
    const balls = []

    for (let i = 0; i < colors.length; i++) {
      // size 10-30
      let size = Math.random() * 20 + 10
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
            bounce: 0.5,
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
            bounce: 1.0,
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
    const { ctx, config, balls } = this

    // queue the next update
    window.requestAnimationFrame(() => this.update())

    // clear the canvas
    ctx.clearRect(0, 0, config.width, config.height)

    // update objects
    balls.forEach(ball => ball.update())

    // draw objects
    balls.forEach(ball => ball.draw(ctx))

    // check if ball is clicked
    /* for (let ball of balls) {
      if ()
    } */

    

  }
}

export default Scene
