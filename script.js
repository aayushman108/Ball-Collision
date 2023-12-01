const balls = [];

    for (let i = 0; i < BALL_COUNT; i++) {
      const positionX = Math.random() * VIEWPORT_WIDTH;
      const positionY = Math.random() * VIEWPORT_HEIGHT;
      const velocityX = 1 + Math.random() * 2;
      const velocityY = 1 + Math.random() * 2;

      balls.push(new BouncingBall(positionX, positionY, velocityX, velocityY));
    }

    function animate() {
      balls.forEach(ball => {
        ball.updatePosition(balls);
      });

      requestAnimationFrame(animate);
    }

    animate();