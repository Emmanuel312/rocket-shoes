import React from 'react'
import { MdRemoveCircleOutline, MdAddCircleOutline,MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { formatPrice } from '../../util/format' 
import { Container,ProductTable,Total } from './styles'
import * as CartActions from '../../store/modules/cart/action'

export default function Cart()
{
    const products = useSelector(state => state.cart.products.map(product =>
    ({
        ...product,
        subtotal: formatPrice(product.price * product.amount)
    })))
    const total = useSelector(state => formatPrice(state.cart.products.reduce((current,{ amount,price }) => current + price * amount , 0)))
    const dispatch = useDispatch()


    function increment(product)
    {
        dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1))
    }

    function decrement(product)
    {
        dispatch(CartActions.updateAmountRequest(product.id, product.amount -1))
    }

    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th />
                        <th>PRODUTO</th>
                        <th>QTD</th>
                        <th>SUBTOTAL</th>
                        <th />
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr>
                            <td>
                                <img src={product.image} alt={product.title}  />
                            </td>
                            <td>
                                <strong>{product.title}</strong>
                                <span>{product.priceFormatted} </span>
                            </td>
                            <td>
                                <div>
                                    <button type="button" onClick={() => decrement(product)}>
                                        <MdRemoveCircleOutline size={20} color="#7159c1"  />
                                    </button>
                                    
                                    <input type="number" readOnly value={product.amount} />

                                    <button type="button" onClick={() => increment(product)}>
                                        <MdAddCircleOutline size={20} color="#7159c1"  />
                                    </button>
                                </div>
                            </td>

                            <td>
                                <strong>{product.subtotal}</strong>
                            </td>

                            <td>
                                <button type="button" onClick={() => dispatch(CartActions.removeFromCart(product.id)) }>
                                    <MdDelete size={20} color="#7159c1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </ProductTable>

            <footer>
                <button type="button">Finalizar pedido</button>

                <Total>
                    <span>TOTAL</span>
                    <strong>{total}</strong>
                </Total>
                
            </footer>
        </Container>
    )
}
