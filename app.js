document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    const dodLeftSpace = 50
    const dodBottomSpace = 150
    let isGameOver = false
    let platformCount = 5
    let platForms = []

    function createDoodler() {
      grid.appendChild(doodler)
      doodler.classList.add('doodler')
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
      
    }


    function start() {
      if (!isGameOver) {
        createDoodler()
        createPlatforms()
        movePlatforms()
      }
    }

    start()
})

