

class Modal {
  constructor(containerStart, containerEnd, text, swordIcon, winBTN ){
    this.containerStart = containerStart;
    this.containerEnd = containerEnd;
    this.text = text;
    this.swordIcon = swordIcon;
    this.winBTN = winBTN;

  }

  writeModal(){
    const modalWinContainer = document.querySelector(".modal-container");

    modalWinContainer.innerHTML = `
    ${this.containerStart}
    ${this.text}
    <div class="icon-container">
    <img class="left-icon" src=${this.swordIcon}>        
    <img class="right-icon" src=${this.swordIcon}>
    </div>
    ${this.winBTN}
    ${this.containerEnd}  
    `
  }

  closeModal(){
    const modalWinContainer = document.querySelector(".modal-container");
    const winButton = modalWinContainer.querySelector(".winBTN");

    winButton.addEventListener("click", () => {
      location.reload();
    })
  }

  startModal(){
    const modalContainer = document.querySelector(".modal-container")
    const modalLoader = document.querySelector(".container")
    const modalWinner = document.querySelector(".winnerTXT");
    
    modalContainer.classList.add("show")
  
    setTimeout(function() {
      modalLoader.classList.add("hidden");
      modalWinner.classList.add("show")
    }, 4000);

  }


  
}

let winModal = new Modal(
  `<div class="container">`,
  `</div>`,
  `<h2 class="winnerTXT"></h2>`,
  "images/sword-icon.svg",
  `<button class="winBTN">Tag et spil mere</button>`
  
  )

winModal.writeModal();
winModal.closeModal();
winModal.startModal();
