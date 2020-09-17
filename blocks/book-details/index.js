/**
 *  BLOCK: Newsletter
 *  ---
 *  Create the newsletter blocks.
 */

// Used to make item ids
import shortid from 'shortid'

//  Import CSS.
import './editor.css'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls, MediaUpload, MediaUploadCheck, RichText } = wp.blockEditor
const { Button, PanelBody, PanelRow, ToggleControl } = wp.components
const { Component } = wp.element

registerBlockType('krystalm-quill/book-details', {
  title: __( 'Series Information' ), // Block Title in UI
  icon: 'format-aside',
  category: 'common',
  keywords: [
    __( 'book' ),
    __( 'details' ),
  ],

  // Enable or disable support for low-level features
  supports: {
    html: false,
    reusable: false,
    align: false
  },

  // Set up data model for custom block
  attributes: {
    image: {
      type: 'object',
      selector: 'js-book-details-image'
    },
    title: {
      type: 'string',
      selector: 'js-book-details-title'
    },
    summary: {
      type: 'string',
      selector: 'js-book-details-summary',
      multiline: 'p'
    }
  },

  // The UI for the WordPress editor
  edit: class BookDetails extends Component {
    constructor() {
      super(...arguments)
    }

    render() {
      // Pull out the props we'll use
      const { attributes, className, setAttributes } = this.props

      // Pull out specific attributes for clarity below
      const { haveRead, image } = attributes

      return (
        <div className={className}>

          {/* Sidebar Controls */}
          {/* <InspectorControls>
            <PanelBody title={__('Book Status')}>
              <PanelRow>
                <ToggleControl
                  className="js-book-details-read"
                  label="Read"
                  checked={haveRead}
                  help={haveRead ? "This book has been read." : "Currently unread."}
                  onChange={checked => setAttributes({ haveRead: checked })}
                />
              </PanelRow>
            </PanelBody>
          </InspectorControls> */}

          <RichText
            className="series-title"
            value={attributes.title}
            onChange={value => setAttributes({ title: value })}
            tagName="h2"
            placeholder="Series Title"
          />

          {/* <MediaUploadCheck>
            <MediaUpload
              className="section-image"
              allowedTypes={['image']}
              multiple={false}
              value={image ? image.id : ''}
              onSelect={image => setAttributes({ image: image })}
              render={({ open }) => (
                image ?
                  <div>
                    <p>
                      <img src={image.url} width={image.width / 2} />
                    </p>

                    <p>
                      <Button onClick={() => setAttributes({ image: '' })} className="button is-small">Remove</Button>
                    </p>
                  </div> :
                  <button onClick={open} className="button">Upload Image</button>
              )}
            />
          </MediaUploadCheck> */}

          <RichText
            className="series-text"
            value={attributes.text}
            onChange={value => setAttributes({ text: value })}
            tagName="span"
            placeholder="Series Description"
          />

          {/* <RichText
            className="js-book-details-summary wp-admin-book-details-summary"
            value={attributes.summary}
            onChange={value => setAttributes({ summary: value })}
            tagName="div"
            placeholder="Book summary"
            multiline="p"
          /> */}
        </div>
      )
    }
  },

  // No save, dynamic block
  save: props => {
    return null
  }
})
