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
1. Demarrer l'app: Splash doit router automatiquement vers `OnboardingProfil` si onboarding incomplet.
2. Renseigner `Solde conges` et `Solde RTT`, puis cliquer `Continuer`.
3. Sur `OnboardingConvention`, verifier la convention unique (IDCC 1801) puis valider.
4. Valider l'onboarding.
Preuve attendue:
- Navigation effective `Splash -> OnboardingProfil -> OnboardingConvention -> TableauDeBord`.
- Aucun blocage sur Splash.
- UI en francais.

## SCN-E2E-02 Simulation config -> resultat deterministe
1. Depuis `TableauDeBord`, ouvrir `Configurer une simulation`.
2. Saisir `Date de debut` et `Date de fin` (format AAAA-MM-JJ).
3. Lancer la simulation.
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
1. Ouvrir `Parametres` puis desactiver Premium.
2. Tenter `Tester optimisation annuelle`.
3. Observer le comportement retourne par le UseCase.
4. Capturer la preuve d'erreur.
Preuve attendue:
- Refus explicite de l'operation premium, sans crash.
- Message FR de gate premium (declenche par `premium_required`).

## Collecte preuves
- Screenshots a capturer:
  - Splash initial.
  - Onboarding profil (champs soldes).
  - Onboarding convention.
  - Tableau de bord.
  - Simulation config.
  - Resultats (avec bloc Commentaire IA).
  - Echec premium gate (message FR).
- Logs Metro a copier/coller:
  - Terminal ou `npx expo start --clear` est lance.
  - Copier les lignes autour des actions de simulation et de tentative premium.
  - Sauvegarder en annexe de preuve avec horodatage.
