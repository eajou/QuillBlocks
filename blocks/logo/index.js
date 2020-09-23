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

registerBlockType('krystalm-quill/logo', {
  title: __( 'Quill - Logo' ), 
  icon: 'book',
  category: 'custom',
  keywords: [
    __( 'quill' ),
    __( 'logo' ),
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
  },
  // The UI for the WordPress editor
  edit: class BookDetails extends Component {
    constructor() {
      super(...arguments)
    }

    render() {
      const { attributes, className, setAttributes } = this.props
      const { image } = attributes

      return (
        <div className="logo-block">

          <MediaUploadCheck>
            <MediaUpload
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
        </div>
      )
    }
  },

  // No save, dynamic block
  save: props => {
    return null
  }
})
