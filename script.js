/* ==============================
   1. ELEMENTS
============================== */

const languageButton = document.getElementById("languageButton");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const currentYear = document.getElementById("currentYear");

const supportedLanguages = ["en", "pt"];

let currentLanguage = "en";


/* ==============================
   2. LANGUAGE STORAGE
============================== */

function getSavedLanguage() {
    try {
        const savedLanguage = localStorage.getItem("site-language");

        if (supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }
    } catch (error) {
        console.warn("Could not load saved language.");
    }

    return "en";
}


function saveLanguage(language) {
    try {
        localStorage.setItem("site-language", language);
    } catch (error) {
        console.warn("Could not save language preference.");
    }
}


/* ==============================
   3. CHANGE WEBSITE LANGUAGE
============================== */

function updateLanguage(language) {
    if (!supportedLanguages.includes(language)) {
        return;
    }

    currentLanguage = language;

    // Update the HTML language
    document.documentElement.lang = language;

    // Translate all elements with data-en and data-pt
    const translatedElements = document.querySelectorAll(
        "[data-en][data-pt]"
    );

    translatedElements.forEach((element) => {
        const translation = element.getAttribute(`data-${language}`);

        if (translation !== null) {
            element.textContent = translation;
        }
    });

    // Update the language button
    if (languageButton) {
        const nextLanguage = language === "en" ? "pt" : "en";

        languageButton.textContent = nextLanguage.toUpperCase();

        languageButton.setAttribute(
            "aria-label",
            language === "en"
                ? "Mudar idioma para português"
                : "Switch language to English"
        );

        languageButton.setAttribute(
            "title",
            language === "en"
                ? "Português"
                : "English"
        );
    }

    // Update the browser tab title
    document.title = language === "en"
        ? "English Learning | Igor Frediani"
        : "Aprendendo Inglês | Igor Frediani";

    // Save the selected language
    saveLanguage(language);
}


/* ==============================
   4. LANGUAGE BUTTON
============================== */

if (languageButton) {
    languageButton.addEventListener("click", () => {
        const nextLanguage = currentLanguage === "en"
            ? "pt"
            : "en";

        updateLanguage(nextLanguage);
    });
}


/* ==============================
   5. MOBILE MENU
============================== */

function closeMenu() {
    if (!menuButton || !navLinks) {
        return;
    }

    navLinks.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute(
        "aria-label",
        currentLanguage === "en"
            ? "Open navigation menu"
            : "Abrir menu de navegação"
    );

    menuButton.textContent = "☰";
}


function toggleMenu() {
    if (!menuButton || !navLinks) {
        return;
    }

    const isOpen = navLinks.classList.toggle("active");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? (currentLanguage === "en"
                ? "Close navigation menu"
                : "Fechar menu de navegação")
            : (currentLanguage === "en"
                ? "Open navigation menu"
                : "Abrir menu de navegação")
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
}


// Open and close the menu
if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}


// Close the menu after clicking a navigation link
if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}


// Close the menu with Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// Close the menu when returning to desktop width
window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
        closeMenu();
    }
});


/* ==============================
   6. AUTOMATIC COPYRIGHT YEAR
============================== */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ==============================
   7. INITIALIZE WEBSITE
============================== */

// Load the previously selected language
updateLanguage(getSavedLanguage());

// Ensure the mobile menu starts closed
closeMenu();