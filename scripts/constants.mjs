export const MODULE_ID = 'dnd5e-extender';
export const MODULE_ABBREV = 'EXT5E';

export const TEMPLATES = {
    settings: `modules/${MODULE_ID}/templates/settings.hbs`,
    settingSubmit: `modules/${MODULE_ID}/templates/settings-submit.hbs`,
    abilities: {
        table: `modules/${MODULE_ID}/templates/abilities/settings-abilities.hbs`,
        tableRow: `modules/${MODULE_ID}/templates/abilities/settings-abilities-tr.hbs`,
    },
    skills: {
        table: `modules/${MODULE_ID}/templates/skills/settings-skills.hbs`,
        tableRow: `modules/${MODULE_ID}/templates/skills/settings-skills-tr.hbs`,
    },
};

/** @enum {string} */
export const SETTINGS = {
    CUSTOM_ABILITIES: "custom-abilities",
    CUSTOM_SKILLS: "custom-skills",
    DEBUG_MODE: "debug-mode",
};

export const FLAGS = {
    SAVED_ABILITIES: "saved-abilities",
    SAVED_SKILLS: "saved-skills",
}
