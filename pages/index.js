import React, { useState } from 'react';
import Papa from 'papaparse';
import FileUpload from '../components/FileUpload';
import SiteList from '../components/SiteList';

const Index = () => {
  const [sites, setSites] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: handleData
    });
  };

  const handleData = (results) => {
    const sitesData = results.data;

    const sitesWithContract1 = sitesData.filter(site => site.CONTRATO === '1');
    const sitesWithContract2 = sitesData.filter(site => site.CONTRATO === '2');

    const selectedSites = [];

    sitesWithContract2.forEach(site2 => {
      let minDistance = Number.MAX_VALUE;
      sitesWithContract1.forEach(site1 => {
        const lat1 = parseFloat(site1.LATITUD);
        const lon1 = parseFloat(site1.LONGITUD);
        const lat2 = parseFloat(site2.LATITUD);
        const lon2 = parseFloat(site2.LONGITUD);

        const R = 6371; // Radio de la Tierra en km
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < minDistance) {
          minDistance = distance;
        }
      });

      selectedSites.push({ ...site2, DISTANCIA_MIN: minDistance });
    });

    selectedSites.sort((a, b) => a.DISTANCIA_MIN - b.DISTANCIA_MIN);
    setSites(selectedSites.slice(0, 1200));
  };

  return (
    <div>
      <h1>Aplicación de selección de sitios</h1>
      <FileUpload handleFileChange={handleFileChange} />
      <SiteList sites={sites} />
    </div>
  );
};

export default Index;