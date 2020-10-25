import React from 'react';
import Dialog from './common/Dialog';
import './TagEditDialog.css';

class TagEditDialog extends Dialog {
  constructor () {
    super();
    this.state.title = "Edit Tag";
    this.state.buttons = Dialog.BUTTON_SAVE | Dialog.BUTTON_CANCEL;
  }

  renderContent() {
    return (
        <div className="content">
          <form>
            <label>
              Tag Name to Add:
              <input></input>
            </label>
          </form>
        </div>
    );
  }

}

export default TagEditDialog;
