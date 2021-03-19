import { libWrapper } from '../../lib/libWrapper/shim.js';
import { MODULE_ID, SETTINGS } from '../constants.mjs';

/**
 * Ensures that newly imported actors from a compendium do not have data pertaining to custom ability scores and skills.
 *
 * This is necessary because in 0.7.9, when an actor is imported, the new actor is created with the *prepared* data rather
 * than the source data. Since we inject the custom ability scores and skills into the actor's prepared data, that can be
 * included in the actual data after being imported.
 */
export default function patchEntityCollection_importFromCollection() {
    libWrapper.register(MODULE_ID, "EntityCollection.prototype.importFromCollection", function(wrapped, ...args) {
        const origUpdateData = args[2];

        const overrideUpdateData = {};
        const customAbilities = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_ABILITIES);
        const customSkills = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_SKILLS);

        for (let abl of customAbilities) {
            overrideUpdateData[`data.abilities.-=${abl.abbreviation}`] = null;
        }

        for (let skl of customSkills) {
            overrideUpdateData[`data.skills.-=${skl.abbreviation}`] = null;
        }

        args[2] = mergeObject(overrideUpdateData, origUpdateData, { inplace: false });

        wrapped(...args);
    }, "WRAPPER");
}
