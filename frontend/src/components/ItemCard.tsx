import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type ItemCardProps = {
    id: number,
    name: string,
    price: number
}

export function ItemCard({id, name, price} : ItemCardProps){
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id);

    return (
        <Card>
            <Card.Body className="itemcard d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="itemcard-button" style={{backgroundColor: "#8B4513"}} onClick={() => increaseCartQuantity(id)}>
                        + Add To Cart
                        </Button>
                    ) : (
                    <div
                        className="d-flex align-items-center flex-column"
                        style={{ gap: ".5rem" }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: ".5rem" }}
                            >
                            <Button variant="danger" onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                            <Button style={{backgroundColor: "#7BA05B"}} onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                        <Button
                            onClick={() => removeFromCart(id)}
                            variant="danger"
                            size="sm"
                        >
                        Remove
                        </Button>
                    </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}