let righe = 6;
let colonne = 7;
let arrTabella = [];
let GiocatoreCorrente = "rosso";

function Nuovo() {
    let TabellaGioco = document.getElementById("TabellaGioco");
    let messaggio = document.getElementById("messaggio");

    arrTabella = [];
    TabellaGioco.innerHTML = '';
    for (let riga = 0; riga < righe; riga++) {
        arrTabella[riga] = [];
        for (let colonna = 0; colonna < colonne; colonna++) {
            arrTabella[riga][colonna] = '';
            let cella = document.createElement('div');
            cella.classList.add('cella');
            cella.dataset.riga = riga;
            cella.dataset.colonna = colonna;
            cella.addEventListener('click', Cliccare);
            TabellaGioco.appendChild(cella);
        }

    }
    messaggio.innerHTML = 'Turno del giocatore: ' + GiocatoreCorrente;

}

function Cliccare(e) {
    let TabellaGioco = document.getElementById('TabellaGioco');
    let messaggio = document.getElementById('messaggio');

    let riga = e.target.dataset.riga;
    let colonna = e.target.dataset.colonna;

    for (let riga = righe - 1; riga >= 0; riga--) {
        if (arrTabella[riga][colonna] === '') {
            arrTabella[riga][colonna] = GiocatoreCorrente;
            let cella = TabellaGioco.querySelector("[data-riga='" + riga + "'][data-colonna='" + colonna + "']");
            cella.classList.add(GiocatoreCorrente);
            if (checkWin(riga, colonna)) {
                messaggio.innerHTML = "Il giocatore " + GiocatoreCorrente + " ha vinto!";
                TabellaGioco.removeEventListener('click', Cliccare);
            } else if (checkPareggio()) {
                messaggio.innerHTML = "Pareggio!";
            } else {

                if (GiocatoreCorrente === 'rosso') {
                    GiocatoreCorrente = 'giallo';
                } else {
                    GiocatoreCorrente = 'rosso';
                }
                messaggio.innerHTML = "Turno del giocatore: " + GiocatoreCorrente;
            }
            break;
        }
    }
}

function checkPareggio() {
    for (let riga = 0; riga < righe; riga++) {
        for (let colonna = 0; colonna < colonne; colonna++) {
            if (arrTabella[riga][colonna] === '') {
                return false;
            }
        }
    }
    return true;
}

function checkWin(riga, colonna) {
    return checkOrizzontale(riga, colonna) ||
        checkVerticale(riga, colonna) ||
        checkDiagonaleDestra(riga, colonna) ||
        checkDiagonaleSinistra(riga, colonna);
}

function checkOrizzontale(riga, colonna) {
    let gname = arrTabella[riga][colonna];
    let conta = 1;
    for (let i = colonna + 1; i < colonne; i++) {
        if (arrTabella[riga][i] === gname) {
            conta++;
        } else {
            break;
        }
    }
    for (let i = colonna - 1; i >= 0; i--) {
        if (arrTabella[riga][i] === gname) {
            conta++;
        } else {
            break;
        }
    }
    return conta >= 4;
}

function checkVerticale(riga, colonna) {
    let gname = arrTabella[riga][colonna];
    let conta = 1;
    for (let i = riga + 1; i < righe; i++) {
        if (arrTabella[i][colonna] === gname) {
            conta++;
        } else {
            break;
        }
    }
    for (let i = riga - 1; i >= 0; i--) {
        if (arrTabella[i][colonna] === gname) {
            conta++;
        } else {
            break;
        }
    }
    return conta >= 4;
}

function checkDiagonaleSinistra(riga, colonna) {
    let gname = arrTabella[riga][colonna];
    let conta = 1;
    // Verifica la diagonale verso il basso a destra
    for (let i = 1; riga + i < righe && colonna + i < colonne; i++) {
        if (arrTabella[riga + i][colonna + i] === gname) {
            conta++;
        } else {
            break;
        }
    }

    // Verifica la diagonale verso l'alto a sinistra
    for (let i = 1; riga - i >= 0 && colonna - i >= 0; i++) {
        if (arrTabella[riga - i][colonna - i] === gname) {
            conta++;
        } else {
            break;
        }
    }
    return conta >= 4;
}

function checkDiagonaleDestra(riga, colonna) {
    let gname = arrTabella[riga][colonna];
    let conta = 1;

    // Verifica la diagonale verso il basso a sinistra
    for (let i = 1; riga + i < righe && colonna - i >= 0; i++) {
        if (arrTabella[riga + i][colonna - i] === gname) {
            conta++;
        } else {
            break;
        }
    }

    // Verifica la diagonale verso l'alto a destra
    for (let i = 1; riga - i >= 0 && colonna + i < colonne; i++) {
        if (arrTabella[riga - i][colonna + i] === gname) {
            conta++;
        } else {
            break;
        }
    }

    return conta >= 4;
}

