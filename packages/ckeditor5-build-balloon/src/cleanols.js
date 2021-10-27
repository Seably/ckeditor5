import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class CleanOLs extends Plugin {
	init() {
		this.attachPasteHandler();
	}

	attachPasteHandler() {
		this.editor.plugins.get( 'Clipboard' ).on( 'inputTransformation', ( evt, data ) => {
			if ( !data.content.isEmpty ) {
				for ( const elem of data.content.getChildren() ) {
					this.cleanOlElements( elem );
				}
				return data;
			}
		} );
	}

	cleanOlElements( elem ) {
		if ( elem.childCount > 0 ) {
			for ( const child of elem.getChildren() ) {
				this.cleanOlElements( child );
			}
		}

		if ( elem.name == 'ol' ) {
			elem.name = 'ul';
		}
	}
}
