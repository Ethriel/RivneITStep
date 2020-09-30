import React from 'react';
import LabelAndText from '../../common/label-and-text/label-and-text';
import './film-item';
import uuid from 'react-uuid';

const FilmItem = ({ film }, ...props) => {
    const { title, opening_crawl, director, producer, release_date, img } = film;
    return (
        <div className="col-lg-4 col-md-3 col-sm-6" key={uuid()}>
            <div className="card">
                <div className="card-img-top">
                    <img className="card-img-my" src={img} alt={title} />
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <p className="card-title">{title}</p>
                        <p className="card-title">{opening_crawl}</p>
                        <LabelAndText label="Director" text={director} />
                        <LabelAndText label="Producer" text={producer} />
                        <LabelAndText label="Release date" text={release_date} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FilmItem;