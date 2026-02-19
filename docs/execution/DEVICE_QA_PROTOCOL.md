# DEVICE_QA_PROTOCOL.md

## Installation APK (preview)
1. Ouvrir l'URL EAS du build preview.
2. Telecharger l'APK sur le device Android.
3. Autoriser l'installation depuis source inconnue si necessaire.
4. Installer puis lancer l'application.

## 10 checks QA
1. Splash route automatiquement vers Onboarding (si onboarding incomplet).
2. Onboarding Profil enregistre les soldes (conges + RTT).
3. Onboarding Convention active la convention unique puis arrive au Tableau de bord.
4. Redemarrage app apres onboarding: bypass onboarding vers Tableau de bord.
5. Tableau de bord affiche les soldes persistes.
6. Simulation_Config permet lancer la simulation deterministe sans crash.
7. Resultats affiche daysDeducted/daysOffGenerated/efficiencyScore.
8. Bloc "Commentaire IA" est present en lecture seule (aucune saisie, aucun appel externe).
9. Premium OFF: optimisation annuelle affiche un message FR de blocage (premium_required).
10. Aucun crash sur navigation principale (Tableau de bord, Calendrier, Simulation, Resultats, Parametres).

## Collecte logs
- Capturer `adb logcat` pendant les checks critiques:
  - `adb logcat | findstr /i \"ReactNativeJS AndroidRuntime\"`
- Joindre captures ecran: onboarding, dashboard, resultats, premium gate.
