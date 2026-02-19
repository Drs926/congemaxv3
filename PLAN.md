# PLAN.md

**Titre**
Plan Contractuel — CongéMax

**Objectif**
Découper le travail en tâches atomiques, dépendances et critères de done, avec budget de modification et interdiction de multi-tâche.

**Table des sections**
- Tâches atomiques
- Dépendances
- Critères de done par tâche
- Budget de modification
- Interdiction multi-tâche
- QUESTIONS BLOQUANTES
- À DÉCIDER

**Tâches atomiques**
1. Réception du PDF de convention.
2. Extraction structurée des règles depuis le PDF.
3. Formalisation des règles en RulePack versionné.
4. Validation humaine du RulePack.
5. Gel du RulePack.
6. Rédaction des tests du moteur (incluant cas limites obligatoires).
7. Implémentation du RuleEngine (après gel).
8. Implémentation des UseCases Application.
9. Implémentation UI des 9 écrans contractuels.
10. Mise en place de la persistance SQLite.
11. Implémentation de l’optimisation annuelle (Premium).
12. Exécution du Proof Pack et vérification conformité finale.

**Suivi d'exécution**
- [x] 1. Réception du PDF de convention. (source: `SOURCES/convention des assistances.pdf`)
- [x] 2. Extraction structurée des règles depuis le PDF. (artefacts: `SOURCES/rules_extraction.v1.md`, `SOURCES/rules_extraction.v1.json`)
- [x] 3. Formalisation des règles en RulePack versionné. (artefacts: `SOURCES/rulepack.v1.json`, `SOURCES/rulepack.v1.sources.md`)
- [x] 4. Validation humaine du RulePack. (preuve: `SOURCES/rulepack.v1.validation.md`)
- [x] 5. Gel du RulePack. (preuve: `SOURCES/rulepack.v1.freeze.json`)
- [x] 6. Rédaction des tests du moteur (incluant cas limites obligatoires). (artefact: `__tests__/ruleengine.contract.test.ts`)
- [x] 7. Implémentation du RuleEngine (après gel). (artefacts: `src/domain/ruleEngine.ts`, `src/domain/types.ts`)
- [x] 8. Implémentation des UseCases Application. (artefact: `src/application/simulateLeaveUseCase.ts`)
- [ ] 9. Implémentation UI des 9 écrans contractuels.
- [ ] 10. Mise en place de la persistance SQLite.
- [ ] 11. Implémentation de l’optimisation annuelle (Premium).
- [ ] 12. Exécution du Proof Pack et vérification conformité finale.

**Dépendances**
- 2 dépend de 1.
- 3 dépend de 2.
- 4 dépend de 3.
- 5 dépend de 4.
- 6 dépend de 5.
- 7 dépend de 6.
- 8 dépend de 7.
- 9 dépend de 8.
- 10 dépend de 9.
- 11 dépend de 10.
- 12 dépend de 11.

**Critères de done par tâche**
- 1 : PDF disponible et référencé.
- 2 : Règles extraites et structurées.
- 3 : RulePack versionné rédigé conforme structure minimale.
- 4 : Validation humaine documentée.
- 5 : RulePack gelé.
- 6 : Tests écrits incluant tous les cas limites contractuels.
- 7 : RuleEngine déterministe et conforme ordre hiérarchique.
- 8 : UseCases isolant Domain de l’UI.
- 9 : 9 écrans contractuels, aucun écran en plus.
- 10 : SQLite local opérationnel.
- 11 : Algorithme d’optimisation conforme (parcours glissant année civile, simulation automatique périodes, calcul rendement, tri décroissant).
- 12 : Proof Pack exécuté et conforme.

**Budget de modification**
- Toute modification de règle implique un nouveau RulePack et versionTag modifié.
- Aucun ajout fonctionnel hors document fondateur.

**Interdiction multi-tâche**
- Une seule tâche atomique à la fois.

**QUESTIONS BLOQUANTES**
- Définition exacte des commandes de tests, coverage, typecheck et lint.

**À DÉCIDER**
- Aucun.
