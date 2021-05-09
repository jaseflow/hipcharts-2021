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

  return (
    <div
      className={
        `ChartBuilderModal ${open ? 'ChartBuilderModal--open' : ''}`
      }>
        <div className="ChartBuilderModal__content">
          <i className="fa fa-remove ChartBuilderModal__close" onClick={onClose}></i>
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
              <button className="btn btn--text" style={{marginLeft: '1rem'}}>Publish private</button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default ChartBuilderModal;
