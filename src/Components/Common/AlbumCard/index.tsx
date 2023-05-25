import React from "react";
import "./AlbumCard.css";
import { Album } from "spotify-types";
type Props = {
  album: Album;
};
export default function AlbumCard({ album }: Props) {
  return (
    <div className="albumCardContainer">
      <a href={album.external_urls.spotify}>
        <div className="albumImgContainer">
          <img src={album.images[0].url} alt="" />
        </div>
        <div className="albumTitle">{album.name}</div>
      </a>
    </div>
  );
}
