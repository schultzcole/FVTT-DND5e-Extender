import { registerSettings } from './scripts/settings.mjs';
import { MODULE_ID, TEMPLATES } from './scripts/constants.mjs';

/* ------------------------------------ */
/* Initialize scripts					*/
/* ------------------------------------ */
Hooks.once('init', async function() {
    console.log(MODULE_ID, '|', `Initializing ${MODULE_ID}`);

    // Set a class name on the body so our css overrides will take effect
    $('body').addClass('dnd5e-extender');

    // Register custom scripts settings
    await registerSettings();

    // Load Handlebars templates last as it is comparatively expensive and
    // we need to beat dnd5e starting to set up
    await loadTemplates(Object.values(flattenObject(TEMPLATES)));

    Hooks.call(`DND5eExtendedReady`);
});
