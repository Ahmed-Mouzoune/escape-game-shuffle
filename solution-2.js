const { GAMEMASTERS, ROOMS } = require("./data");
// Contraitement à la solution numéro 1 vous aurez forcément une solution s'il y'a assez de GM formé mais ducoup les résultats seront moins hasardeux

// Fonction pour mélanger l'ordre des Game Masters de manière aléatoire
const ShuffleArrayGamemaster = (gamemastersArray) =>
  gamemastersArray
    .sort(() => Math.random() - 0.5)
    .slice(0, gamemastersArray.length);

// Fonction pour attribuer les GM aux salles de façon récursive
const assignGamemasters = (rooms, gamemasters, assignments, roomIndex) => {
  // Si toutes les salles ont été attribuer on arrête la fonction
  if (roomIndex >= rooms.length) return true;

  const room = rooms[roomIndex];

  // Logique pour attribuer un GM à la salle actuelle
  for (let i = 0; i < gamemasters.length; i++) {
    const gm = gamemasters[i];

    // Vérifier si le GM peut gérer la salle
    if (
      gm.rooms.includes(room.id) &&
      !assignments.some((a) => a.gamemaster === gm.name)
    ) {
      // On attribue le GM à la salle
      assignments.push({ room: room.name, gamemaster: gm.name });

      // De manière récursive on passe à la salle suivante
      if (assignGamemasters(rooms, gamemasters, assignments, roomIndex + 1))
        return true;

      // Si ça ne fonctionne pas on enlève l'attribution
      assignments.pop();
    }
  }

  // Si jamais même avec cette solution aucune attribution n'est possible pour cette salle on retourne false
  return false;
};

const main = () => {
  // On mélange le tableau initiale
  const availableGMS = ShuffleArrayGamemaster(GAMEMASTERS);
  const assignments = [];

  // On essaye  d'attribuer les GM à toutes les salles de manière aléatoires
  const success = assignGamemasters(ROOMS, availableGMS, assignments, 0);

  // Si ça marche on affiche un message de succès avec la liste des GM et leur sessions
  if (success) return console.log("Attributions réussies :", assignments);
  return console.log("Impossible de trouver une solution avec ce tirage.");
};

// Appel de la fonction principale
main();
