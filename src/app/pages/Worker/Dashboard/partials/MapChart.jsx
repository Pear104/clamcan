import React, { useState, useEffect, memo, useMemo } from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { geoUrl } from "./GeoUrl";

// Import or define a map between country names and ISO3 codes
const countryNameToISO3 = {
  Afghanistan: "AFG",
  Albania: "ALB",
  Algeria: "DZA",
  Andorra: "AND",
  Angola: "AGO",
  "Antigua and Barbuda": "ATG",
  Argentina: "ARG",
  Armenia: "ARM",
  Australia: "AUS",
  Austria: "AUT",
  Azerbaijan: "AZE",
  Bahamas: "BHS",
  Bahrain: "BHR",
  Bangladesh: "BGD",
  Barbados: "BRB",
  Belarus: "BLR",
  Belgium: "BEL",
  Belize: "BLZ",
  Benin: "BEN",
  Bhutan: "BTN",
  Bolivia: "BOL",
  "Bosnia and Herzegovina": "BIH",
  Botswana: "BWA",
  Brazil: "BRA",
  Brunei: "BRN",
  Bulgaria: "BGR",
  "Burkina Faso": "BFA",
  Burundi: "BDI",
  Cambodia: "KHM",
  Cameroon: "CMR",
  Canada: "CAN",
  "Cape Verde": "CPV",
  "Central African Republic": "CAF",
  Chad: "TCD",
  Chile: "CHL",
  China: "CHN",
  Colombia: "COL",
  Comoros: "COM",
  Congo: "COG",
  "Costa Rica": "CRI",
  Croatia: "HRV",
  Cuba: "CUB",
  Cyprus: "CYP",
  "Czech Republic": "CZE",
  "Democratic Republic of the Congo": "COD",
  Denmark: "DNK",
  Djibouti: "DJI",
  Dominica: "DMA",
  "Dominican Republic": "DOM",
  "East Timor": "TLS",
  Ecuador: "ECU",
  Egypt: "EGY",
  "El Salvador": "SLV",
  "Equatorial Guinea": "GNQ",
  Eritrea: "ERI",
  Estonia: "EST",
  Ethiopia: "ETH",
  Fiji: "FJI",
  Finland: "FIN",
  France: "FRA",
  Gabon: "GAB",
  Gambia: "GMB",
  Georgia: "GEO",
  Germany: "DEU",
  Ghana: "GHA",
  Greece: "GRC",
  Grenada: "GRD",
  Guatemala: "GTM",
  Guinea: "GIN",
  "Guinea-Bissau": "GNB",
  Guyana: "GUY",
  Haiti: "HTI",
  Honduras: "HND",
  Hungary: "HUN",
  Iceland: "ISL",
  India: "IND",
  Indonesia: "IDN",
  Iran: "IRN",
  Iraq: "IRQ",
  Ireland: "IRL",
  Israel: "ISR",
  Italy: "ITA",
  "Ivory Coast": "CIV",
  Jamaica: "JAM",
  Japan: "JPN",
  Jordan: "JOR",
  Kazakhstan: "KAZ",
  Kenya: "KEN",
  Kiribati: "KIR",
  Korea: "KOR",
  Kuwait: "KWT",
  Kyrgyzstan: "KGZ",
  Laos: "LAO",
  Latvia: "LVA",
  Lebanon: "LBN",
  Lesotho: "LSO",
  Liberia: "LBR",
  Libya: "LBY",
  Liechtenstein: "LIE",
  Lithuania: "LTU",
  Luxembourg: "LUX",
  Macedonia: "MKD",
  Madagascar: "MDG",
  Malawi: "MWI",
  Malaysia: "MYS",
  Maldives: "MDV",
  Mali: "MLI",
  Malta: "MLT",
  "Marshall Islands": "MHL",
  Mauritania: "MRT",
  Mauritius: "MUS",
  Mexico: "MEX",
  Micronesia: "FSM",
  Moldova: "MDA",
  Monaco: "MCO",
  Mongolia: "MNG",
  Montenegro: "MNE",
  Morocco: "MAR",
  Mozambique: "MOZ",
  Myanmar: "MMR",
  Namibia: "NAM",
  Nauru: "NRU",
  Nepal: "NPL",
  Netherlands: "NLD",
  "New Zealand": "NZL",
  Nicaragua: "NIC",
  Niger: "NER",
  Nigeria: "NGA",
  Norway: "NOR",
  Oman: "OMN",
  Pakistan: "PAK",
  Palau: "PLW",
  Panama: "PAN",
  "Papua New Guinea": "PNG",
  Paraguay: "PRY",
  Peru: "PER",
  Philippines: "PHL",
  Poland: "POL",
  Portugal: "PRT",
  Qatar: "QAT",
  Romania: "ROU",
  Russia: "RUS",
  Rwanda: "RWA",
  "Saint Kitts and Nevis": "KNA",
  "Saint Lucia": "LCA",
  "Saint Vincent and the Grenadines": "VCT",
  Samoa: "WSM",
  "San Marino": "SMR",
  "Sao Tome and Principe": "STP",
  "Saudi Arabia": "SAU",
  Senegal: "SEN",
  Serbia: "SRB",
  Seychelles: "SYC",
  "Sierra Leone": "SLE",
  Singapore: "SGP",
  Slovakia: "SVK",
  Slovenia: "SVN",
  "Solomon Islands": "SLB",
  Somalia: "SOM",
  "South Africa": "ZAF",
  "South Sudan": "SSD",
  Spain: "ESP",
  "Sri Lanka": "LKA",
  Sudan: "SDN",
  Suriname: "SUR",
  Swaziland: "SWZ",
  Sweden: "SWE",
  Switzerland: "CHE",
  Syria: "SYR",
  Taiwan: "TWN",
  Tajikistan: "TJK",
  Tanzania: "TZA",
  Thailand: "THA",
  Togo: "TGO",
  Tonga: "TON",
  "Trinidad and Tobago": "TTO",
  Tunisia: "TUN",
  Turkey: "TUR",
  Turkmenistan: "TKM",
  Tuvalu: "TUV",
  Uganda: "UGA",
  Ukraine: "UKR",
  "United Arab Emirates": "ARE",
  "United Kingdom": "GBR",
  "United States": "USA",
  Uruguay: "URY",
  Uzbekistan: "UZB",
  Vanuatu: "VUT",
  "Vatican City": "VAT",
  Venezuela: "VEN",
  Vietnam: "VNM",
  Yemen: "YEM",
  Zambia: "ZMB",
  Zimbabwe: "ZWE",
};

