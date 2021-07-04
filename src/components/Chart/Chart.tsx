import React, { useState, useEffect } from 'react';

// polyfill URLSearchparams - https://www.npmjs.com/package/url-search-params-polyfill
import 'url-search-params-polyfill';

import { Link, useLocation } from "react-router-dom";

import Spinner from '../Spinner/Spinner';

import ChartItem from './ChartItem';
import ChartActions from './ChartActions';

function Chart() {

  const [chartType, setChartType] = useState('');
  const [author, setAuthor] = useState('');
  const [montage, setMontage] = useState('');
  const [cosigns, setCosigns] = useState(0);
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
    return <Spinner />
  } else {
    return (
      <section className="escape-header">
        {window.innerWidth > 768 && (
            <div className="Chart__bg" style={{backgroundImage: `url(${heroImage})`}}></div>
          )
        }
        <div className="page-container">
          <div className="container Chart__body">
            <header className="Chart__header">
              <div className="Chart__titles">
                { author.length > 0 &&
                  <h1 className="title title--large flat"><span>{author}</span></h1>
                }
                {chartType === 'albums'
                  ? <h2 className="Chart__title title" data-testid="title">Top 5 Albums Of All Time</h2>
                  : <h2 className="Chart__title title" data-testid="title">Top 5 Rappers Of All Time</h2>
                }
              </div>
              <div className="hide-mobile">
                <ChartActions chart={chart} cosigns={cosigns} downloadLink={montage} />
              </div>
            </header>
            {itemsList && itemsList.length > 0
              ? (
                <div className="ChartItems ChartItems--single">
                  {itemsList}
                </div>
              )
              : <h1 className="Chart__empty">No items&hellip; weird.</h1>
            }
            <div className="hide-desktop">
              <ChartActions chart={chart} cosigns={cosigns} downloadLink={montage} />
            </div>
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
        </div>
      </section>
    );
  }
}

export default Chart;
