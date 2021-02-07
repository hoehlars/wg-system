import React from "react";
import "./InformationsCard.css";

class InformationsCard extends React.Component<{}, {}> {
  render() {
    return (
      <div>

        <h3>Allgemeine Informationen</h3>

        <div className="sector">
          <h4>Vermieter</h4>

          <p>Name: Andreas Knutti </p>

          <p>E-Mail: andreas_knutti@bluewin.ch</p>

          <p>Telefon: 052 335 35 90</p>
        </div>

        <div className="sector">
          <h4>Hausratsversicherung</h4>

          <p>Alle von uns brauchen eine Privathaftpflichtversicherung getrennt von den Eltern, sodass alle Möbel, etc. versichert sind.</p>
          <p>Berater: Thomas Jenny</p>

          <p>E-Mail: thommas.jenny@mobiliar.ch</p>

          <p>Telefon: 044 934 31 43</p>

          <p>Mobile: 079 179 60 93</p>
        

          <p>Bemerkungen:</p>

          <p>Wir haben keine externe Diebstahlversicherung. Alles ausserhalb der Wohnung ist deshalb nicht versichert, falls es gestohlen wird.
            Dafür haben wir eine Versicherung für Elektronikgeräte ab Schäden von 100.- CHF. D.h., falls ein Bildschirm kaputt geht oder ähnliches, der Versicherung melden.</p>
        
        </div>


        <div className="sector">
          <h4>Internet</h4>

          <p>SSID: A-LAN Berset</p>

          <p>Passwort: RaspberryPi1</p>
        </div>
      </div>
    );
  }
}

export default InformationsCard;
