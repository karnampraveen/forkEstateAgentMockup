import { useState, useEffect } from "react";
// import WriteToJSON from "./WriteToJSON";
import '../Register.css';

const RegisterBuyer = () => {

    // Add state for each of the Buyer fields
    const [FirstName, setFirstName] = useState('')
    const [SurName, setSurName] = useState('')
    const [ExistingBuyer, setExistingBuyer] = useState(false)

    const [BuyerData, setBuyerData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/Buyers')
            .then((response) => response.json())
            .then((data) => setBuyerData(data))
    }, [])

    function DoRegister(e) {
        e.preventDefault();
        document.getElementById("BuyerError").innerHTML = ""
        // Search in the JSON file for the First name and Second name entered in the form (now in the state)
        const FilteredBuyer = BuyerData.filter((Buyer) => Buyer.FirstName.toLowerCase() === FirstName.toLowerCase() & Buyer.SurName.toLowerCase() === SurName.toLowerCase())
        //Buyer.FirstName.toLowerCase()===FirstName.toLowerCase() & 
        // Check if the length of Filtered result is > 0. If so, the buyer already exists. Give appropriate error and dont add the user.
        if (FilteredBuyer.length > 0) {
            document.getElementById("BuyerError").innerHTML = "Buyer already exists. Buyer ID is " + FilteredBuyer.map((Buyer => Buyer.id))
        }
        else {

            const newBuyer = { FirstName, SurName }
            fetch('http://localhost:8000/Buyers',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBuyer)
                }
            )
            const FilteredBuyer = BuyerData.filter((Buyer) => Buyer.FirstName === FirstName & Buyer.SurName === SurName)
            document.getElementById("BuyerError").innerHTML = "Buyer added successfully. ID is " + FilteredBuyer.map((Buyer => Buyer.id))
            setFirstName('')
            setSurName('')
        }

    }

    return (
        <div class="register-buyer">
            <form onSubmit={DoRegister}>
                <div>
                    <h1 className="App-header">Register a new Buyer here</h1>
                    <div className="flex details">
                        <div class="name-input left">
                            <p>First Name:</p>
                            <input type="text" value={FirstName} name="FirstName" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div class="name-input right">
                            <p>Surname:</p>
                            <input type="text" name="SurName" value={SurName} onChange={(e) => setSurName(e.target.value)} />
                        </div>
                    </div>
                    <div id="BuyerError"></div>
                    <button class="submit-button">Add Buyer</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterBuyer;
