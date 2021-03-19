import { libWrapper } from '../../lib/libWrapper/shim.js';
import { FLAGS, MODULE_ID, SETTINGS } from '../constants.mjs';

/**
 * Injects custom abilities and skills into the actor's data, using saved data from flags if available (otherwise reverting to default)
 */
export default function patchActor5e_prepareDerivedData() {
    libWrapper.register(MODULE_ID, "CONFIG.Actor.entityClass.prototype.prepareDerivedData", function patchedPrepareDerivedData(wrapped, ...args) {
        const customAbilities = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_ABILITIES);
        const customSkills = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_SKILLS);

        const savedAbilities = this.getFlag(MODULE_ID, FLAGS.SAVED_ABILITIES) ?? {};
        const savedSkills = this.getFlag(MODULE_ID, FLAGS.SAVED_SKILLS) ?? {};

        for (let abl of customAbilities) {
            this.data.data.abilities[abl.abbreviation] = mergeObject({ value: 10, proficient: 0 }, savedAbilities[abl.abbreviation]);
        }

        if (this.data.type !== "vehicle") {
            for (let skl of customSkills) {
                this.data.data.skills[skl.abbreviation] = mergeObject({ value: 0, ability: skl.ability }, savedSkills[skl.abbreviation]);
            }
        }

        return wrapped(...args);
    }, "WRAPPER");
}
