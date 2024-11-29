import { useState, useEffect, useMemo } from "react";

type Translations = Record<string, Record<string, string>>;

const useTranslation = (namespace: string) => {
  const [locale, setLocale] = useState<string>("en");
  const [translations, setTranslations] = useState<Translations | null>(null);

  // Load the locale from URL path or localStorage on initial load
  useEffect(() => {
    const pathLocale = window.location.pathname.split("/")[1]; // Get first part of the path (after /)
    const storedLocale = localStorage.getItem("locale");
    const newLocale = pathLocale || storedLocale || "en"; // Default to 'en' if not found

    setLocale(newLocale);

    if (!storedLocale && pathLocale) {
      localStorage.setItem("locale", newLocale);
    }
  }, []);

  // Fetch translations based on the current locale
  useEffect(() => {
    const loadTranslations = async () => {
      // Check if translations are already in localStorage
      const cachedTranslations = localStorage.getItem(`translations-${locale}`);
      if (cachedTranslations) {
        setTranslations(JSON.parse(cachedTranslations));
        return;
      }

      try {
        const translationModule = await import(
          `../translations/${locale}.json`
        );

        setTranslations(translationModule);

        // Cache translations in localStorage for future use
        localStorage.setItem(
          `translations-${locale}`,
          JSON.stringify(translationModule)
        );
      } catch (error) {
        console.error(`Failed to load translation for ${locale}`, error);
      }
    };

    loadTranslations();
  }, [locale]); // Trigger translation load on locale change

  // Memoize translations so they aren't recalculated unnecessarily
  const translate = useMemo(() => {
    return (key: string): string => {
      if (translations && translations[namespace]) {
        return translations[namespace][key] || key;
      }
      return key;
    };
  }, [translations, namespace]);

  // Handle language change and update URL & localStorage
  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale); // Store new locale in localStorage

    // Update the URL to reflect the new language (e.g., /en, /fr, etc.)
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    window.history.pushState({}, "", newPath); // Update the browser URL without reloading the page
  };

  return { translate, changeLanguage, locale };
};

export default useTranslation;
