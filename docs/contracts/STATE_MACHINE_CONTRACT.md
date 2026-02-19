# State Machine Contract - CongéMax V3

## Objectif
Definir les etats d'un scenario et les transitions autorisees.

## Etats scenario
- `draft`
- `configured`
- `simulated`
- `optimized` (premium uniquement)

## Transitions autorisees
- `draft -> configured` via configuration scenario.
- `configured -> simulated` via calcul deterministe.
- `simulated -> optimized` via optimisation annuelle premium.
- `optimized -> configured` si parametres modifies.
- `simulated -> configured` si parametres modifies.

## Regles
- Toute modification de parametres invalide les resultats courants.
- Invalidation des resultats force le retour a l'etat `configured`.
- Sans premium actif, transition vers `optimized` interdite.
- Changement de convention active: reset scenarios et resultats, puis retour `configured`.
