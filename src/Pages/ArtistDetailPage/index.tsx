import React, { useEffect, useState } from "react";
import "./ArtistDetailPage.css";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useAppSelector } from "../../store/hooks";
import { Artist, Album } from "spotify-types";
import AlbumCard from "../../Components/Common/AlbumCard";
// type Props = {};
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function ArtistDetailPage() {
  const { id } = useParams();
  const token = useAppSelector((state) => state.token.name);
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [artistAlbum, setArtistAlbum] = useState<Album[]>([]);
  useEffect(() => {
    // 페이지 마운트 시 url파라미터로 id를 받고,
    // id를 통해 spotify api에서 getArtist 작업 수행
    // 받은 데이터를 페이지에 뿌려준다
    async function getArtist() {
      try {
        const { data }: AxiosResponse<Artist> = await axios.get(
          `https://api.spotify.com/v1/artists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setArtistData(data);
      } catch (e) {
        console.log(e);
      }
    }
    async function getArtistAlbum() {
      try {
        const { data } = await axios.get(
          `
https://api.spotify.com/v1/artists/${id}/albums`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              type: "album",
            },
          }
        );
        console.log(data.items);
        setArtistAlbum(data.items);
      } catch (e) {
        console.log(e);
      }
    }
    getArtist();
    getArtistAlbum();
  }, []);

  if (!artistData || !artistAlbum) return <div></div>;
  return (
    <div className="detailContainer">
      <div className="detailImgContainer">
        {artistData.images.length && (
          <img src={artistData.images[0].url} alt=""></img>
        )}
      </div>
      <ul className="detailInfoContainer">
        <li className="detailInfo">
          <span className="detailInfoTitle">Name</span>
          <span style={{ fontSize: "35px" }}>{artistData.name}</span>
        </li>
        <li className="detailInfo">
          <span className="detailInfoTitle">Genres</span>
          <span>
            {artistData.genres.map((e) => (
              <div>{e}</div>
            ))}
          </span>
        </li>
        <li className="detailInfo">
          <span className="detailInfoTitle">Followers</span>
          <span>{artistData.followers.total}</span>
        </li>
        <li className="detailInfo">
          <span className="detailInfoTitle">Albums</span>
          <div className="albumListContainer">
            <Swiper
              style={{
                height: "150px",
              }}
              spaceBetween={5}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {artistAlbum.map((album) => {
                return (
                  <SwiperSlide>
                    <AlbumCard key={album.id} album={album} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </li>
      </ul>
    </div>
  );
}
