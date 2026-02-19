# NON_FUNCTIONAL.md

**Titre**
Exigences Non Fonctionnelles — CongéMax

**Objectif**
Lister les exigences non fonctionnelles contractuelles : offline, performance, persistance SQLite, couverture tests, reproductibilité.

**Table des sections**
- Offline behavior
- Performance targets
- SQLite persistence constraints
- Test coverage requirements
- Reproductibilité simulation
- QUESTIONS BLOQUANTES
- À DÉCIDER

**Offline behavior**
- Aucun backend MVP.
- Stockage local SQLite uniquement.

**Performance targets**
- Non définis contractuellement.

**SQLite persistence constraints**
- Persistance locale via SQLite.
- Aucune contrainte supplémentaire définie.

**Test coverage requirements**
- Couverture tests moteur de calcul > 90 %.
- Tests obligatoires sur cas limites listés dans le document fondateur.

**Reproductibilité simulation**
- Toute simulation doit être recalculable à l’identique à partir des snapshots.

**QUESTIONS BLOQUANTES**
- Objectifs de performance (latence, temps de calcul, charge maximale) non définis.
- Politique de sauvegarde/restauration des données locales non définie.

**À DÉCIDER**
- Aucun.
