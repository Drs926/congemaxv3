# STATE_MACHINE_CONTRACT.md

**Titre**
Contrat Machine à États — CongéMax

**Objectif**
Décrire les états globaux, événements autorisés, transitions, conditions de blocage et invariants non négociables, sans extrapolation.

**Table des sections**
- États globaux
- Événements autorisés
- Transitions
- Conditions de blocage
- Invariants non négociables
- QUESTIONS BLOQUANTES
- À DÉCIDER

**États globaux**
- SplashScreen
- Onboarding_Profil
- Onboarding_Convention
- Onboarding_ParamètresEntreprise
- Dashboard
- Calendrier
- Simulation_Result
- Optimisation_Annuelle
- Paramètres

**Événements autorisés**
- Navigation entre écrans contractuels (événements non nommés et non spécifiés).
- Lancement d’une simulation.
- Lancement d’une optimisation annuelle.

**Transitions**
- Non définies contractuellement.

**Conditions de blocage**
- RulePack non gelé.
- Convention PDF ambiguë, contradictoire ou incomplète.
- Absence de PDF, d’extraction validée, de RulePack rédigé, de tests écrits, de validation humaine et de gel RulePack.

**Invariants non négociables**
- Aucun écran non contractuel.
- Aucun appel du RuleEngine depuis l’UI.
- Aucune logique date dans l’UI.
- Aucune mutation directe d’état sans useCase.
- Moteur déterministe, testable, sans heuristique.

**QUESTIONS BLOQUANTES**
- Transitions autorisées entre écrans et leurs conditions d’entrée/sortie.
- Événements précis et noms d’événements.
- Définition exacte des états de cycle de vie (loading, empty, error) pour chaque écran.

**À DÉCIDER**
- Aucun.
