/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor';

export default class CleanNBSPs extends Plugin {
	init() {
		this.attachPasteHandler();
	}

	attachPasteHandler() {
		const htmlDataProcessor = new HtmlDataProcessor();

		this.editor.plugins.get( 'Clipboard' ).on( 'inputTransformation', ( _, data ) => {
			if ( !data.content.isEmpty ) {
				const transformedContent = htmlDataProcessor.toData( data.content ).replaceAll( '&nbsp;', ' ' );
				data.content = htmlDataProcessor.toView( transformedContent );
			}
		} );
	}
}
