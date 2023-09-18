let score = 0;



// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
const interval = setInterval(() => {
    const randomHoleID = getRandomUnwhackedHoleId();
    if (randomHoleID) {
        const moleHole = document.getElementById(randomHoleID);
        moleHole.classList.add('needs-whack');
        
        console.log(`Added 'needs-whack' class to hole with id ${randomHoleId}`);
    }
    
}, 1000);

for(const id of getAllHoleIds()) {
    const hole = document.getElementById(id);
    hole.addEventListener('click', (event) => {
        const clickedHole = event.target;
        if (clickedHole.classList.contains('needs-whack')){
            clickedHole.classList.remove('needs-whack');
            clickedHole.classList.add('animating-whack');
            setTimeout(() => {
                clickedHole.classList.remove('animating-whack');}, 500);
        
        function updateScoreDisplay() {
            const scoreDisplay = document.getElementById('score');
            scoreDisplay.textContent = `Score: ${score}`; // asked chat how I could constantly update the sore
                }
            score++;
            updateScoreDisplay();
        if (score >=45){
            clearInterval(interval);

        
            }
        }
    });
   
    console.log(` Added a click listener for #${id} here`);
}

/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" but **not** "needs-whack"

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = ['hole-00','hole-01','hole-02','hole-03','hole-10',
    'hole-11','hole-12','hole-13','hole-20','hole-21','hole-22','hole-23',
    'hole-30','hole-31','hole-32','hole-33',];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}
