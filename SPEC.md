# SPEC.md

**Titre**
SPEC — CongéMax (Contrat Produit)

**Objectif**
Définir le périmètre strict, hors périmètre strict, interdits absolus et invariants métier, conformément au document fondateur contractuel.

**Table des sections**
- Périmètre strict
- Hors périmètre strict
- Interdits absolus
- Invariants métier
- QUESTIONS BLOQUANTES
- À DÉCIDER

**Périmètre strict**
- Application mobile individuelle d’aide à la décision pour salariés français.
- Visualisation du solde de congés.
- Simulation précise d’absences.
- Calcul déterministe du nombre réel de jours consommés.
- Optimisation annuelle stratégique.
- Application des règles issues d’une convention collective fournie en PDF via RulePack versionné et gelé.
- Types d’absences gérées uniquement :
- Congés payés.
- RTT si la convention les inclut explicitement.
- Jours de repos contractuels si définis comme assimilables à CP.
- Solde manuel (MVP) : saisie des CP restants et RTT restants par l’utilisateur.
- Stack imposée : React Native (Expo), TypeScript strict, architecture clean (Domain / Application / UI), date-fns, SQLite local, Jest.

**Hors périmètre strict**
- SIRH.
- Outil collaboratif.
- Validation manager.
- Générateur d’interprétation juridique.
- Moteur d’analyse automatique non vérifié.
- Congés spéciaux (événements familiaux, maladie, maternité/paternité, congés exceptionnels).
- Acquisition dynamique des congés (V2 seulement).
- Backend MVP.

**Interdits absolus**
- Interprétation directe du PDF par l’application.
- Implémentation avant gel du RulePack.
- Heuristiques ou interprétation libre dans le moteur.
- Écrans supplémentaires au-delà des 9 écrans contractuels.
- Champs métier non définis dans le document fondateur.
- Logique date dans l’UI.
- Mutation directe d’état sans useCase.
- Appel du RuleEngine depuis un composant UI.

**Invariants métier**
- Un PDF de convention est une source documentaire brute, jamais interprétée directement.
- Chaque convention correspond à un RulePack versionné.
- Le RulePack suit la structure minimale contractuelle.
- Toute modification de règle implique un nouveau RulePack et un nouveau versionTag.
- Ordre d’application des règles strict : Override entreprise (si autorisé) → RulePack → Paramètre utilisateur → Fallback générique.
- Moteur de calcul déterministe, testable, sans heuristique.
- Simulation reproductible à l’identique à partir des snapshots.
- Avant tout développement : PDF reçu, extraction validée, RulePack rédigé, tests écrits, validation humaine, RulePack gelé.
- Toute ambiguïté, contradiction ou incomplétude dans la convention PDF bloque l’extraction et interdit le développement.
- Tests de cas limites obligatoires (voir document fondateur section 14).
- Couverture tests moteur de calcul > 90 %.
- Aucun écran non contractuel, aucun champ métier non défini.

**QUESTIONS BLOQUANTES**
- Aucune.

**À DÉCIDER**
- Aucun.
