import React, { useState } from 'react';

import { FacebookShareButton, TwitterShareButton } from 'react-share';

interface ChartActionProps {
  downloadLink: string;
  cosigns: number;
  chart: string;
}

function ChartActions({ downloadLink, cosigns, chart } : ChartActionProps) {

  const [cosignsLive, setCosignsLive] = useState(cosigns);
  const [cosigned, setCosigned] = useState(false);

  function handleCosign() {
    if (cosigned) {
      const newVal = cosigns - 1;
      setCosignsLive(newVal);
      setCosigned(false)
      fetch(`${process.env.REACT_APP_API_URL}/user-charts/${chart}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"cosigns": newVal}),
      }).catch((err) => {
        console.log(err)
      })
    } else {
      const newVal = cosigns + 1;
      setCosignsLive(newVal);
      setCosigned(true)
      fetch(`${process.env.REACT_APP_API_URL}/user-charts/${chart}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"cosigns": newVal}),
      }).catch((err) => {
        console.log(err)
      })
    }
  }


  return (
    <nav className="ChartActions">
      <ul className="ChartActions__social">
        <li>
          <a href={downloadLink} className="btn btn--share btn--download">
            <i className="fa fa-download"></i>
            Save
          </a>
        </li>
        <li>
          <TwitterShareButton url={window.location.href} className="btn btn--share btn--twitter" resetButtonStyle={false}>
            <i className="fab fa-twitter"></i>
            Share
          </TwitterShareButton>
        </li>
        <li>
          <FacebookShareButton url={window.location.href} className="btn btn--share btn--facebook" resetButtonStyle={false}>
            <i className="fab fa-facebook"></i>
            Share
          </FacebookShareButton>
        </li>
      </ul>
      <button
        className={`btn btn--cosign Cosigns ${cosigned ? 'Cosigns--signed' : ''}`}
        onClick={handleCosign}>
        <span>{cosignsLive}</span>
        Co-Sign{(cosignsLive > 1 || cosignsLive === 0)  && <i>s</i>}
        <div className="Cosigns__actions">
          <i className="fa fa-signature Cosigns__sig"></i>
          <i className="fa fa-plus Cosigns__plus"></i>
          <i className="fa fa-minus Cosigns__minus"></i>
        </div>
      </button>
    </nav>
  );
}

export default ChartActions;
