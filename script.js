const $reloadBtn = document.querySelector('.reload-btn');
const $box = document.querySelector('.box');
const $garapon = document.querySelector('.garapon');
const $allgarapon = document.querySelectorAll('.garapon');
const $numberOfgarapon = $allgarapon.length - 1;
const $bodyOverlay = document.querySelector('.body-overlay');

let $activecandy = null;
let $score = 0;


const candyErrorSound = new Audio('sounds/error.mp3');
const congratulationsSound = new Audio('sounds/finishlvl.mp3');

$reloadBtn.addEventListener('click', () => {
    location.reload();
});

const choosecandy = (e) => {
    const parent = e.target.parentElement;

    if ($activecandy === null) {
        if (parent.childElementCount > 0 && parent.firstElementChild.classList.contains('candy')) {
            parent.firstElementChild.classList.toggle('candy-active');
            $activecandy = parent.firstElementChild;
            if ($activecandy.classList.contains('candy-error')) {
                $activecandy.classList.remove('candy-error');
            }
        } else if (e.target.classList.contains('garapon') && e.target.childElementCount > 0) {
            e.target.firstElementChild.classList.toggle('candy-active');
            $activecandy = e.target.firstElementChild;
        }
    } else {
        movecandyToSelectedgarapon(e);
    }
}

const movecandyToSelectedgarapon = (e) => {
    target = e.target;
    if (target === $activecandy || target === $activecandy.parentElement.children[1] || target === $activecandy.parentElement.children[2]) {
        $activecandy.classList.remove('candy-active');
        $activecandy = null;
    }

    if (target.classList.contains('garapon') && target.childElementCount < 3 && $activecandy !== null) {
        if (target.children.length === 0 || target.children[0].title === $activecandy.title) {
            const el = document.createElement('div');
            el.setAttribute('title', $activecandy.title);
            el.setAttribute('class', $activecandy.classList);
            el.classList.remove('candy-active');
            target.prepend(el);
            $activecandy.remove();
            playCandyHitSound(); 
            if (target.childElementCount === 3 && checkMatchingCandies(target.children)) {
                playMatchSound(); 
            }
        } else {
            $activecandy.classList.add('candy-error');
            $activecandy.classList.remove('candy-active');
            candyErrorSound.play(); 
        }
        $activecandy = null;
    } else if (target.parentElement.classList.contains('garapon') && target.parentElement.childElementCount < 3) {
        if (target.parentElement.children.length === 0 || target.parentElement.children[0].title === $activecandy.title) {
            const el = document.createElement('div');
            el.setAttribute('title', $activecandy.title);
            el.setAttribute('class', $activecandy.classList);
            el.classList.remove('candy-active');
            target.parentElement.prepend(el);
            $activecandy.remove();
            playCandyHitSound(); 
            if (target.parentElement.childElementCount === 3 && checkMatchingCandies(target.parentElement.children)) {
                playMatchSound(); 
            }
        } else {
            $activecandy.classList.add('candy-error');
            $activecandy.classList.remove('candy-active');
            candyErrorSound.play(); 
        }
        $activecandy = null;
    }
}


function checkMatchingCandies(children) {
    const firstCandyTitle = children[0].title;
    const secondCandyTitle = children[1].title;
    const thirdCandyTitle = children[2].title;
    return firstCandyTitle === secondCandyTitle && secondCandyTitle === thirdCandyTitle;
}

function playCandyHitSound() {
    const candyHitSound = new Audio('sounds/ballhit.mp3');
    candyHitSound.play();
}

function playMatchSound() {
    const matchSound = new Audio('sounds/finishBottle.mp3');
    matchSound.play();
}

function playClickSound(event) {
    event.preventDefault(); 
    var audio = new Audio('sounds/click.mp3');
    audio.play();
    setTimeout(function() {
        window.location = event.target.href; 
    }, 200);
}


const checkingSortcandys = () => {
    const countParents = $allgarapon.length;
    const colorOfgarapon = [];

    for (let i = 0; i < countParents; i++) {
        const element = $allgarapon[i];
        if (element.childElementCount === 3) {
            const firstCandyTitle = element.children[0].title;
            const secondCandyTitle = element.children[1].title;
            const thirdCandyTitle = element.children[2].title;

            if (firstCandyTitle === secondCandyTitle && secondCandyTitle === thirdCandyTitle) {
                $score++;
                colorOfgarapon.push(firstCandyTitle);
            }
        }
    }

    if (colorOfgarapon.length === $numberOfgarapon) {
        setTimeout(() => {
            $bodyOverlay.style.display = "flex";
            congratulationsSound.play(); 
        }, 1000);
    }
}



$box.addEventListener('click', e => {
    choosecandy(e);
    checkingSortcandys();
});
