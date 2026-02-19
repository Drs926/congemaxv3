# Contrat Ecrans CongéMax V3

## Titre
Contrat ecrans V3 (source de verite UI).

## Objectif
Definir exactement 8 ecrans contractuels, leurs donnees, leurs actions, leurs etats UI, leur navigation et leurs dependances Domain/UseCase, sans derivation hors scope.

## Contraintes gelees
- Outil individuel uniquement.
- Aucun workflow employeur.
- Aucun flux de gestion collective.
- Aucun circuit d'approbation hierarchique.
- Interface et libelles 100% francais.
- Calculs strictement deterministes.
- IA autorisee uniquement en commentaire de resultats, en lecture seule.
- Une seule convention collective active au meme instant.
- Changement de convention active: remise a zero des scenarios et des resultats memorises.

## Convention de nommage
- Identifiant ecran stable: `ID V3` numerote sur 3 chiffres.
- Nom d'ecran stable: suffixe explicite en francais.
- Les IDs ne changent pas entre versions mineures.

## Regles de navigation (contrat)
- Flux initial: `Splash -> Onboarding_Profil -> Onboarding_Convention -> TableauDeBord`.
- Navigation principale depuis `TableauDeBord` vers `Calendrier_Planification`, `Simulation_Config`, `Resultats`, `Parametres`.
- Aucun ecran hors contrat.
- Fonction premium non disponible: fallback vers `Parametres` avec CTA `Decouvrir Premium`.
- IA commentaire jamais disponible avant production d'un resultat deterministe.

## Modeles de donnees de reference
- `Profil`: `{ locale: "fr-FR", timezone: string, weekStart: 1 }`
- `Soldes`: `{ congesDays: number, rttDays: number, allowHalfDay: boolean }`
- `ConventionActive`: `{ idcc: string, name: string, versionTag: string, sourceRef: string }`
- `Scenario`: `{ scenarioId: string, startDate: string, endDate: string, includeRtt: boolean, notes: string }`
- `ResultatDeterministe`: `{ daysDeducted: number, daysOffGenerated: number, efficiencyScore: number, breakdown: string }`
- `CommentaireIA`: `{ text: string, generatedAt: string, readonly: true }`
- `PremiumStatus`: `{ enabled: boolean }`

## SCN-V3-001 Splash
A) Objectif unique:
Afficher l'etat de demarrage et router vers l'onboarding ou le tableau de bord.
B) Donnees entrantes:
`Profil`, `ConventionActive | null`.
C) Donnees produites:
`nextScreen: "Onboarding_Profil" | "TableauDeBord"`.
D) Actions autorisees:
Chargement local, determination du prochain ecran.
E) Etats UI:
`loading`: texte `Chargement...`; `empty`: texte `Preparation de votre espace`; `error`: `Impossible de demarrer l'application`.
F) Navigation sortante:
Vers `Onboarding_Profil` si profil incomplet; vers `TableauDeBord` sinon.
G) Dependances Domain/UseCase:
`ResolveStartupRoute` input `{ profil, conventionActive }` output `{ nextScreen }`.
H) Freemium/Premium:
Acces: Freemium.

## SCN-V3-002 Onboarding_Profil
A) Objectif unique:
Collecter et enregistrer le profil local indispensable au calcul.
B) Donnees entrantes:
`Profil | null`.
C) Donnees produites:
`Profil` enregistre.
D) Actions autorisees:
Saisir timezone, confirmer locale `fr-FR`, confirmer `weekStart=1`, enregistrer.
E) Etats UI:
`loading`: `Chargement du profil`; `empty`: formulaire vide pre-rempli `fr-FR`; `error`: `Enregistrement du profil impossible`.
F) Navigation sortante:
Vers `Onboarding_Convention` apres enregistrement valide.
G) Dependances Domain/UseCase:
`SaveProfile` input `{ timezone, locale, weekStart }` output `{ profil }`.
H) Freemium/Premium:
Acces: Freemium.

## SCN-V3-003 Onboarding_Convention
A) Objectif unique:
Charger et activer une convention collective unique pour la session de calcul.
B) Donnees entrantes:
`ConventionActive | null`, `PremiumStatus`.
C) Donnees produites:
`ConventionActive` active, drapeau de reinitialisation scenarios/resultats.
D) Actions autorisees:
Selectionner convention, activer convention, confirmer remise a zero des scenarios/resultats.
E) Etats UI:
`loading`: `Chargement des conventions`; `empty`: `Aucune convention disponible`; `error`: `Activation de la convention impossible`.
F) Navigation sortante:
Vers `TableauDeBord` apres activation.
G) Dependances Domain/UseCase:
`LoadConventionRuleSet` input `{ conventionRef }` output `{ conventionActive }`;
`ActivateConvention` input `{ conventionActive }` output `{ active: true }`;
`ResetScenariosOnConventionChange` input `{ previousConvention, nextConvention }` output `{ scenariosCleared: true, resultsCleared: true }`.
H) Freemium/Premium:
Acces: Freemium.

