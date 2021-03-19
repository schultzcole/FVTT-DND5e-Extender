import { FLAGS, MODULE_ID, SETTINGS } from '../constants.mjs';

export default function registerRenderActorSheet5eHook() {
    Hooks.on("renderActorSheet5e", (sheetClass, $sheetElement, data) => {

        const customAbilities = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_ABILITIES);
        const customSkills = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_SKILLS);

        for (let abl of customAbilities) {
            $sheetElement.find(`[name^="data.abilities.${abl.abbreviation}"`).each(function() {
                this.name = this.name.replace("data.abilities", `flags.${MODULE_ID}.${FLAGS.SAVED_ABILITIES}`);
            });
        }

        for (let skl of customSkills) {
            $sheetElement.find(`[name^="data.skills.${skl.abbreviation}"`).each(function() {
                this.name = this.name.replace("data.skills", `flags.${MODULE_ID}.${FLAGS.SAVED_SKILLS}`);
            });
        }
    });
}
