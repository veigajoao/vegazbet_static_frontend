document.addEventListener("DOMContentLoaded", function(event) {
    const image = new Image();
    image.src = document.getElementById("img-rocket").getAttribute("src");

    const explosion = new Image();
    explosion.src = document.getElementById("img-explosion").getAttribute("src");
  
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
  
    const colors = {
      leftMeasures: "#f00",
      borderColor: "#252e39",
      rocketLineColor: "#9c3d92",
      fontColor: "#51596a",
      textColor: "#fff",
      timerColor: "#1b2430",
      stopColor: "#e82b4a",
    };
  
    const GRAPH_TOP = 50;
    const GRAPH_BOTTOM = 350;
    const GRAPH_LEFT = 75;
    const GRAPH_RIGHT = 650;
  
    const GRAPH_HEIGHT = 350;
    const GRAPH_WIDTH = 650;
  
    const initialLines = () => [
      {
        x1: GRAPH_LEFT,
        y1: 265.5,
        x2: GRAPH_RIGHT,
        y2: 265.5,
        timer: "x1.25",
      },
      {
        x1: GRAPH_LEFT,
        y1: 80,
        x2: GRAPH_RIGHT,
        y2: 80,
        timer: "x1.5",
      },
      {
        x1: GRAPH_LEFT,
        y1: -10,
        x2: GRAPH_RIGHT,
        y2: -10,
        timer: "x1.75",
      },
    ];
  
    const initialState = {
      status: "running",
      loading: 500,
      speed_minus: 1,
      isStarted: false,
      id: 1,
      lines: [...initialLines()],
      line_curve: -210,
    };
  
    let game = { ...initialState };
  
    let rocket_y = GRAPH_BOTTOM - 10;
    let rocket_x = GRAPH_LEFT + 30;
  
    const data = [
      2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 40, 50,
      60, 70, 80, 90, 100,
    ];
  
    let timer = 1;
  
    function drawLine(time, bottom = 0) {
      game.lines = [
        ...game.lines,
        {
          x1: GRAPH_LEFT,
          y1: GRAPH_TOP + bottom,
          x2: GRAPH_RIGHT,
          y2: GRAPH_TOP + bottom,
          timer: time,
        },
      ];
    }
  
    function drawLoading(loading) {
      context.clearRect(0, 0, 1000, 1000);
      context.fillStyle = colors.timerColor;
      context.fillRect(
        GRAPH_WIDTH / 10,
        GRAPH_HEIGHT / 2,
        GRAPH_WIDTH / 1.15,
        50
      );
  
      context.fillStyle = colors.stopColor;
  
      const loadingPercent = loading / 500;
      const loadingWidth = (loadingPercent * GRAPH_WIDTH) / 1.18;
  
      context.fillRect(GRAPH_WIDTH / 9, GRAPH_HEIGHT / 1.9, loadingWidth, 30);
  
      context.fillStyle = "#fff";
      context.font = "500 1rem Segoe UI";
      context.fillText(
        "Começando em " + (loading / 100).toFixed(1).toString() + "s",
        GRAPH_WIDTH / 2.5,
        (GRAPH_HEIGHT + 60) / 2
      );
  
      window.requestAnimationFrame(drawGraph);
    }
  
    function drawGraph() {
      console.log(GRAPH_TOP);
      if (game.status === "loading") return handleLoading();
      // else if (game.status === "paused")
      //   return window.requestAnimationFrame(drawGraph);
  
      context.clearRect(0, 0, 1000, 1000);
  
      context.lineWidth = 2.5;
      context.lineCap = "round";
  
      context.font = "600 0.8rem Segoe UI";
      context.fillStyle = colors.fontColor;
      context.textAlign = "center";
      context.setLineDash([6, 5]);
  
      for (let line of game.lines) {
        context.beginPath();
        context.strokeStyle = colors.borderColor;
  
        context.moveTo(line.x1, line.y1);
        context.lineTo(line.x2, line.y2);
  
        context.fillText(line.timer, GRAPH_LEFT - 30, line.y1 + 5);
        context.stroke();
  
        if (game.status === "running") {
          /// Movimento e criação das linhas
          const speed =
            (line.y1 - GRAPH_BOTTOM) / GRAPH_HEIGHT / game.speed_minus;
  
          line.y1 -= speed;
          line.y2 -= speed;
  
          if (line.y1 > 120 && line.y1 < 125 && line.timer === "x2") {
            game.speed_minus = 2;
  
            game.lines = [{ ...line }];
          } else if (line.y1 > 290) game.lines.shift();
        }
      }
  
      context.setLineDash([0, 0]);
  
      /// desenha a borda do gráfico
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = colors.borderColor;
      context.moveTo(GRAPH_LEFT - 10, GRAPH_BOTTOM);
      context.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);
      // context.lineTo(GRAPH_RIGHT + 25, GRAPH_TOP);
      context.fillText("1x", GRAPH_LEFT - 30, GRAPH_BOTTOM + 2);
      context.stroke();
  
      /// desenha a linha do foguete
      context.beginPath();
      context.lineWidth = 5;
      context.lineJoin = "round";
      context.strokeStyle = colors.rocketLineColor;
  
      if (game.status === "running") {
        if (rocket_y > GRAPH_TOP) rocket_y -= 0.5 * 1.2;
        if (rocket_x < GRAPH_RIGHT) rocket_x += 1 * 1.2;
  
        if (rocket_x > GRAPH_RIGHT / 2 && game.line_curve < -50)
          game.line_curve += 1;
      }
  
      context.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);
      context.bezierCurveTo(
        GRAPH_LEFT,
        GRAPH_BOTTOM,
        GRAPH_BOTTOM + game.line_curve,
        GRAPH_BOTTOM - 30,
        rocket_x,
        rocket_y
      );
  
      // context.fillText(i + 1, (GRAPH_RIGHT / arrayLen) * i, GRAPH_BOTTOM + 25);
  
      context.stroke();
  
      console.log(game.status);
      if (game.status === "running")
        context.drawImage(image, rocket_x - 45, rocket_y - 30, 70, 70);
      else context.drawImage(explosion, rocket_x - 45, rocket_y - 30, 70, 70);
  
      drawText(
        timer.toFixed(2) + "X",
        game.status === "running" ? colors.timerColor : colors.stopColor,
        colors.textColor
      );
  
      if (game.status === "running") handleTimer();
  
      window.requestAnimationFrame(drawGraph);
    }
  
    // startGame();
  
    window.requestAnimationFrame(drawGraph);
    const defeatTime = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
    setTimeout(stopGame, defeatTime);
  
    function startGame(t) {
      if (game.isStarted) return;
      game = { ...initialState, lines: [...initialLines()] };
      game.status = "running";
  
      rocket_y = GRAPH_BOTTOM;
      rocket_x = GRAPH_LEFT;
  
      console.log(game);
  
      window.requestAnimationFrame(drawGraph);
  
      const defeatTime = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
      setTimeout(stopGame, defeatTime);
    }
    // });
  
    function drawText(text, bgColor, fontColor) {
      context.fillStyle = bgColor;
      context.font = "bolder 1.8rem Segoe UI";
      context.fillRect(
        (GRAPH_WIDTH - 80) / 2.2,
        GRAPH_HEIGHT / 2.5,
        GRAPH_WIDTH / 3.5,
        100
      ),
        (context.fillStyle = fontColor);
      context.fillText(text, (GRAPH_WIDTH + 50) / 2, (GRAPH_HEIGHT + 50) / 2);
    }
  
    function stopGame() {
      game.status = "paused";
  
      setTimeout(() => {
        game = { ...initialState, lines: [...initialLines()], status: "loading" };
      }, 5000);
    }
  
    function handleTimer() {
      const formatedTimer = Number(timer.toFixed(2));
      console.log(formatedTimer);
      data.includes(formatedTimer) ? drawLine("x" + formatedTimer) : null;
  
      timer += 0.0025;
    }
  
    function handleLoading() {
      game.loading--;
      timer = 1;
  
      if (game.loading <= 0) startGame(true);
      else drawLoading(game.loading);
    }
  });
  