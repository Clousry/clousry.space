"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CapabilitiesGrid } from "@/components/capabilities-grid";
import { FooterCta } from "@/components/footer-cta";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { SiteControls } from "@/components/site-controls";
import { ShowreelPlaceholder } from "@/components/showreel-placeholder";
import { siteCopy, type Locale } from "@/lib/site-copy";

const LOCALE_STORAGE_KEY = "clousry-locale";
const THEME_STORAGE_KEY = "clousry-theme";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

const localeListeners = new Set<() => void>();
const themePreferenceListeners = new Set<() => void>();

function notifyListeners(listeners: Set<() => void>) {
  listeners.forEach((listener) => listener());
}

function getStoredLocaleSnapshot(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return savedLocale === "tr" || savedLocale === "en" ? savedLocale : "en";
}

function subscribeToLocale(listener: () => void) {
  localeListeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      localeListeners.delete(listener);
    };
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    localeListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function setStoredLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  notifyListeners(localeListeners);
}

function getStoredThemePreferenceSnapshot(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "system";
}

function subscribeToThemePreference(listener: () => void) {
  themePreferenceListeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      themePreferenceListeners.delete(listener);
    };
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    themePreferenceListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function setStoredThemePreference(theme: ThemePreference) {
  if (typeof window === "undefined") {
    return;
  }

  if (theme === "system") {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } else {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  notifyListeners(themePreferenceListeners);
}

function getSystemThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToSystemTheme(listener: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", listener);

  return () => {
    mediaQuery.removeEventListener("change", listener);
  };
}

export function SitePage() {
  const locale = useSyncExternalStore(subscribeToLocale, getStoredLocaleSnapshot, () => "en");
  const themePreference = useSyncExternalStore(
    subscribeToThemePreference,
    getStoredThemePreferenceSnapshot,
    () => "system",
  );
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => "light",
  );
  const theme = themePreference === "system" ? systemTheme : themePreference;
  const copy = siteCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--page-bg)] text-[var(--text-primary)]">
      <div className="page-grid pointer-events-none absolute inset-0 opacity-[0.45]" />
      <div className="page-ambient-top pointer-events-none absolute inset-x-0 top-0 h-[32rem]" />
      <div className="page-ambient-blur pointer-events-none absolute inset-x-0 top-40 mx-auto h-80 max-w-6xl rounded-full blur-3xl" />

      <Navbar content={copy.navbar} />
      <SiteControls
        content={copy.navbar}
        locale={locale}
        onLocaleChange={setStoredLocale}
        theme={theme}
        onThemeChange={setStoredThemePreference}
      />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-14 pt-28 sm:px-6 sm:pb-8 lg:px-8 lg:pt-32">
        <Hero content={copy.hero} />
        <ShowreelPlaceholder content={copy.showreel} />
        <CapabilitiesGrid content={copy.capabilities} />
      </main>

      <FooterCta content={copy.footer} theme={theme} />
    </div>
  );
}
