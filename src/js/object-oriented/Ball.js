
// properties and initial velocity
const defaultProps = {
  bounce: 1,
  radius: 30,
  color: 'red'
}

export class Ball {
  constructor (x = 0, y = 0, sceneProps, props) {
    this.props = {
      ...defaultProps,
      startVelX: (Math.random() * 2 + 3) * (Math.floor(Math.random() * 2) || -1),
      startVelY: (Math.random() * 2 + 3) * (Math.floor(Math.random() * 2) || -1),
      ...props
    }
    this.sceneProps = sceneProps

    this.x = x
    this.y = y
    this.velX = this.props.startVelX
    this.velY = this.props.startVelY
  }

  draw (ctx) {
    const { x, y, props } = this

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = props.color
    ctx.arc(
      x, y,
      props.radius,
      0, Math.PI * 2
    )
    ctx.fill()
    ctx.restore()
  }

  clickBall(xMouse, yMouse) {
    const dist = 
    Math.sqrt(
    ( (xMouse-this.x) * (xMouse-this.x) ) + 
    ( (yMouse-this.y) * (yMouse-this.y) )
    );
   if (dist < this.props.radius) {
      console.log(this.props.color)
      return true;
    } else {
      return false;
    }
  }

  update () {
    const { props, sceneProps } = this

    // bottom bound / floor
    if (this.y + props.radius >= sceneProps.height) {
      this.velY *= -props.bounce
      this.y = sceneProps.height - props.radius
    }
    // top bound / ceiling
    if (this.y - props.radius <= 0) {
      this.velY *= -props.bounce
      this.y = props.radius
    }

    // left bound
    if (this.x - props.radius <= 0) {
      this.velX *= -props.bounce
      this.x = props.radius
    }
    // right bound
    if (this.x + props.radius >= sceneProps.width) {
      this.velX *= -props.bounce
      this.x = sceneProps.width - props.radius
    }

    // reset insignificant amounts to 0
    if (this.velX < 0.01 && this.velX > -0.01) {
      this.velX = 0
    }
    if (this.velY < 0.01 && this.velY > -0.01) {
      this.velY = 0
    }

    // update position
    this.x += this.velX
    this.y += this.velY
  }
}

export default Ball
