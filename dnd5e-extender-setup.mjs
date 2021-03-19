import { registerSettings } from './scripts/settings.mjs';
import { MODULE_ID, SETTINGS, TEMPLATES } from './scripts/constants.mjs';
import patchActor5e_prepareDerivedData from './scripts/patches/actor5e_prepareDerivedData.mjs';
import registerRenderActorSheet5eHook from './scripts/hooks/renderActorSheet5e.mjs';
import patchEntityCollection_importFromCollection from './scripts/patches/entityCollection_importFromCollection.mjs';

Hooks.once('setup', async function dnd5eExtenderSetup() {
    console.log(MODULE_ID, '|', `Initializing ${MODULE_ID}`);

    // Set a class name on the body so our css overrides will take effect
    $('body').addClass('dnd5e-extender');

    registerRenderActorSheet5eHook()
    patchActor5e_prepareDerivedData();
    patchEntityCollection_importFromCollection();
    registerSettings();
    addCustomConfig();

    // Load Handlebars templates last as it is comparatively expensive and
    // we need to beat dnd5e starting to set up
    await loadTemplates(Object.values(flattenObject(TEMPLATES)));

    Hooks.call(`DND5eExtenderReady`);
});

/**
 * Add custom abilities and skills to the DND5E CONFIG object
 *
 * Also adds the custom ability and skill titles as localization strings to support sheets which use those localizations
 */
function addCustomConfig() {
    const customAbilities = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_ABILITIES);
    for (let { abbreviation, title } of customAbilities) {
        CONFIG.DND5E.abilities[abbreviation] = title;
        CONFIG.DND5E.abilityAbbreviations[abbreviation] = abbreviation;

        // Inject the label and abbreviation for each custom ability as a translation
        const capitalizedAbbr = abbreviation.charAt(0).toUpperCase() + abbreviation.slice(1);
        setProperty(game.i18n.translations.DND5E, `Ability${capitalizedAbbr}`, title);
        setProperty(game.i18n.translations.DND5E, `Ability${capitalizedAbbr}Abbr`, abbreviation);
    }

    const customSkills = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_SKILLS);
    for (let { abbreviation, title } of customSkills) {
        CONFIG.DND5E.skills[abbreviation] = title;

        // Inject the title for each custom skill as a translation
        const capitalizedAbbr = abbreviation.charAt(0).toUpperCase() + abbreviation.slice(1);
        setProperty(game.i18n.translations.DND5E, `Skill${capitalizedAbbr}`, title);
    }
}
