import produce from 'immer'

const initialState =
{
    products: []
}


export default function cart(state = initialState ,action)
{
    console.log(state)
    switch(action.type)
    {
        case '@cart/ADD_SUCCESS':
            return produce(state, draft =>
            {
                const { product } = action
                
                draft['products'].push(product)
            })

        case '@cart/REMOVE':
            return produce(state, draft =>
            {
                const productIndex = draft['products'].findIndex(p => p.id === action.id)
                
                if(productIndex >= 0)
                    draft['products'].splice(productIndex,1)
            })
        
        case '@cart/UPDATE_AMOUNT_SUCCESS': {
        
            return produce(state, draft =>
            {
                const productIndex = draft['products'].findIndex(p => p.id === action.id)

                if(productIndex >= 0)
                {
                    draft['products'][productIndex].amount = Number(action.amount)
                }

            })

        }


        default:
            return state
    }
}