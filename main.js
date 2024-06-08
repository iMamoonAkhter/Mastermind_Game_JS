function PlayGame(){
    document.querySelector(".home_playgameButton_button").classList.add("d-none");
    document.querySelector(".home_loading").classList.remove("d-none");
    document.querySelector(".home_loading").classList.add("d-block");
    let load = document.querySelector("#loading_span");
    let html;
    let count = 0;
    setInterval(() => {
        if(count>=3){
            load.innerHTML = "";
            count = 0;
        }
        else{
            load.innerHTML += ".";
            count++;
        }
    }, 200);

    setTimeout(() => {
        clearInterval();
        document.querySelector("#home").classList.remove("d-block");
        document.querySelector("#home").classList.add("d-none");
        document.querySelector(".home_playgameButton_button").classList.add("d-block");
        document.querySelector(".home_loading").classList.add("d-none");
        document.querySelector("#playGame").classList.remove("d-none");
        document.querySelector("#playGame").classList.add("d-block");
    }, 5000);
}


function aboutPage() {
    document.getElementById('home').classList.add('d-none');
    document.getElementById('about').classList.remove('d-none');
    document.getElementById('playGame').classList.add('d-none');
    document.getElementById('rule').classList.add('d-none');
}

function playGamePage() {
    document.getElementById('home').classList.add('d-none');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('playGame').classList.remove('d-none');
    document.getElementById('rule').classList.add('d-none');
}

function homePage() {
    document.getElementById('home').classList.remove('d-none');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('playGame').classList.add('d-none');
    document.getElementById('rule').classList.add('d-none');
}