/**
 *  BLOCK: Series
 *  ---
 *  Create the series blocks.
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
  title: __( 'Series Information' ), 
  icon: 'book',
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
      selector: 'series-image'
    },
    title: {
      type: 'string',
      selector: 'series-title'
    },
    summary: {
      type: 'string',
      selector: 'series-summary',
      multiline: 'p'
    },
    link: {
      type: 'string',
      selector: 'series-link'
    },  
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

          <RichText
            className="series-title"
            value={attributes.title}
            onChange={value => setAttributes({ title: value })}
            tagName="h2"
            placeholder="Series Title"
          />

          <MediaUploadCheck>
            <MediaUpload
              className="series-image"
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
                      <Button onClick={() => setAttributes({ image: '' })} className="button is-small">Remove Image</Button>
                    </p>
                  </div> :
                  <button onClick={open} className="button">
                    Upload Image
                  </button>
              )}
            />
          </MediaUploadCheck>

          <RichText
            className="js-book-details-summary wp-admin-book-details-summary"
            value={attributes.summary}
            onChange={value => setAttributes({ summary: value })}
            tagName="div"
            placeholder="Book summary"
            multiline="p"
          />

          <RichText
            className="series-link"
            value={attributes.link}
            onChange={value => setAttributes({ link: value })}
            tagName="a"
            placeholder="Series Link"
          />          
        </div>
      )
    }
  },

  // No save, dynamic block
  save: props => {
    return null
  }
})
