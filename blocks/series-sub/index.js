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

registerBlockType('krystalm-quill/series-sub', {
  title: __( 'Quill - Series Sub-section' ), 
  icon: 'book',
  category: 'custom',
  keywords: [
    __( 'quill' ),
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
      const { attributes, className, setAttributes } = this.props
      const { image } = attributes

      return (
        <div className="series-block">

          {/* Sidebar Controls */}
          <InspectorControls>
            <PanelBody title={__('Book Display')}>
              <PanelRow>
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
              </PanelRow>
            </PanelBody>    
          </InspectorControls>          

          <RichText
            className="series-title"
            value={attributes.title}
            onChange={value => setAttributes({ title: value })}
            tagName="h3"
            placeholder="Subsection Title"
          />

          <RichText
            className="series-summary"
            value={attributes.summary}
            onChange={value => setAttributes({ summary: value })}
            tagName="div"
            placeholder="Book subsection summary"
            multiline="p"
          />       

          <RichText
            className="series-link"
            value={attributes.link}
            onChange={value => setAttributes({ link: value })}
            tagName="a"
            placeholder="Link to Series Page"
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