## SCN-V3-004 TableauDeBord
A) Objectif unique:
Donner une vue synthese des soldes et des points d'entree de simulation.
B) Donnees entrantes:
`Profil`, `Soldes`, `ConventionActive`, `PremiumStatus`.
C) Donnees produites:
Aucune sortie metier persistante.
D) Actions autorisees:
Consulter soldes, ouvrir planification, ouvrir configuration simulation, ouvrir resultats, ouvrir parametres.
E) Etats UI:
`loading`: `Chargement du tableau de bord`; `empty`: `Aucune donnee de solde`; `error`: `Affichage du tableau de bord impossible`.
F) Navigation sortante:
Vers `Calendrier_Planification`, `Simulation_Config`, `Resultats`, `Parametres`.
G) Dependances Domain/UseCase:
`LoadDashboardSnapshot` input `{ profilId }` output `{ soldes, conventionActive, premiumStatus }`.
H) Freemium/Premium:
Acces: Freemium.

## SCN-V3-005 Calendrier_Planification
A) Objectif unique:
Permettre la selection d'une plage de conges candidate pour alimenter un scenario.
B) Donnees entrantes:
`Scenario | null`, `ConventionActive`.
C) Donnees produites:
`Scenario` mis a jour avec `startDate` et `endDate`.
D) Actions autorisees:
Choisir date debut, choisir date fin, enregistrer la plage.
E) Etats UI:
`loading`: `Chargement du calendrier`; `empty`: `Aucune plage selectionnee`; `error`: `Enregistrement de la plage impossible`.
F) Navigation sortante:
Vers `Simulation_Config` apres enregistrement.
G) Dependances Domain/UseCase:
`SaveScenarioDates` input `{ scenarioId, startDate, endDate }` output `{ scenario }`.
H) Freemium/Premium:
Acces: Freemium.

## SCN-V3-006 Simulation_Config
A) Objectif unique:
Completer les options du scenario puis lancer le calcul deterministe.
B) Donnees entrantes:
`Scenario`, `Soldes`, `ConventionActive`.
C) Donnees produites:
`ResultatDeterministe` et `Scenario` passe a l'etat `simulated`.
D) Actions autorisees:
Activer/desactiver RTT, renseigner notes, lancer simulation.
E) Etats UI:
`loading`: `Preparation de la simulation`; `empty`: `Configuration incomplète`; `error`: `Simulation impossible`.
F) Navigation sortante:
Vers `Resultats` apres succes.
G) Dependances Domain/UseCase:
`ConfigureScenario` input `{ scenarioId, includeRtt, notes }` output `{ scenario }`;
`ComputeSimulation` input `{ scenario, soldes, conventionActive }` output `{ resultatDeterministe }`.
H) Freemium/Premium:
Acces: Freemium.

## SCN-V3-007 Resultats
A) Objectif unique:
Afficher le resultat deterministe et, si disponible, un commentaire IA en lecture seule.
B) Donnees entrantes:
`ResultatDeterministe`, `CommentaireIA | null`, `PremiumStatus`.
C) Donnees produites:
`CommentaireIA` optionnel (readonly) associe au dernier resultat.
D) Actions autorisees:
Consulter metriques deterministes, demander commentaire IA readonly, demander optimisation premium.
E) Etats UI:
`loading`: `Chargement des resultats`; `empty`: `Aucun resultat disponible`; `error`: `Affichage des resultats impossible`.
F) Navigation sortante:
Vers `Simulation_Config` pour recalcul; vers `Parametres` en fallback premium.
G) Dependances Domain/UseCase:
`LoadLastDeterministicResult` input `{ scenarioId }` output `{ resultatDeterministe }`;
`CommentResults` input `{ resultatDeterministe }` output `{ commentaireIA }`;
`OptimizeAnnualPlan` input `{ scenarioId, premiumStatus }` output `{ optimizedResult | premiumRequired }`.
H) Freemium/Premium:
Acces: Freemium pour resultat deterministe et commentaire IA readonly.
Fonction optimisation annuelle: Premium.
Fallback Freemium: CTA `Decouvrir Premium` vers `Parametres`.

## SCN-V3-008 Parametres
A) Objectif unique:
Centraliser les reglages utilisateur, le statut premium et le changement de convention active.
B) Donnees entrantes:
`Profil`, `PremiumStatus`, `ConventionActive`, `Soldes`.
C) Donnees produites:
`Profil` mis a jour, `PremiumStatus` mis a jour, `ConventionActive` mise a jour, drapeau de reset scenarios/resultats.
D) Actions autorisees:
Mettre a jour timezone, consulter statut premium, ouvrir offre premium, changer convention active, confirmer reset scenarios/resultats.
E) Etats UI:
`loading`: `Chargement des parametres`; `empty`: `Aucun parametre enregistre`; `error`: `Mise a jour des parametres impossible`.
F) Navigation sortante:
Vers `TableauDeBord`; vers `Onboarding_Convention` apres changement de convention.
G) Dependances Domain/UseCase:
`UpdateProfileSettings` input `{ profil }` output `{ profil }`;
`GetPremiumStatus` input `{ profilId }` output `{ premiumStatus }`;
`SetConventionActive` input `{ conventionRef }` output `{ conventionActive }`;
`ResetScenariosOnConventionChange` input `{ previousConvention, nextConvention }` output `{ scenariosCleared, resultsCleared }`.
H) Freemium/Premium:
Acces: Freemium.
Bloc offre premium: Premium.
Fallback Freemium: CTA `Decouvrir Premium` vers section offre premium locale.
