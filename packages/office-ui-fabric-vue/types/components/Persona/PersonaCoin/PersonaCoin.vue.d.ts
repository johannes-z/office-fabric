import BaseComponent from '../../BaseComponent';
import { mergeStyles } from '@uifabric/merge-styles';
import { getPersonaInitialsColor } from '../PersonaInitialsColor';
import { PersonaSize } from '../Persona.types';
import { ImageFit } from '../../Image';
export default class PersonaCoin extends BaseComponent {
    allowPhoneInitials: boolean;
    presence: number;
    size: number;
    coinSize: number;
    coinProps: any;
    showUnknownPersonaCoin: any;
    isOutOfOffice: any;
    presenceTitle: any;
    imageUrl: any;
    imageInitials: any;
    text: any;
    initialsColor: any;
    mergeStyles: typeof mergeStyles;
    getPersonaInitialsColor: typeof getPersonaInitialsColor;
    PersonaSize: typeof PersonaSize;
    ImageFit: typeof ImageFit;
    get initials(): any;
    get dimension(): number;
    get personaPresenceProps(): {
        coinSize: number;
        isOutOfOffice: any;
        presence: number;
        presenceTitle: any;
        size: number;
        theme: any;
    };
    get shouldRenderInitials(): boolean;
    get coinSizeStyle(): {
        width: number;
        height: number;
    } | undefined;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
}
//# sourceMappingURL=PersonaCoin.vue?rollup-plugin-vue=script.d.ts.map