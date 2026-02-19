# PRODUCT_E2E_PROTOCOL.md

## Prérequis
- Node.js et npm installes.
- Expo CLI via `npx` disponible.
- Android Studio + emulateur Android configure, ou un device physique avec Expo Go.
- Repo local a jour, dependances installees (`npm install`).

## Procedure run (par defaut)
1. Ouvrir un terminal a la racine du repo.
2. Lancer `npx expo start --clear`.
3. Ouvrir l'app sur emulateur Android ou sur device via QR code.

## SCN-E2E-01 Onboarding profil + convention
1. Demarrer l'app et atteindre le flux onboarding.
2. Renseigner les informations de profil (prenom, nom, email, timezone, debut de semaine).
3. Aller a l'etape convention et selectionner la convention active.
4. Valider l'onboarding.
Preuve attendue:
- Ecran onboarding profil complete visible.
- Ecran onboarding convention visible avec convention active.
- Traces UI en francais uniquement.

## SCN-E2E-02 Simulation config -> resultat deterministe
1. Depuis l'ecran simulation, saisir une configuration de periode.
2. Lancer la simulation.
3. Rejouer exactement la meme simulation une seconde fois.
4. Comparer les resultats affiches.
Preuve attendue:
- Ecran Resultats affiche `daysDeducted`, `daysOffGenerated`, `efficiencyScore`.
- Les deux executions identiques donnent les memes valeurs.

## SCN-E2E-03 Commentaire IA (UI only) present et readonly (sans calcul IA)
1. Ouvrir l'ecran Resultats apres une simulation.
2. Localiser le bloc "Commentaire IA".
3. Verifier qu'aucun champ de saisie ou action de recalcul IA n'est propose.
Preuve attendue:
- Bloc "Commentaire IA" affiche en lecture seule.
- Aucun input IA, aucun bouton IA de calcul.

## SCN-E2E-04 Premium gate: tentative optimisation -> erreur premium_required (preuve UI/log)
1. Se placer en contexte non premium.
2. Tenter de lancer l'optimisation annuelle.
3. Observer le comportement retourne par le UseCase.
4. Capturer la preuve d'erreur.
Preuve attendue:
- Refus explicite de l'operation premium.
- Message/trace contenant `premium_required` (UI ou log).

## Collecte preuves
- Screenshots a capturer:
  - Splash initial.
  - Onboarding profil complete.
  - Onboarding convention.
  - Simulation config.
  - Resultats (avec bloc Commentaire IA).
  - Echec premium gate (`premium_required`).
- Logs Metro a copier/coller:
  - Terminal ou `npx expo start --clear` est lance.
  - Copier les lignes autour des actions de simulation et de tentative premium.
  - Sauvegarder en annexe de preuve avec horodatage.
