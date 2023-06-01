import React from 'react';
import BasketItem from "./BasketItem";


const BasketItemList = ({items, user, database}) => {

    return (
        <div className='pt-5'>
            {items.map(item =>
                    <BasketItem database={database} user={user} item={item}/>
            )}
        </div>
    );
};

export default BasketItemList;