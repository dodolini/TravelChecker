import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Dodajemy import modułu axios
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

interface GeoProperties {
  name: string; 
}

interface GeoObject {
  type: string;
  properties: GeoProperties;
}

const WorldMap: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [countriesToVisit, setCountriesToVisit] = useState<string[]>([]);

  useEffect(() => {
    const fetchVisitedCountries = async () => {
      try {
        const cookies = document.cookie;
  
        if (cookies) {
          const tokenCookie = cookies.split('; ').find(row => row.startsWith('token='));
  
          if (tokenCookie) {
            const token = tokenCookie.split('=')[1];
    
            const response = await axios.get('/userCountries', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            setVisitedCountries(response.data.visitedCountries);
            setCountriesToVisit(response.data.countriesToVisit);
          }
        }
      } catch (error) {
        console.error('Error fetching visited countries:', error);
      }
    };
  
    fetchVisitedCountries();
  }, []);

  const handleMouseEnter = (geography: GeoObject) => {
    setSelectedCountry(geography.properties.name);
  };

  const handleMouseLeave = () => {
    setSelectedCountry(null);
    setSearchTerm('')
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleHover = (geography: GeoObject) => {
    setSearchTerm(geography.properties.name); 
  };

  const handleCountryClick = (countryName: string) => {
    const cookies = document.cookie;

    if (cookies) {
      const cookieArray = cookies.split('; ');
  
      const tokenCookie = cookieArray.find(row => row.startsWith('token='));
  
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
  
        axios.post(
          '/visitedCountry',
          { country: countryName },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          console.log('Visited country added successfully:', response.data);
          setVisitedCountries(response.data.user.visitedCountries)
        })
        .catch(error => {
          console.error('Error adding visited country:', error);
        });
      } else {
        console.error('Token cookie not found'); 
      }
    } else {
      console.error('No cookies found'); 
    }
  };

  const handleCountryRightClick = (event: React.MouseEvent<SVGPathElement, MouseEvent>, countryName: string) => {
    event.preventDefault(); 

    const cookies = document.cookie;

    if (cookies) {
      const cookieArray = cookies.split('; ');
  
      const tokenCookie = cookieArray.find(row => row.startsWith('token='));
  
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
  
        axios.post(
          '/countriesToVisit',
          { country: countryName },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          console.log('Country added to visit list successfully:', response.data);
          setCountriesToVisit(response.data.user.countriesToVisit)
        })
        .catch(error => {
          console.error('Error adding country to visit list:', error);
        });
      } else {
        console.error('Token cookie not found'); 
      }
    } else {
      console.error('No cookies found'); 
    }
  };

  return (
    <div className='wordMap'>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className='searchBar'
      />
      <ComposableMap projection="geoMercator" width={800} height={400}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => handleMouseEnter(geo)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={() => handleHover(geo)}
                onClick={() => handleCountryClick(geo.properties.name)} 
                onContextMenu={(event) => handleCountryRightClick(event, geo.properties.name)} 
                style={{
                  default: {
                    fill: selectedCountry === geo.properties.name || searchTerm === geo.properties.name ? '#F00' : visitedCountries.includes(geo.properties.name) ? '#0F0' : countriesToVisit.includes(geo.properties.name) ? '#00F' : '#D6D6DA',
                    stroke: '#000', 
                    strokeWidth: 0.5, 
                    outline: 'none',
                  },
                  hover: {
                    fill: '#F53',
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#E42',
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <button className='infoButton'><i className="fa-solid fa-circle-info"></i></button>
    </div>
  );
};

export default WorldMap;
  