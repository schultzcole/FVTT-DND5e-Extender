import { MY_SETTINGS, MODULE_ID, MODULE_ABBREV, TEMPLATES } from "./constants.mjs";

export const registerSettings = function () {
    // debug use
    // CONFIG[MODULE_ID] = { debug: true };

    game.settings.registerMenu(MODULE_ID, "menu", {
        name: "D&D5e Extender Settings",
        label: "Extender Settings",
        icon: "fas fa-hammer",
        type: Dnd5eExtendersSettings,
        restricted: true,
    });

    game.settings.register(MODULE_ID, MY_SETTINGS.DEBUG_MODE, {
        name: `${MODULE_ABBREV}.settings.debug.Label`,
        hint: `${MODULE_ABBREV}.settings.debug.Hint`,
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            CONFIG[MODULE_ID] = { debug: value };
        },
    });

    //// EXTENSIONS

    game.settings.register(MODULE_ID, MY_SETTINGS.CUSTOM_ABILITIES, {
        scope: "world",
        config: false,
        type: Object,
        default: [],
    });

    game.settings.register(MODULE_ID, MY_SETTINGS.CUSTOM_SKILLS, {
        scope: "world",
        config: false,
        type: Object,
        default: [],
    });
};

export class Dnd5eExtendersSettings extends FormApplication {
    constructor(object = {}, options) {
        super(object, options);
    }

    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            classes: ["dnd5e-extender-settings"],
            closeOnSubmit: false,
            height: "auto",
            submitOnChange: false,
            submitOnClose: false,
            template: TEMPLATES.settings,
            title: "D&D5e Extender Settings",
            tabs: [
                {
                    navSelector: ".tabs",
                    contentSelector: "form",
                    initial: "warning",
                },
            ],
            width: 600,
        };
    }

    getData() {
        let data = super.getData();

        const customAbilities = game.settings.get(MODULE_ID, MY_SETTINGS.CUSTOM_ABILITIES);
        const customSkills = game.settings.get(MODULE_ID, MY_SETTINGS.CUSTOM_SKILLS);

        data.settings = {
            customSkills,
            customAbilities,
            abilities: game.dnd5e.config.abilities,
        };

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        const handleNewRowClick = async (currentTarget) => {
            const table = currentTarget.data().table;

            const tableElement = currentTarget.siblings("table");
            const tbodyElement = $(tableElement).find("tbody");

            const newRowData = {
                index: tbodyElement.children().length,
                item: {
                    abbreviation: "",
                    title: "",
                },
                abilities: game.dnd5e.config.abilities,
            };

            const newRow = $(await renderTemplate(TEMPLATES[table].tableRow, newRowData));
            // render a new row at the end of tbody
            tbodyElement.append(newRow);
            this.setPosition({ height: "auto" });
        };

        const handleDeleteRowClick = (currentTarget) => {
            currentTarget.parentsUntil("tbody").remove();
            this.setPosition({ height: "auto" });
        };

        html.on("click", (e) => {
            const currentTarget = $(e.target).closest("button")[0];
            if (!currentTarget) return;

            const wrappedCurrentTarget = $(currentTarget);
            if (wrappedCurrentTarget.hasClass("add-row")) {
                handleNewRowClick(wrappedCurrentTarget);
            } else if (wrappedCurrentTarget.hasClass("delete-row")) {
                handleDeleteRowClick(wrappedCurrentTarget);
            }
        });
    }

    async _updateObject(ev, formData) {
        const data = expandObject(formData);

        // TODO evaluate necessity of warnings after custom ability scores and skills are implemented
        // if any of our warnings are not checked, throw
        // if (Object.values(data.warning).includes(false)) {
        //     const errorMessage = game.i18n.localize(`${MODULE_ABBREV}.AllWarnings`);
        //
        //     ui.notifications.error(errorMessage);
        //
        //     throw Error(errorMessage);
        // }

        const abilitiesArray = Object.values(data.abilities || {});
        const skillsArray = Object.values(data.skills || {});

        await game.settings.set(MODULE_ID, MY_SETTINGS.CUSTOM_ABILITIES, abilitiesArray);
        await game.settings.set(MODULE_ID, MY_SETTINGS.CUSTOM_SKILLS, skillsArray);

        location.reload();
    }
}
