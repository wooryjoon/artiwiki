import React, { useEffect, useState } from "react";
import "./ArtistDetailPage.css";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useAppSelector } from "../../store/hooks";
import { Artist } from "spotify-types";
// type Props = {};

export default function ArtistDetailPage() {
  const { id } = useParams();
  const token = useAppSelector((state) => state.token.name);
  const [artistData, setArtistData] = useState({});
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
      } catch (e) {
        console.log(e);
      }
    }
    getArtist();
  }, []);
  return <div></div>;
}
