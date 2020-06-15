import Border from "./Border";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import ArtistList from "./ArtistList";
import fetch from "isomorphic-unfetch";
import jwt_decode from "jwt-decode";

export default function GetTopArtists({ GetTopArtists }) {
  // console.log("hh", GetTopArtists);

  const [addedArtistsList, setAddedArtistsList] = useState("");
  const [email, setEmail] = useState("");
  const [watch, setWatch] = useState("");

  // *pulls data from spotify api using users client secret to mysql database*
  // *stored in addedArtistsList* - runs each page load*
  useEffect(() => {
    try {
      const token = localStorage.getItem("usertoken");
      const decoded = jwt_decode(token);
      setEmail(decoded.email);
      console.log("email", email);
    } catch (error) {
      console.log(error);
    }
  }, [0]);

  async function refreshDatabase() {
    fetch(`http://localhost:3000/api/spotify/addtopartists`, {
      method: "POST",
      headers: {
        spotifyToken: localStorage.spotifyAccessToken,
        userEmail: email,
      },
    });
    setWatch("1");
    setTimeout(function () {
      Router.replace("/profile/choosedata");
    }, 3000);
  }

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: "#EF7B73",
        borderTopWidth: 0,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 sm-6">
            <h1
              style={{
                textAlign: "center",
                textDecoration: "underline",
                fontWeight: 600,
                fontStyle: "italic",
                paddingTop: 10,
              }}
            >
              Your Top Artists
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {addedArtistsList && (
              <h2 style={{ textAlign: "center", paddingTop: 30 }}>
                Favorite artists added to your profile:
              </h2>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {addedArtistsList || watch ? (
              <h3
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  fontWeight: 600,
                  fontStyle: "bold",
                  fontSize: 25,
                }}
              >
                Here are your top artists pulled from Spotify. Click to add to
                an artist to your profile:
              </h3>
            ) : (
              <a
                className="navbar-brand"
                onClick={refreshDatabase}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Border
                  border={{
                    title: "click to populate database",
                    width: "60va",
                    fontSize: "25px",
                    borderSize: "3px",
                  }}
                />
              </a>
            )}
            <ArtistList ArtistList={GetTopArtists} />
          </div>
        </div>
      </div>
    </div>
  );
}
