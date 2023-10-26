import {Button, Offcanvas, Stack} from "react-bootstrap"
import { ShoppingCartProvider, useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import { useEffect, useState } from "react"

type ShoppinCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen} : ShoppinCartProps) {
    const {closeCart, cartItems} = useShoppingCart()
    const [storeItems, setAllItems] = useState([]);
    const[isPaymentMode, setIsPaymentMode] = useState(false);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [adress, setAdress] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/items/')
        .then(response => response.json())
        .then(data => setAllItems(data))
        .catch(error => console.error(error));
        console.log(storeItems)
    }, []);


    const enterPaymentMode = () => {
    setIsPaymentMode(true);
    }

    const goBackToCart = () => {
        setIsPaymentMode(false);
    }

    const handlePayment = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(name, adress, city, phonenumber);

        if(name.length < 5){
            alert("Your full name is too short");
            return;
        }

        if(city.length < 3){
            alert("City is too short");
            return;
        }

        if(adress.length < 8){
            alert("Your adress is too short");
            return;
        }

        if(phonenumber.length !== 10){
            alert("Your phonenumber is too short");
            return;
        }

        setName('');
        setCity('');
        setAdress('');
        setPhonenumber('');
        goBackToCart();
        cartItems.splice(0, cartItems.length);
        localStorage.clear();
        closeCart();
        // clear alla inputs
    }

    const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };

    const handleSetCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value)
    };
    
    const handleSetAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdress(event.target.value)
    };
    const handleSetPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhonenumber(event.target.value)
    };
     
    return <Offcanvas show={isOpen} onHide={closeCart} placement="end" style={{backgroundColor: "#D2B48C"}}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {isPaymentMode ? (
            <div>
                <form onSubmit={handlePayment} className="paymentform">
                    <input placeholder="Full name" value={name} onChange={handleSetName}></input>
                    <input placeholder="City" value={city} onChange={handleSetCity}></input>
                    <input placeholder="Adress" value={adress} onChange={handleSetAdress}></input>
                    <input placeholder="Swish" value={phonenumber} onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        const syntheticEvent: React.ChangeEvent<HTMLInputElement> = {
                            target: {
                                value: numericValue,
                            },
                        };
                            handleSetPhoneNumber(syntheticEvent);
                        }}
                        maxLength={10}
                    >
                    </input>
                    <h1 className="paymentformprice">{formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(item => item.id === cartItem.id);
                            return total + (item?.price || 0) * cartItem.quantity;
                            }, 0)
                        )}
                    </h1>
                </form>
                <div className="paymentformbuttons">
                    <Button className="buttonmargin" style={{backgroundColor: "black"}} onClick={goBackToCart}>Back to Cart</Button>
                    <Button className="buttonmargin" type="submit" disabled={!adress || !name || !city || !phonenumber} style={{backgroundColor: "black"}} onClick={handlePayment}>Finish payment</Button>
                </div>
            </div>
            ) : (
            <Stack gap={3}>
                {cartItems.map(item => (
                <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                Total{" "}
                    {formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(item => item.id === cartItem.id);
                        return total + (item?.price || 0) * cartItem.quantity;
                        }, 0)
                    )}
                </div>
                <div className="specialbutton">
                    <Button style={{backgroundColor: "black"}} onClick={enterPaymentMode}>Proceed to checkout</Button>
                </div>
            </Stack>
            )}
        </Offcanvas.Body>
    </Offcanvas>
}