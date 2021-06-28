/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import CheckboxView from '../../src/checkbox/checkboxview';
import { View, ViewCollection } from 'ckeditor5/src/ui';

describe( 'CheckboxView', () => {
	let locale, view;

	beforeEach( () => {
		locale = { t() {} };

		view = new CheckboxView( locale );
		view.render();
	} );

	afterEach( () => {
		view.destroy();
	} );

	describe( 'constructor()', () => {
		it( 'creates view#children collection', () => {
			expect( view.children ).to.be.instanceOf( ViewCollection );
		} );

		it( 'creates #labelView', () => {
			expect( view.labelView ).to.be.instanceOf( View );
		} );

		it( 'creates #checkboxInputView', () => {
			expect( view.checkboxInputView ).to.be.instanceOf( View );
		} );
	} );

	describe( 'checkbox bindings', () => {
		describe( 'attributes', () => {
			describe( 'class', () => {
				it( 'class is set initially', () => {
					expect( view.element.classList ).to.have.length( 1 );
					expect( view.element.classList.contains( 'ck-find-checkboxes__box' ) ).to.true;
				} );

				it( 'reacts on view#class', () => {
					view.set( 'class', 'foo' );
					expect( view.element.classList.contains( 'foo' ) ).to.be.true;
				} );

				it( 'reacts on view#isEnabled', () => {
					view.isEnabled = true;
					expect( view.element.classList.contains( 'ck-disabled' ) ).to.false;

					view.isEnabled = false;
					expect( view.element.classList.contains( 'ck-disabled' ) ).to.true;
				} );

				it( 'reacts on view#isVisible', () => {
					view.isVisible = true;
					expect( view.element.classList.contains( 'ck-hidden' ) ).to.be.false;

					view.isVisible = false;
					expect( view.element.classList.contains( 'ck-hidden' ) ).to.be.true;
				} );

				it( 'reacts on view#id', () => {
					view.id = 'testId';
					expect( view.checkboxInputView.element.id ).to.equal( 'testId' );

					view.id = null;
					expect( view.checkboxInputView.element.hasAttribute( 'id' ) ).to.be.false;
				} );
			} );

			describe( 'tabindex', () => {
				it( 'is initially set ', () => {
					expect( view.element.attributes.tabindex.value ).to.equal( '-1' );
				} );

				it( 'reacts on view#tabindex', () => {
					view.tabindex = 3;
					expect( view.element.attributes.tabindex.value ).to.equal( '3' );
				} );
			} );
		} );
	} );

	describe( '_createCheckboxInputView', () => {
		it( 'checkbox type is initially set ', () => {
			expect( view.checkboxInputView.element.getAttribute( 'type' ) ).to.equal( 'checkbox' );
		} );

		describe( 'checkbox attributes', () => {
			it( 'reacts on view#id', () => {
				expect( view.checkboxInputView.element.getAttribute( 'id' ) ).to.be.null;

				view.checkboxInputView.element.id = 'foo';
				expect( view.checkboxInputView.element.getAttribute( 'id' ) ).to.equal( 'foo' );
			} );

			it( 'reacts on view#name', () => {
				expect( view.checkboxInputView.element.getAttribute( 'name' ) ).to.be.null;

				view.checkboxInputView.element.name = 'foo';
				expect( view.checkboxInputView.element.getAttribute( 'name' ) ).to.equal( 'foo' );
			} );

			it( 'reacts on view#value', () => {
				expect( view.checkboxInputView.element.getAttribute( 'value' ) ).to.be.null;

				view.checkboxInputView.element.value = 'foo';
				expect( view.checkboxInputView.element.getAttribute( 'value' ) ).to.equal( 'foo' );
			} );

			it( 'disabled reacts on view#isEnabled', () => {
				expect( view.checkboxInputView.element.getAttribute( 'disabled' ) ).to.be.null;

				view.isEnabled = false;
				expect( view.checkboxInputView.element.getAttribute( 'disabled' ) ).to.equal( 'true' );

				view.isEnabled = true;
				expect( view.checkboxInputView.element.getAttribute( 'disabled' ) ).to.be.null;
			} );

			it( 'aria-disabled reacts on view#isEnabled', () => {
				expect( view.checkboxInputView.element.getAttribute( 'aria-disabled' ) ).to.be.null;

				view.isEnabled = false;
				expect( view.checkboxInputView.element.getAttribute( 'aria-disabled' ) ).to.equal( 'true' );

				view.isEnabled = true;
				expect( view.checkboxInputView.element.getAttribute( 'aria-disabled' ) ).to.be.null;
			} );
		} );
	} );

	describe( '_createLabelView', () => {
		describe( 'for attribute', () => {
			it( 'for is not set initially', () => {
				expect( view.labelView.element.getAttribute( 'for' ) ).to.be.null;
			} );

			it( 'reacts on view#id', () => {
				view.id = 'foo';
				expect( view.labelView.element.getAttribute( 'for' ) ).to.equal( 'foo' );

				view.id = null;
				expect( view.labelView.element.getAttribute( 'for' ) ).to.be.null;
			} );
		} );

		describe( 'text content', () => {
			it( 'children array is undefined by default', () => {
				expect( view.labelView.children ).to.be.undefined;
			} );

			it( 'reacts on view#label', () => {
				view.label = 'foo';
				expect( view.labelView.template.children[ 0 ].text[ 0 ].observable.label ).to.equal( 'foo' );

				view.label = '';
				expect( view.labelView.children ).to.be.undefined;
			} );
		} );
	} );

	describe( 'focus()', () => {
		it( 'focuses the checkbox in DOM', () => {
			const spy = sinon.spy( view.element, 'focus' );

			view.focus();

			sinon.assert.calledOnce( spy );
		} );
	} );
} );
