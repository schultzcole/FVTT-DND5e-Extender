import { MODULE_ID, SETTINGS } from './constants.mjs';

export function debugLog(force, ...args) {
    const debugModeSetting = game.settings.get(MODULE_ID, SETTINGS.DEBUG_MODE);

    if (force || CONFIG[MODULE_ID]?.debug || debugModeSetting) {
        console.log(MODULE_ID, '|', ...args);
    }
}
