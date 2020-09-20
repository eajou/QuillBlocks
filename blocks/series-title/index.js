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
const { registerBlockType, InnerBlocks } = wp.blocks
const { InspectorControls, MediaUpload, MediaUploadCheck, RichText } = wp.blockEditor
const { Button, PanelBody, PanelRow, ToggleControl } = wp.components
const { Component } = wp.element

registerBlockType('krystalm-quill/series-title', {
  title: __( 'Quill - Series Title' ), 
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
    id: {
      type: 'string',
      selector: 'series-id'
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
        <div className="series-block">

          <RichText
            className="series-title"
            value={attributes.title}
            onChange={value => setAttributes({ title: value })}
            tagName="h2"
            placeholder="Series Title"
          />  

          <RichText
            className="series-summary"
            value={attributes.summary}
            onChange={value => setAttributes({ summary: value })}
            tagName="div"
            placeholder="Book summary"
            multiline="p"
          />          
        </div>
      )
    }
  },

  // No save, dynamic block
  // save: props => {
  //   return null
  // }

  save() {
    return (
     <div>
      <InnerBlocks.Content />
     </div>
    );
  }  
})
