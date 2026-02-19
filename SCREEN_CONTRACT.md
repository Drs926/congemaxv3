# SCREEN_CONTRACT.md

**Titre**
Contrat Écrans — CongéMax

**Objectif**
Définir, pour chacun des 9 écrans contractuels, les objectifs, données entrantes, actions autorisées, états, navigation sortante et dépendances Domain / UseCase, sans ajouter d’écran ni de logique non définie.

**Table des sections**
- 1. SplashScreen
- 2. Onboarding_Profil
- 3. Onboarding_Convention
- 4. Onboarding_ParamètresEntreprise
- 5. Dashboard
- 6. Calendrier
- 7. Simulation_Result
- 8. Optimisation_Annuelle (Premium)
- 9. Paramètres
- QUESTIONS BLOQUANTES
- À DÉCIDER

**1. SplashScreen**
- Objectif : Écran de démarrage contractuel.
- Données entrantes : Non défini.
- Actions autorisées : Non défini.
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**2. Onboarding_Profil**
- Objectif : Collecte des données de profil utilisateur nécessaires au MVP.
- Données entrantes : User (champs non précisés par écran), RulePack sélectionné (si applicable).
- Actions autorisées : Saisie des champs de profil définis par le modèle User.
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**3. Onboarding_Convention**
- Objectif : Sélection d’une convention collective et du RulePack associé.
- Données entrantes : ConventionCollective (idcc, name, versionTag, rulePackId).
- Actions autorisées : Sélection d’une convention / RulePack.
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**4. Onboarding_ParamètresEntreprise**
- Objectif : Saisie des paramètres entreprise (CompanySettings).
- Données entrantes : CompanySettings (holidayCountry, customHolidays, deductHolidayOverride, workingDaysModeOverride).
- Actions autorisées : Saisie / modification des CompanySettings.
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**5. Dashboard**
- Objectif : Visualisation du solde de congés et accès aux fonctions principales.
- Données entrantes : User.leaveRemaining, User.rttRemaining.
- Actions autorisées : Consultation du solde, accès aux écrans de simulation et calendrier (si défini).
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**6. Calendrier**
- Objectif : Visualisation calendrier pour préparation de simulation.
- Données entrantes : Données de simulation (startDate, endDate) et calendrier (non défini).
- Actions autorisées : Sélection de période d’absence.
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**7. Simulation_Result**
- Objectif : Affichage des résultats d’une simulation déterministe.
- Données entrantes : Output RuleEngine (daysDeducted, daysOffGenerated, efficiencyScore, detailedBreakdown).
- Actions autorisées : Consultation du résultat.
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**8. Optimisation_Annuelle (Premium)**
- Objectif : Optimisation annuelle stratégique selon l’algorithme contractuel.
- Données entrantes : Paramètres nécessaires à l’optimisation (non définis), RulePack, CompanySettings, UserSettings.
- Actions autorisées : Lancer l’optimisation annuelle.
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**9. Paramètres**
- Objectif : Gestion des paramètres utilisateur et application.
- Données entrantes : User, CompanySettings.
- Actions autorisées : Modification des paramètres autorisés (non définis par écran).
- États (loading / empty / error) : Non défini.
- Navigation sortante : Non définie.
- Dépendances Domain / UseCase : Non définies.

**QUESTIONS BLOQUANTES**
- Données exactes à collecter par écran, champs obligatoires et formats.
- Flux de navigation autorisé entre écrans et conditions d’accès.
- Dépendances précises Domain / UseCase par écran (noms, signatures, responsabilités).
- Définition des états loading / empty / error pour chaque écran.
- Contenu exact des paramètres utilisateur (UserSettings) utilisables dans l’UI.

**À DÉCIDER**
- Aucun.
