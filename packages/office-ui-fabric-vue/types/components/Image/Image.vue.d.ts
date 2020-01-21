import { ImageLoadState } from './Image.types';
import BaseComponent from '../BaseComponent';
export default class Image extends BaseComponent {
    src: string;
    alt: string;
    width: string | number;
    height: string | number;
    imageFit: number;
    maximizeFrame: boolean;
    shouldFadeIn: boolean;
    shouldStartVisible: boolean;
    coverStyle: number;
    loadState: ImageLoadState;
    private static svgRegex;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    private onImageLoaded;
    private onImageError;
}
//# sourceMappingURL=Image.vue?rollup-plugin-vue=script.d.ts.map