import React from "react";
import "./ArtistCard.css";
import { Link } from "react-router-dom";
import { Artist } from "spotify-types";
type Props = {
  artist: Artist;
};
function ArtistCard({ artist }: Props): JSX.Element {
  const img = artist.images.length ? artist.images[0].url : null;
  const name: string = artist.name;
  return (
    <Link to={`/detail/${artist.id}`}>
      <div className="artistCardContainer">
        <div className="imgContainer">
          {img ? <img src={img} alt="" /> : <img alt="No img" />}
        </div>
        <div className="nameContainer">
          <h1>{name}</h1>
        </div>
      </div>
    </Link>
  );
}

export default ArtistCard;
