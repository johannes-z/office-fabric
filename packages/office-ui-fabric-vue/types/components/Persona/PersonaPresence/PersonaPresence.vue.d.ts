import BaseComponent from '../../BaseComponent';
import { PersonaPresence as PersonaPresenceEnum } from '../Persona.types';
export default class PersonaPresence extends BaseComponent {
    presence: any;
    size: any;
    isOutOfOffice: any;
    coinSize: any;
    presenceTitle: any;
    PersonaPresenceEnum: typeof PersonaPresenceEnum;
    get renderIcon(): boolean;
    get presenceHeightWidth(): string;
    get coinSizeWithPresenceStyle(): {
        width: string;
        height: string;
    } | undefined;
    get coinSizeWithPresenceIconStyle(): {
        fontSize: string;
        lineHeight: string;
    } | undefined;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    get icon(): "" | "SkypeCheck" | "SkypeArrow" | "SkypeClock" | "SkypeMinus" | undefined;
}
//# sourceMappingURL=PersonaPresence.vue?rollup-plugin-vue=script.d.ts.map