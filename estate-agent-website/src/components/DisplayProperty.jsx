import { useState, useEffect, useContext } from 'react';
import PropertyCard from './PropertyCard';
import { PropContext } from "../context/prop-context"

export default function DisplayProperty({ id, apiData, fetchData }) {
  //context for search filter
  const { gotFilter } = useContext(PropContext)
  const { priceMin } = useContext(PropContext)
  const { priceMax } = useContext(PropContext)
  const { bedRoomsMin } = useContext(PropContext)
  const { bedRoomsMax } = useContext(PropContext)
  const { bathRoomsMin } = useContext(PropContext)
  const { bathRoomsMax } = useContext(PropContext)
  const { hasGarden } = useContext(PropContext)

  const [ImageUrl, setImageUrl] = useState("");
  const [Address, setAddress] = useState("");
  const [Price, setPrice] = useState(0);
  const [Bedrooms, setBedrooms] = useState(1);
  const [Bathrooms, setBathrooms] = useState(1);
  const [Garden, setGarden] = useState("No");
  const [SaleStatus, setSaleStatus] = useState("FORSALE");
  const [Seller, setSeller] = useState("")
  let [edit, setEdit] = useState([])
  let [editAddress,setEditAddress] = useState("")
  let [editPrice,setEditPrice] = useState("")
  let [editBedrooms,setEditBedrooms] = useState("")
  let [editBathrooms,setEditBathrooms] = useState("")
  let [editGarden,setEditGarden] = useState("")
  let [editImageUrl,setEditImageUrl] = useState("")
  let [editSaleStatus,setEditSaleStatus] = useState("")

  useEffect(() => {
    activateModal()
  }, [edit]);

  const activateModal = () => {
    // console.log("Modal activated")
    return (
      <dialog>
        <div>
          <form onSubmit={sendUpdate}>
            <div className="flex">
              <p>Address:</p>
              <input required type="text" value={Address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="flex">
              <p>Price:</p>
              <input required type="number" min={0} value={Price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="flex">
              <p>Bedrooms:</p>
              <input required type="number" min={0} value={Bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
            </div>
            <div className="flex">
              <p>Bathrooms:</p>
              <input required type="number" min={0} value={Bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
            </div>
            <div className="flex">
              <p>Garden:</p>
              <select required type="text" value={Garden} onChange={(e) => setGarden(e.target.value)}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="flex">
              <p>Image URL:</p>
              <input required type="text" value={ImageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="flex">
              <p>Status:</p>
              <select required value={SaleStatus} onChange={(e) => setSaleStatus(e.target.value)}>
                <option>FORSALE</option>
                <option>WITHDRAWN</option>
                <option>SOLD</option>
              </select>
            </div>
            <button type="submit">Amend</button>
          </form>
        </div>
      </dialog>
    )
  }


  function sendUpdate(e, id, Address, Price, Bedrooms, Bathrooms, Garden, ImageUrl, SaleStatus) {
    e.preventDefault()
    fetch('http://localhost:8000/Properties/' + edit, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({Address, Price, Bedrooms, Bathrooms, Garden, ImageUrl, SaleStatus}),
    })
      .then(fetchData)
      .then(setEdit = (""))
  }

  // gotFilter will be true if user input is coming from the Find Property Component. If solid, filter the JSON and display only the result
  if (gotFilter) {
    // If there is a Min Price filter:
    if (priceMin) {
      apiData = apiData.filter((Property) => parseInt(Property.Price) >= parseInt(priceMin))
    }
    // If there is a Max Price filter:
    if (priceMax) {
      apiData = apiData.filter((Property) => parseInt(Property.Price) <= parseInt(priceMax))
    }
    // If there is a Min Bedrooms filter:
    if (bedRoomsMin) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) >= parseInt(bedRoomsMin))
    }
    // If there is a Max Bedrooms filter:
    if (bedRoomsMax) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) <= parseInt(bedRoomsMax))
    }
    // If there is a Min Bathrooms filter:
    if (bathRoomsMin) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) >= parseInt(bathRoomsMin))
    }
    // If there is a Max Bathrooms filter:
    if (bathRoomsMax) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) <= parseInt(bathRoomsMax))
    }
    // If there is a Garden filter:
    if (hasGarden === "Yes") {
      apiData = apiData.filter((Property) => Property.Garden === hasGarden)
    }
  }
  if (apiData.length === 0) {
    return (
      <h1>There are no properties matching your search. Try changing the filters to see other properties.</h1>
    )
  } else {
    return (
      <div className="property-card-container flex wrap">
        {apiData.map((item) => (
          <PropertyCard
            id={item.id}
            ImageUrl={item.ImageUrl}
            address={item.Address}
            price={item.Price}
            bedrooms={item.Bedrooms}
            bathrooms={item.Bathrooms}
            garden={item.Garden}
            salestatus={item.SaleStatus}
            fetchData={fetchData}
            edit={edit}
            setEdit={setEdit}
            activateModal={activateModal}
            setEditAddress={setEditAddress}
            setEditPrice={setEditPrice}
            setEditBedrooms={setEditBedrooms}
            setEditBathrooms={setEditBathrooms}
            setEditGarden={setEditGarden}
            setEditImageUrl={setEditImageUrl}
            setEditSaleStatus={setEditSaleStatus}
          />
        ))
        }
      </div>
    )
  };
}