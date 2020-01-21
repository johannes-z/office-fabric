import BaseComponent from '../BaseComponent';
import { PersonaSize } from './Persona.types';
export default class Persona extends BaseComponent {
    allowPhoneInitials: boolean;
    presence: number;
    size: number;
    coinSize: number;
    initialsColor: number;
    hidePersonaDetails?: boolean;
    text?: string;
    secondaryText?: string;
    tertiaryText?: string;
    optionalText?: string;
    imageUrl?: string;
    status?: string;
    isOutOfOffice?: boolean;
    showSecondaryText?: boolean;
    PersonaSize: typeof PersonaSize;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
}
//# sourceMappingURL=Persona.vue?rollup-plugin-vue=script.d.ts.map