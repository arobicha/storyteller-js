import React, { Component } from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

/*
class StoryRenderer extends Component {
  static propTypes = {
    raw: PropTypes.object
  }

  renderWarning() {
    return <div>Nothing to render.</div>;
  }

  render() {
    const { raw } = this.props;
    if (!raw) {
      return this.renderWarning();
    }
    const rendered = redraft(raw, renderers);
    // redraft returns a null if there's nothing to render
    if (!rendered) {
      return this.renderWarning();
    }
    return (
      <div>
        {rendered}
      </div>
    );
  }
}
*/

class EditorBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className='level'>
        <div className='level-left'>
          <div className='level-item'><a className="button"><span className="icon is-small"><i className="fa fa-bold"></i></span></a></div>
          <div className='level-item'><a className="button"><span className="icon is-small"><i className="fa fa-italic"></i></span></a></div>
          <div className='level-item'><a className="button"><span className="icon is-small"><i className="fa fa-underline"></i></span></a></div>
          <div className='level-item'><a className="button"><span className="icon is-small"><i className="fa fa-comment"></i></span></a></div>
        </div>
      </nav>
    );
  }
}

class ActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.editorState = props.editorState;
    this.onSubmitClick = this.submitClick.bind(this);
  }
  submitClick() {
    console.log(convertToRaw(this.editorState.getCurrentContent()));
    document.getElementById('preview').innerHtml = this.editorState.getCurrentContent();
  }
  render() {
    return (
      <nav className='level'>
        <div className='level-left'></div>
        <div className='level-right'>
          <p className='level-item'><a className='button is-danger is-outlined'>Clear</a></p>
          <p className='level-item'><a className='button is-success is-outlined' onClick={this.onSubmitClick} >Submit</a></p>
        </div>
      </nav>
    );
  }
}

class StoryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logState = () => console.log(this.state.editorState.toJS());
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState)
    {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  render() {
    return (

      <div className='section'>
        <div className='container'>
          <EditorBar />
          <div style={styles.root}>
            <div style={styles.editor} onClick={this.focus}>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                placeholder="Enter some text..."
                ref="editor"
              />
            </div>
          </div>
          <ActionBar editorState={this.state.editorState} />
        </div>
      </div>
    );
  }
}

const styles = {
    root: {
      fontFamily: '\'Helvetica\', sans-serif',
      width: '100%',
      padding: 10,
    },
    editor: {
      border: '1px solid #ccc',
      cursor: 'text',
      minHeight: 80,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
  };

export default StoryEditor;
