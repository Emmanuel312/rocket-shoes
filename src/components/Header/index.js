import React from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingBasket } from 'react-icons/md'
import { connect } from 'react-redux'

import { Container,Cart } from './styles'
import logo from '../../assests/images/logo.svg'

function Header({ cartSize })
{

    return (
        <Container>
            <Link to="/" >
                <img src={logo} alt="Rocketshoes" />
            </Link>

            <Cart to="/cart">
                <div>
                    <strong>Meu carrinho</strong>
                    <span>{cartSize} itens</span>
                </div>
                <MdShoppingBasket size={36} color="#FFF" />
            </Cart>

        </Container>
    )
}

const mapStateToProps = state => 
({
    cartSize: state.cart.products.length
})


export default connect(mapStateToProps,null)(Header)