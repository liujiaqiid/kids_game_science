let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let box = 20; // Size of the grid
let snake = [];
snake[0] = { x: 8 * box, y: 9 * box };
snake.unshift({ x: 9 * box, y: 9 * box });  // 左边添加第二个格子

let snakeHeadImg = new Image();
snakeHeadImg.src = './imgs/head2.jpeg';  // 替换为您的蛇头图片路径

let snakeKingHeadImg = new Image();
snakeKingHeadImg.src = './imgs/head_king.jpeg';  // 替换为您的蛇头图片路径

let foodImg = new Image();
foodImg.src = './imgs/food.jpg';  // 替换为您的食物图片路径


let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

let direction = "RIGHT"; // 给方向一个初始值
let score = 0;

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    console.log("Key pressed:", event.keyCode); 
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    } 
    console.log("Current direction:", direction); 
}

function draw() {

    console.log("开始绘制，当前蛇的位置：", JSON.stringify(snake));
    console.log("当前方向：", direction);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    for (let i = 0; i < snake.length; i++) {

        if (i === 0) {
            ctx.save();  // 保存当前状态
            // 将旋转中心移动到蛇头中心
            ctx.translate(snake[i].x + box/2, snake[i].y + box/2);
            
            // 根据方向旋转图片
            let angle = 0;
            if (direction === "RIGHT") angle = 0;
            if (direction === "DOWN") angle = 90 * Math.PI/180;
            if (direction === "LEFT") angle = 180 * Math.PI/180;
            if (direction === "UP") angle = 270 * Math.PI/180;
            
            ctx.rotate(angle);
            
            // 绘制图片，注意要将坐标原点移回左上角
            if (snake.length < 10) {
                ctx.drawImage(snakeHeadImg, -box/2, -box/2, box, box);
            } else {
                // snakeKingHeadImg   
                ctx.drawImage(snakeKingHeadImg, -box/2, -box/2, box, box);
            }
            
            ctx.restore();  // 恢复状态        
        } else { 
            // 蛇头是绿色，其他部分是白色
            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            // 蛇的边框是黑色
            ctx.strokeStyle = "black";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
    }

    // 绘制食物
    // ctx.fillStyle = "red";
    // ctx.fillRect(food.x, food.y, box, box);
    // ctx.drawImage(foodImg, food.x, food.y, box, box);
    ctx.font = box + "px Arial";
    ctx.textBaseline = "top";
    ctx.fillText("👩", food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    console.log("移动前蛇头位置：", snakeX, snakeY);


    // 根据方向移动蛇
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    console.log("移动后蛇头位置：", snakeX, snakeY);

    // 如果蛇头碰到食物，则吃掉食物，并生成新的食物
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };

        // 通关判断
        if (score >= 10) {
            clearInterval(game);
            alert("恭喜你通关啦！变异蛇已完成进化！");
            // 可选：重置按钮
            const startBtn = document.getElementById("startBtn");
            startBtn.textContent = "重新开始";
            startBtn.style.display = "inline-block";
            // 可选：显示游戏说明
            const gameIntro = document.getElementById("gameIntro");
            if (gameIntro) gameIntro.style.display = "block";
            return;
        }

    } else {
        snake.pop();
    }

    // 生成新的蛇头
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // 如果蛇头碰到边界或自己的身体，则游戏结束
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over!");
        return;
    }
    // 将新的蛇头添加到蛇的头部
    snake.unshift(newHead);
    console.log("更新后的蛇位置：", JSON.stringify(snake));


    // 绘制分数
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score + "/10", 10, 30);
}

function collision(head, array) {
    return false;
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// 初始不启动游戏
let game = null;
// let game = setInterval(draw, 300);
let isPaused = false;

window.onload = function() {
    const startBtn = document.getElementById("startBtn");
    const gameIntro = document.getElementById("gameIntro");
    
    
    startBtn.style.display = "inline-block"; // 确保按钮显示
    gameIntro.style.display = "block";
    startBtn.onclick = function() {
        startBtn.style.display = "none";
        gameIntro.style.display = "none";        
        if (!game) {
            game = setInterval(draw, 300);
            isPaused = false;
        }
    };

        // 监听空格键实现暂停/继续
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            if (!isPaused) {
                // 暂停
                clearInterval(game);
                game = null;
                isPaused = true;
                startBtn.textContent = "继续游戏";
                startBtn.style.display = "inline-block";
                gameIntro.style.display = "block";                
            } else {
                // 继续
                startBtn.style.display = "none";
                gameIntro.style.display = "none";                
                if (!game) {
                    game = setInterval(draw, 300);
                    isPaused = false;
                }
            }
        }
    });

};

