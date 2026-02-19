# ERROR_PLAYBOOK.md

**Titre**
Playbook Erreurs — CongéMax

**Objectif**
Procédures normalisées pour erreurs contractuelles : test failure, type failure, coverage insuffisante, invariant RuleEngine violé, divergence UI / contract.

**Table des sections**
- Test failure
- Type failure
- Coverage insuffisante
- Invariant RuleEngine violé
- Divergence UI / contract
- QUESTIONS BLOQUANTES
- À DÉCIDER

**Test failure**
- Stopper la progression.
- Capturer la preuve (résultat de la commande de test).
- Identifier le cas limite concerné si applicable.
- Corriger uniquement conformément au contrat.

**Type failure**
- Stopper la progression.
- Capturer la preuve (résultat du typecheck strict).
- Corriger les types sans ajout de champ non défini.

**Coverage insuffisante**
- Stopper la progression.
- Capturer la preuve (rapport de couverture).
- Ajouter des tests uniquement pour les cas contractuels.

**Invariant RuleEngine violé**
- Stopper la progression.
- Capturer la preuve (reproduction minimale).
- Vérifier l’ordre hiérarchique des règles.
- Vérifier la déterminisme et l’absence d’heuristique.

**Divergence UI / contract**
- Stopper la progression.
- Capturer la preuve (écran ou flux non contractuel).
- Supprimer ou rectifier l’élément non conforme.

**QUESTIONS BLOQUANTES**
- Commandes exactes à utiliser pour tests, coverage, typecheck strict et lint.

**À DÉCIDER**
- Aucun.
