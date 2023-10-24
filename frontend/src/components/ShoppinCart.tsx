import {Offcanvas, Stack} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import { useEffect, useState } from "react"

type ShoppinCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen} : ShoppinCartProps) {
    const {closeCart, cartItems} = useShoppingCart()
    const [storeItems, setAllItems] = useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/items/')
        .then(response => response.json())
        .then(data => setAllItems(data))
        .catch(error => console.error(error));
        console.log(storeItems)
    }, []);
     
    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total{" "}
                    {formatCurrency(
                        cartItems.reduce((total, cartItem) =>{
                            const item = storeItems.find(item => item.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity}, 0)
                    )}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}