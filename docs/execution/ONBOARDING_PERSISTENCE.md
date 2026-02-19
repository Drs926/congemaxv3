# ONBOARDING_PERSISTENCE.md
- Stockage choisi: `@react-native-async-storage/async-storage`.
- Cle unique: `congemaxv3.settings.v1`.
- Champs persistes: `onboardingComplete`, `profile`, `conventionActiveId`, `premiumEnabled`.
- Lecture/merge typé dans `src/infrastructure/storage/settingsStore.ts`.
- Splash lit ce store pour router automatiquement.
- Onboarding_Profil met a jour `profile`.
- Onboarding_Convention ecrit `conventionActiveId` et `onboardingComplete=true`.
- Ce choix est minimal, fiable et testable sans modifier le moteur metier.
