class BouncingBall {
    constructor(positionX, positionY, velocityX, velocityY) {
      this.positionX = positionX;
      this.positionY = positionY;
      this.velocityX = velocityX;
      this.velocityY = velocityY;

      this.createBallElement();
    }

    createBallElement() {
      this.ball = document.createElement('div');
      this.ball.className = 'ball';
      document.getElementById('container').appendChild(this.ball);

      this.setBallStyle();
      this.updateBallPosition();
    }

    setBallStyle() {
      const size = 20 + Math.floor(Math.random() * 30);
      const color = this.getRandomColor();

      this.ball.style.width = `${size}px`;
      this.ball.style.height = `${size}px`;
      this.ball.style.backgroundColor = color;
    }

    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    updateBallPosition() {
      this.ball.style.left = `${this.positionX}px`;
      this.ball.style.top = `${this.positionY}px`;
    }

    updatePosition(balls) {
      // Update ball position based on velocity
      this.positionX += this.velocityX;
      this.positionY += this.velocityY;

      // Check boundaries and reverse direction if needed
      if (this.positionX <= 0 || this.positionX >= (VIEWPORT_WIDTH - parseInt(this.ball.style.width))) {
        this.velocityX *= -1;
      }

      if (this.positionY <= 0 || this.positionY >= (VIEWPORT_HEIGHT - parseInt(this.ball.style.height))) {
        this.velocityY *= -1;
      }

      // Update ball position in the DOM
      this.updateBallPosition();

      // Check for collisions with other balls
      this.checkCollisions(balls);
    }

    checkCollisions(balls) {
      balls.forEach( otherBall => {
        if (otherBall !== this) {
          const dx = this.positionX - otherBall.positionX;
          const dy = this.positionY - otherBall.positionY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < (parseInt(this.ball.style.width) + parseInt(otherBall.ball.style.width)) / 2) {
            // Collided, reverse directions
            this.velocityX *= -1;
            this.velocityY *= -1;
          }
        }
      });
    }
  }