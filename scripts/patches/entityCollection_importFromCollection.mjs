import { libWrapper } from '../../lib/libWrapper/shim.js';
import { MODULE_ID, SETTINGS } from '../constants.mjs';

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
