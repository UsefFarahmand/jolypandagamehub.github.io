export function initializeModals(){

    document
        .getElementById("settingsBtn")
        ?.addEventListener(
            "click",
            ()=> openModal("settingsModal")
        );

    document
        .getElementById("closeSettings")
        ?.addEventListener(
            "click",
            ()=> closeModal("settingsModal")
        );

    document
        .getElementById("aboutBtn")
        ?.addEventListener(
            "click",
            ()=> openModal("aboutModal")
        );
    
    document
        .getElementById("closeAbout")
        ?.addEventListener(
            "click",
            ()=> closeModal("aboutModal")
        );

    document
        .getElementById("playAgainBtn")
        ?.addEventListener(
            "click",
            ()=> location.reload()
        );
}

function hideSplash(){

    document
        .getElementById("splashScreen")
        .classList.add("hidden");
}

export function openModal(id){

    document
        .getElementById(id)
        ?.classList.remove(
            "hidden"
        );
}

export function closeModal(id){

    document
        .getElementById(id)
        ?.classList.add(
            "hidden"
        );
}