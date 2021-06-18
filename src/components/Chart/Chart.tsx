import React, { useState, useEffect } from 'react';

// polyfill URLSearchparams - https://www.npmjs.com/package/url-search-params-polyfill
import 'url-search-params-polyfill';

import { Link, useLocation } from "react-router-dom";

import ChartItem from './ChartItem';

function Chart() {

  const [chartType, setChartType] = useState('');
  const [author, setAuthor] = useState('');
  const [montage, setMontage] = useState('');
  const [cosigns, setCosigns] = useState(0);
  const [cosigned, setCosigned] = useState(false);
  const [items, setItems] = useState([]);
  const [heroImage, setHeroImage] = useState('');
  const [loading, setLoading] = useState(true);

  let params = new URLSearchParams(useLocation().search)

  let chart = params.get("c") || '';

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/chart/${chart}`)
      .then(response => response.json())
      .then((data) => {
        const chart = data.data[0];
        const ids = chart.items;
        setCosigns(chart.cosigns || 0);
        setChartType(chart.type);
        setAuthor(chart.author);
				setMontage(chart.montage);
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/${chart.type}?ids=${ids}`)
          .then(response => response.json())
          .then((data) => {
            setItems(data);
            setHeroImage(data[0].images[0].url)
            setLoading(false);
          })
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chart])

  const itemsList = items.length && items.map((item: any, i) => {
    return (
      <ChartItem
        key={item.id}
        name={item.name}
        artist={item.artists && item.artists[0].name}
        link={item.external_urls.spotify}
        order={i + 1}
        imageUrl={item.images[0].url} />
    )
  })

  if (loading) {
    return (
      <div className="ChartSpinner">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  function handleCosign() {
    if (cosigned) {
      const newVal = cosigns - 1;
      setCosigns(newVal);
      setCosigned(false)
      fetch(`${process.env.REACT_APP_API_URL}/chart/${chart}`, {
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
      setCosigns(newVal);
      setCosigned(true)
      fetch(`${process.env.REACT_APP_API_URL}/chart/${chart}`, {
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
    <section className="escape-header Chart">
      <div className="Chart__bg" style={{backgroundImage: `url(${heroImage})`}}></div>
      <div className="container flex flex--column flex--guts Chart__body">
        <header className="Chart__header">
          <div className="Chart__titles">
            {chartType === 'albums'
              ? <h1 className="Chart__title title" data-testid="title">Top 5 Albums Of All Time</h1>
              : <h1 className="Chart__title title" data-testid="title">Top 5 Rappers Of All Time</h1>
            }
            { author.length > 0 &&
              <h2 className="Chart__author">By <span>{author}</span></h2>
            }
          </div>
          <button
            className={`btn btn--cosign Cosigns ${cosigned ? 'Cosigns--signed' : ''}`}
            onClick={handleCosign}>
            <span>{cosigns}</span>
            Co-Sign{cosigns > 1 && <i>s</i>}
            <div className="Cosigns__actions">
              <i className="fa fa-signature Cosigns__sig"></i>
              <i className="fa fa-plus Cosigns__plus"></i>
              <i className="fa fa-minus Cosigns__minus"></i>
            </div>
          </button>
        </header>
        {itemsList && itemsList.length > 0
          ? (
            <div className="ChartItems ChartItems--single">
              {itemsList}
            </div>
          )
          : <h1 className="Chart__empty">No items&hellip; weird.</h1>
        }
        <ul className="Chart__social">
          <li>
            <a href={montage} className="btn btn--share btn--download">
              <i className="fa fa-download"></i>
              Save as image
            </a>
          </li>
        </ul>
        <footer className="Chart__footer">
          <Link to={`/chart?c=${parseInt(chart) - 1}`}
            className="btn btn--secondary btn--floating">
            <i className="fa fa-chevron-left m-r-1"></i>
            Previous
          </Link>
          <Link to={`/chart?c=${parseInt(chart) + 1}`}
            className="btn btn--secondary btn--floating">
            Next
            <i className="fa fa-chevron-right m-l-1"></i>
          </Link>
        </footer>
      </div>
    </section>
  );
}

export default Chart;
