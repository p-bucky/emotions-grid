const Reader = require("@maxmind/geoip2-node").Reader;

const getCountryAndCity = async (ip) => {
  let country = null;
  let city = null;

  const readerCountry = await Reader.open("server/GeoLite2-Country.mmdb", {});
  const readerCity = await Reader.open("server/GeoLite2-City.mmdb", {});

  country = readerCountry.country(ip).country.isoCode;
  city = readerCity.city(ip).city.names.en

  return {
    country,
    city,
  };
};

module.exports = {
  getCountryAndCity,
};
