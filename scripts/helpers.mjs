import { MODULE_ID, MY_SETTINGS } from './constants.mjs';

export function debugLog(force, ...args) {
    const debugModeSetting = game.settings.get(MODULE_ID, MY_SETTINGS.DEBUG_MODE);

    if (force || CONFIG[MODULE_ID]?.debug || debugModeSetting) {
        console.log(MODULE_ID, '|', ...args);
    }
}
