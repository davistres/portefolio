const input = document.getElementById('input');
const submit = document.getElementById('submit');
const random = document.getElementById('random');

// Génère une chaîne de caractères aléatoires de longueur length
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Chaînes de caractères aléatoires
const compareString = generateRandomString(6);

// Affiche la chaîne de caractères aléatoires sur la page web
random.textContent = compareString;

// Fonction qui renvoie une promesse qui résout si la chaîne de caractères est égale à la chaîne de comparaison et rejette sinon
  function verifyString(stringToVerify) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stringToVerify === compareString) {
          resolve('Vérification réussie');
        } else {
          reject('Erreur : vérification échouée');
        }
      }, 2000); // Attente de deux secondes
    });
}


submit.addEventListener('click', () => {
  // Récupère la valeur de l'input
  const inputString = input.value;

  // Vérifie la chaîne de caractères
  verifyString(inputString)
    .then((message) => {
      alert(message);
    })
    .catch((error) => {
      alert(error);
    });
});
