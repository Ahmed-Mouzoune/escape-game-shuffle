const { GAMEMASTERS, ROOMS } = require("./data");
// Cette solution est la première qui m'est venue en tête mais elle risque de ne pas trouver de solution s'il y'a peu de GM formée pour certaines salle, exemple: si il n'y en a que 2 qui peuvent s'occuper de Braquage à la française le script ne va pas souvent fonctionner

// Fonction pour mélanger l'ordre des Game Masters de manière aléatoire
const ShuffleArrayGamemaster = (gamemastersArray) =>
  gamemastersArray
    .sort(() => Math.random() - 0.5)
    .slice(0, gamemastersArray.length);

// Fonction principale pour attribuer un GM à chaque session
const main = () => {
  // On mélange le tableau initiale
  const availableGMS = ShuffleArrayGamemaster(GAMEMASTERS);

  // On essaye d'attribuer les GM à toutes les salles de manière aléatoires
  const assignments = ROOMS.map((room) => {
    const gm = availableGMS.find((gm) => gm.rooms.includes(room.id));

    if (!gm) {
      console.log(
        `Aucun Game Master restant n'est formé pour la salle "${room.name}"`
      );
      return null;
    }
    // Retirer le game master de la liste pour qu'il ne soit pas attribuée à d'autre session
    availableGMS.splice(availableGMS.indexOf(gm), 1);
    return {
      room: room.name,
      gamemaster: gm.name,
    };
  });

  // Si ça marche pas on affiche un message d'erreur disant qu'il n'y a pas de solution avec ce tirage
  const incompleteSessions = assignments.some((session) => session === null);
  if (incompleteSessions)
    return console.log("Impossible de trouver une solution avec ce tirage.");
  return console.log("Attributions réussies :", assignments);
};

main();
