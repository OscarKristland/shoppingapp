import { useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";

function Home() {
    const [allItems, setAllItems] = useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/items/')
        .then(response => response.json())
        .then(data => setAllItems(data))
        .catch(error => console.error(error));
        console.log(allItems)
    }, []);

    return (
        <div>
            <div className="product-container">
                {allItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                        />
                ))}
            </div>
        </div>
    );
}

export default Home;