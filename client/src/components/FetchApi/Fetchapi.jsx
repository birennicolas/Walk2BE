import { useState } from "react";
import "./fetchapi.css";
import Api from "../../Api.json";
import Map from "../Map/Map";
import { BsGeoAltFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import ReactMapGL, { Marker, Popup } from "react-map-gl";


function Fetchapi() {
  const [search, setSearch] = useState("");
  const [selectedWalk, setSelectedWalk] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 50.8386528,
    longitude: 4.4677877,
    width: "66vw",
    height: "130vh",
    zoom: 9,
  });


  return (
    <div className="body">
      <div className="posts">
        <input search here
          id="searchInput"
          type="text"
          placeholder="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />



        <div className="map">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/aureliensaelens/ckz6xl50x002214njfll9zyix"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          
          {Api.filter((walk) => {
            if (search === "") {
              return "";
            } else if (
              walk.fields.entite.toLowerCase().includes(search.toLowerCase())
            ) {
              return walk;
            }
          }).map((walk) => (
            <Marker
              onClick={(e) => {}}
              key={walk.fields.localite}
              latitude={walk.geometry.coordinates[1]}
              longitude={walk.geometry.coordinates[0]}
            >
              <button
                className="walk-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedWalk(walk);
                }}
              >
                <BsGeoAltFill className="icon" />
              </button>
            </Marker>
          ))}
  
          {selectedWalk ? (
            <Popup
              className="Popup"
              latitude={selectedWalk.geometry.coordinates[1]}
              longitude={selectedWalk.geometry.coordinates[0]}
              onClose={() => {
                setSelectedWalk(null);
              }}
            >
              <div className="info">
                <h2>{selectedWalk.fields.localite}</h2>
                <p>{selectedWalk.fields.entite}</p>
                <h4>Plus de renseignements :</h4>
                <li>
                  Le lieu de rendez-vous se trouve :{" "}
                  <b>{selectedWalk.fields.lieu_de_rendez_vous}</b>
                </li>
                <li>
                  Activité : <b>{selectedWalk.fields.activite}</b>
                </li>
                <li>
                  Velo : <b>{selectedWalk.fields.velo}</b>
                </li>
                <li>
                  Balade guidée : <b>{selectedWalk.fields.balade_guidee}</b>
                </li>
                <li>
                  Orientation : <b>{selectedWalk.fields.orientation}</b>
                </li>
                <li>
                  Parcours de plus de 10 km : <b>{selectedWalk.fields.taille}</b>
                </li>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>


        {Api.filter((api) => {
          if (search === "") {
            return api.fields.entite[0];
          } else if (
            api.fields.entite.toLowerCase().includes(search.toLowerCase())
          ) {
            return api;
          }
        }).map((api) => {
          <button
            onClick={(e) => {}}
            key={api.fields.localite}
            latitude={api.geometry.coordinates[1]}
            longitude={api.geometry.coordinates[0]}
          ></button>;

          return (
            <>
              <div className="card">
                <div class="container">
                  <h2>{api.fields.entite}</h2>
                  <p>{api.fields.localite}</p>
                  <p>{api.fields.longitude}</p>
                  <p>{api.fields.latitude}</p>
                  <button className="walk-btn">
                    <BsGeoAltFill className="icon" />
                  </button>
                  <button className="walk-btn">
                    <FcLike className="iconLike" />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Fetchapi;
