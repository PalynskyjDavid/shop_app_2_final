import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const lngs = {
    en: { nativeName: "English", shortName: "en" },
    cs: { nativeName: "Čeština", shortName: "cs" },
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    loading: 'Loading...',
                    logIn: 'No user logged in.',
                    greeting: 'Hello',
                    changeLanguage: 'Change language',
                    cartName: 'Cart name',
                    create: 'Create',
                    close: 'Close',
                    addCart: 'Add cart',
                    cartFor: 'Cart for',
                    owner: 'Owner',
                    cartId: 'Cart ID',
                    resolved: 'Resolved',
                    notResolved: 'Not resolved',
                    selectUser: 'Select user',
                    showResolved: 'Show resolved',
                    showUnresolved: 'Show unresolved',
                    notImplemented: 'This function is not implemented yet.',
                }
            },
            cs: {
                translation: {
                    loading: 'Načítání...',
                    logIn: 'Nejste přihlášen.',
                    greeting: 'Ahoj',
                    changeLanguage: 'Změnit jazyk',
                    cartName: 'Jméno košíku',
                    create: 'Vytvořit',
                    close: 'Zavřít',
                    addCart: 'Přidat košík',
                    cartFor: 'Košík pro',
                    owner: 'Majitel',
                    cartId: 'ID košíku',
                    resolved: 'Vyřešen',
                    notResolved: 'Nevyřešen',
                    selectUser: 'Vyber uživatele',
                    showResolved: 'Zobrazit vyřešené',
                    showUnresolved: 'Zobrazit nevyřešené',
                    notImplemented: 'Tato fůnkce je prozatím nedostupná.',
                }
            }
        }
    });

export default i18n;
