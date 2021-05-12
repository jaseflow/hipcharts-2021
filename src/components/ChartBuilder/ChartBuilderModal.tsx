import React, { useState } from 'react';

interface ChartBuilderModalProps {
  open: boolean;
  onClose?: any;
  onPublish?: any;
}

function ChartBuilderModal({ open, onClose, onPublish } : ChartBuilderModalProps) {

  const [author, setAuthor] = useState('')

  function handlePublish(e: any) {
    e.preventDefault();
    onPublish(author);
  }

  function handleClose(e: any) {
    e.preventDefault();
    onClose();
  }

  return (
    <div
      className={
        `ChartBuilderModal ${open ? 'ChartBuilderModal--open' : ''}`
      }>
        <div className="ChartBuilderModal__content">
          <form onSubmit={handlePublish}>
            <label htmlFor="author">Add your name</label>
            <small>This will be displayed as the author of the chart</small>
            <input
              type="text"
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              autoFocus
              placeholder="Enter name"
              className="input"
            />
            <div className="flex flex--aligned flex--spaced m-t-1">
              <button className="btn flex__full" disabled={author.length <= 0}>Publish</button>
              <button className="btn btn--text" onClick={handleClose} style={{marginLeft: '1rem'}}>Back</button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default ChartBuilderModal;
