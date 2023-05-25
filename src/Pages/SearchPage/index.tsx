import "./SearchPage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios, { AxiosResponse } from "axios";
import { SearchContent, Artist } from "spotify-types";
// type Props = {};
import ArtistCard from "../../Components/Common/ArtistCard/ArtistCard";
import { tokenActions } from "../../store/tokenSlice";

export default function SearchPage(): JSX.Element {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const LOGIN_API_LINK = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

  const token = useAppSelector((state) => state.token.name); // redux에서 tokenName 추출
  const dispatch = useAppDispatch();
  const [searchKey, setSearchKey] = useState<string>("");
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    // 페이지 랜딩 시 token이 유효한지 살펴보는 작업
    if (token) return;
    const hash = window.location.hash; // 주소에 붙어있는 anchor값 반환
    if (hash) {
      let currToken = hash.split("=")[1].split("&")[0];
      dispatch(tokenActions.addToken({ name: currToken }));
      window.location.hash = "";
    }
  }, []);

  if (!token)
    return (
      <div className="searchPage_content_notLogin">
        <h1>
          You have to Login by your{" "}
          <span style={{ color: "rgb(0, 255, 0)" }}>SPOTIFY</span> Account
        </h1>
        <a href={LOGIN_API_LINK}>
          Click Here to Login <span>!</span>
        </a>
      </div>
    );

  return (
    <div className="searchPage_container">
      <div className="searchPage_content_login">
        <h1>Find Your Favorite Artist</h1>
        <form onSubmit={searchArtists}>
          <div className="inputContainer">
            <input type="text" onChange={searchKeyHandler} />
            <button type="submit">Search</button>
          </div>
        </form>
        <div className="artistCardsList">
          {isLoading && <div>isLoading</div>}
          {artistData.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
      </div>
    </div>
  );

  function searchKeyHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchKey(e.target.value);
  }

  async function searchArtists(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data }: AxiosResponse<SearchContent> = await axios.get(
        "https://api.spotify.com/v1/search",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchKey,
            type: "artist",
            limit: "10",
          },
        }
      );
      if (data.artists) {
        setArtistData(data.artists.items);
      }
    } catch (e) {
      setArtistData([]);
      alert("error");
    } finally {
      setIsLoading(false);
    }
  }
}
