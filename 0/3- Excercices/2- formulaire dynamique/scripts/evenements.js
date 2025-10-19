import Formulaire from './formulaire.js';

// créa du formulaire

export const formulaire = new Formulaire("formulaire");

formulaire.maskChamp('societe');

formulaire.maskChamp('email');

//Montre ou cache "société" en fonction du radio

formulaire.getElement('particulier').addEventListener('change', () => {formulaire.hideChamp('societe')});

formulaire.getElement('professionnel').addEventListener('change', () => {formulaire.showChamp('societe')});

//"Demande de contact" => montre "email"

formulaire.getElement('objet').addEventListener('change', ()  => {formulaire.isSelected('objet', "demande_de_contact", () => formulaire.showChamp('email'), () => formulaire.hideChamp('email'));});

//"submit" pour récupérer les données du formulaire

formulaire.formulaireHtml.addEventListener('submit',
    (event) => {
        event.preventDefault();
        formulaire.affAnswers();
        console.log(formulaire.answers)
    }
);