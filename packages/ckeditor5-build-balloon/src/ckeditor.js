/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

import SeablyHeadingButtonsUI from './seablyheadingbuttonsui';
import CleanOLs from './cleanols';
import CleanNBSPs from './cleanNBSPs';

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
	Essentials,
	Bold,
	Italic,
	Heading,
	SeablyHeadingButtonsUI,
	Paragraph,
	Link,
	List,
	PasteFromOffice,
	CleanOLs,
	CleanNBSPs
];

// Editor configuration.
BalloonEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading1',
			'heading2',
			'bold',
			'italic',
			'link',
			'bulletedList'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en',
	link: {
		decorators: {
			addTargetToExternalLinks: {
				mode: 'automatic',
				callback: () => true,
				attributes: {
					target: '_blank',
					rel: 'noopener noreferrer'
				}
			}
		}
	}
};