const MemoizedGeographies = ({
  geography,
  countryData,
  colorScale,
  getCountryName,
}) => {
  const memoizedGeographies = useMemo(() => {
    return geography.map((geo) => {
      const isoCode = geo.id;
      const postCount = countryData[isoCode] || 0;
      const countryName = getCountryName(isoCode);

      const wikipediaLink = countryName
        ? `http://localhost:3000/worker/posts?country=${countryName.replace(
            / /g,
            "_"
          )}`
        : "#";

      return (
        <Popover
          key={geo.rsmKey}
          content={`${postCount} Campaign(s)`}
          title={countryName || "Unknown"}
        >
          <Link to={wikipediaLink}>
            <Geography
              geography={geo}
              fill={colorScale(postCount)}
              style={{
                default: { outline: "none" },
                hover: { fill: "#FFD700", outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          </Link>
        </Popover>
      );
    });
  }, [geography, countryData, colorScale, getCountryName]);

  return memoizedGeographies;
};

const MapChart = memo(({ postData }) => {
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const countryAggregation = {};
    postData.forEach(({ country }) => {
      const isoCode = countryNameToISO3[country];
      if (isoCode) {
        countryAggregation[isoCode] = (countryAggregation[isoCode] || 0) + 1;
      }
    });
    setCountryData(countryAggregation);
  }, [postData]);

  const maxPosts = Math.max(...Object.values(countryData), 1);
  const colorScale = scaleLinear()
    .domain([0, maxPosts])
    .range(["#ffd0c8", "#ff2700"]);

  const getCountryName = (isoCode) => {
    return Object.keys(countryNameToISO3).find(
      (key) => countryNameToISO3[key] === isoCode
    );
  };

  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center text-4xl font-bold w-full">
        ClamCan's partners around the world
      </div>
      <ComposableMap
        className="w-full h-full p-0"
        projectionConfig={{
          rotate: [-15, 0, 0],
          scale: 175,
        }}
      >
        {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} /> */}
        {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <MemoizedGeographies
              geography={geographies}
              countryData={countryData}
              colorScale={colorScale}
              getCountryName={getCountryName}
            />
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
});

export default MapChart;

{
  /* geographies.map((geo) => {
              const isoCode = geo.id;
              const postCount = countryData[isoCode] || 0;
              const countryName = getCountryName(isoCode);
              const wikipediaLink = countryName
                ? `http://localhost:3000/worker/posts?country=${countryName.replace(
                    / /g,
                    "_"
                  )}`
                : "#";

              return (
                <Popover
                  key={geo.rsmKey}
                  content={`${postCount} Campaign(s)`}
                  title={countryName || "Unknown"}
                >
                  <Link to={wikipediaLink}>
                    <Geography
                      geography={geo}
                      fill={colorScale(postCount)}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#FFD700", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  </Link>
                </Popover>
              );
            }) */
}
