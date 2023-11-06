export default class CleanOLs extends Plugin {
    init(): void;
    attachPasteHandler(): void;
    cleanOlElements(elem: any): void;
}
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
