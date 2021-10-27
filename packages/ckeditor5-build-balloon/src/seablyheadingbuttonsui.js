/**
 * Plugin for toggling toolbar buttons.
 * Adapted from HeadingButtonsUI
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import iconHeading1 from './theme/icons/heading1.svg';
import iconHeading2 from './theme/icons/heading2.svg';

const defaultIcons = {
	heading1: iconHeading1,
	heading2: iconHeading2
};

export default class SeablyHeadingButtonsUI extends Plugin {
	init() {
		const options = [
			{ model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' }
		];

		options.map( item => this._createButton( item ) );
	}

	_createButton( option ) {
		const editor = this.editor;

		editor.ui.componentFactory.add( option.model, locale => {
			const view = new ButtonView( locale );
			const command = editor.commands.get( 'heading' );

			view.label = option.title;
			view.icon = option.icon || defaultIcons[ option.model ];
			view.tooltip = true;
			view.bind( 'isEnabled' ).to( command );
			view.bind( 'isOn' ).to( command, 'value', value => value == option.model );

			view.on( 'execute', () => {
				this.execute( option.model );
			} );

			return view;
		} );
	}

	execute( option ) {
		const model = this.editor.model;
		const document = model.document;

		model.change( writer => {
			const blocks = Array.from( document.selection.getSelectedBlocks() );

			for ( const block of blocks ) {
				if ( block.is( option ) ) {
					writer.rename( block, 'paragraph' );
				}
				else {
					writer.rename( block, option );
				}
			}
		} );
	}
}
