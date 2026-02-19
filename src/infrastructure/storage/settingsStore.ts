import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProfileSettings {
  leaveRemaining: number;
  rttRemaining: number;
  timezone?: string;
}

export interface AppSettings {
  onboardingComplete: boolean;
  profile: ProfileSettings | null;
  conventionActiveId: string | null;
  premiumEnabled: boolean;
}

const SETTINGS_KEY = 'congemaxv3.settings.v1';

const DEFAULT_SETTINGS: AppSettings = {
  onboardingComplete: false,
  profile: null,
  conventionActiveId: null,
  premiumEnabled: false,
};

const clampToNonNegativeNumber = (value: unknown, fallback = 0): number => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback;
  }
  return value < 0 ? 0 : value;
};

const sanitizeSettings = (raw: unknown): AppSettings => {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_SETTINGS };
  }

  const candidate = raw as Partial<AppSettings>;
  const candidateProfile = candidate.profile;
  const profile =
    candidateProfile && typeof candidateProfile === 'object'
      ? {
          leaveRemaining: clampToNonNegativeNumber(candidateProfile.leaveRemaining),
          rttRemaining: clampToNonNegativeNumber(candidateProfile.rttRemaining),
          timezone:
            typeof candidateProfile.timezone === 'string' ? candidateProfile.timezone : undefined,
        }
      : null;

  return {
    onboardingComplete: candidate.onboardingComplete === true,
    profile,
    conventionActiveId:
      typeof candidate.conventionActiveId === 'string' ? candidate.conventionActiveId : null,
    premiumEnabled: candidate.premiumEnabled === true,
  };
};

const writeSettings = async (settings: AppSettings): Promise<void> => {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const settingsStore = {
  async getSettings(): Promise<AppSettings> {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return { ...DEFAULT_SETTINGS };
    }

    try {
      return sanitizeSettings(JSON.parse(raw));
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  },

  async saveSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
    const current = await this.getSettings();
    const next = sanitizeSettings({ ...current, ...patch });
    await writeSettings(next);
    return next;
  },

  async setProfile(profile: ProfileSettings): Promise<AppSettings> {
    return this.saveSettings({ profile });
  },

  async setConventionActiveId(conventionActiveId: string): Promise<AppSettings> {
    return this.saveSettings({ conventionActiveId });
  },

  async setOnboardingComplete(onboardingComplete: boolean): Promise<AppSettings> {
    return this.saveSettings({ onboardingComplete });
  },

  async setPremiumEnabled(premiumEnabled: boolean): Promise<AppSettings> {
    return this.saveSettings({ premiumEnabled });
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(SETTINGS_KEY);
  },
};
