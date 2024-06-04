import {useState, useEffect} from 'react';
import PropertyCard from './PropertyCard';
import '../CSS/PropertyDisplay.css';

export default function DisplayProperty() {
  
    const [apiData, setData] = useState([]);

    const fetchData = () => {fetch('http://localhost:8000/Properties')
    .then((response) => response.json())
    .then((data) => setData(data))
        console.log({apiData})
    
      }
    useEffect(() => {fetchData() }
     , []);
 
    return(
      <div className="property-card-container flex wrap">
          {apiData.map((item) => (
            <PropertyCard 
              id= {item.id}
              ImageUrl={item.ImageUrl}
              address={item.Address}
              price =  {item.Price}
              bedrooms={item.Bedrooms}
              bathrooms={item.Bathrooms}
              garden={item.Garden}
              salestatus={item.SaleStatus}
              fetchData={fetchData}
           />
         ))
         }
       </div>   
    )
 
};