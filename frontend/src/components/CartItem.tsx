import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useEffect, useState } from "react"
import { formatCurrency } from "../utilities/formatCurrency"


export function CartItem({id, quantity}: CartItemProps) {

    const [storeItems, setAllItems] = useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/items/')
        .then(response => response.json())
        .then(data => setAllItems(data))
        .catch(error => console.error(error));
        console.log(storeItems)
    }, []);

    const{removeFromCart} = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if(item == null) return null
    
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >&times;
            </Button>
        </Stack>
    )
}
