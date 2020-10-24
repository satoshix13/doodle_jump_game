document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let dodLeftSpace = 50
    let startPoint = 150
    let dodBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platForms = []
    let upTimerId 
    let downTimerId
    let isJumping = false
    isGoingLeft = false
    isGoingRight = false
    let leftTimerId 
    let rightTimerId
    let score = 0





    function createDoodler() {
      grid.appendChild(doodler)
      doodler.classList.add('doodler')
      dodLeftSpace = platForms[0].left
      doodler.style.left = dodLeftSpace+"px"
      doodler.style.bottom = dodBottomSpace+"px"
    }


    class Platform {
      constructor(newPlatBottom){
        this.bottom = newPlatBottom
        this.left = Math.random() * 470
        this.visual = document.createElement('div')
        
        const visual = this.visual
        visual.classList.add('platform')
        visual.style.left = this.left+'px'
        visual.style.bottom = this.bottom+'px'
        grid.appendChild(visual)
      }
    }

    function createPlatforms() {
      for( let i = 0; i < platformCount; i++){
        let platGap = 800 / platformCount
        let newPlatBottom = 100 + i * platGap
        let newPlatform = new Platform(newPlatBottom)
        platForms.push(newPlatform)
        console.log(platForms)
      }
    }


    function movePlatforms() {
      if (dodBottomSpace > 200) {
        platForms.forEach(platform => {
          platform.bottom -= 4
          let visual = platform.visual 
          visual.style.bottom = platform.bottom + "px"

          if(platform.bottom < 10) {
            let firstPlatform = platForms[0].visual
            firstPlatform.classList.remove('platform')
            platForms.shift()
            score++
            console.log(platForms)
            let newPlatform = new Platform(800)
            platForms.push(newPlatform)
          }
        })
      }
    }


    function fall(){
      clearInterval(upTimerId)
      isJumping = false
      downTimerId = setInterval(function ()  {
        dodBottomSpace -=5
        doodler.style.bottom = dodBottomSpace+"px"
        if (dodBottomSpace <= 0){
           gameOver()
        }
        platForms.forEach(platform =>{
          if (
            (dodBottomSpace >= platform.bottom) &&
            (dodBottomSpace <= (platform.bottom + 15)) &&
            ((dodLeftSpace + 60) >= platform.left) && 
            (dodLeftSpace <= (platform.left + 80)) &&
            !isJumping
            ) {
          console.log("landed")
          startPoint = dodBottomSpace
          jump()
        }
        })
      },30)
    }


    function jump(){
      clearInterval(downTimerId)
      isJumping = true
      upTimerId = setInterval(function() {
        dodBottomSpace +=20
        doodler.style.bottom = dodBottomSpace+"px"
        if(dodBottomSpace > startPoint + 200){
          fall()
        }
      },30)
    }

    function moveLeft(){
      if(isGoingRight){
        clearInterval(rightTimerId)
        isGoingRight = false
      }
      isGoingLeft = true
      leftTimerId - setInterval(function() {
        if(dodLeftSpace >= 0){
          dodLeftSpace -=8
          doodler.style.left = dodLeftSpace+'px'
        } else moveRight()
      }, 30)
    }

    function moveRight(){
      if(isGoingLeft){
        clearInterval(leftTimerId)
        isGoingLeft = false
      }
      isGoingRight = true
      rightTimerId - setInterval(function(){
        if(dodLeftSpace <= 490){
          dodLeftSpace +=8
          doodler.style.left = dodLeftSpace+"px"
        } else moveLeft()
      },30)
    }

    function moveStraight(){
      isGoingLeft = false
      isGoingRight = false
      clearInterval(leftTimerId)
      clearInterval(rightTimerId)
      console.log("upp")
    }

    function control(e){
      if(e.key === "ArrowLeft"){
        moveLeft()
      } else if(e.key === "ArrowRight"){
        moveRight()
      } else if(e.key === "ArrowUp"){
        moveStraight()
      }
    }

    function gameOver(){ 
      console.log("gameee over")
      isGameOver = true
      while (grid.firstChild){
        grid.removeChild(grid.firstChild)
      }
      grid.innerHTML = score
      
      clearInterval(upTimerId)
      clearInterval(downTimerId)
      clearInterval(leftTimerId)
      clearTimeout(rightTimerId)
    }

    function start() {
      if (!isGameOver) {
        createPlatforms()
        createDoodler()
        setInterval(movePlatforms,30)
        jump()
        document.addEventListener('keyup', control)
      }
    }

    start()
})

