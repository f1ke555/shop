import React from 'react';
import FavoriteItem from "./FavoriteItem";


const FavoriteItemList = ({items, user, database}) => {
    return (
        <div>
            {items.map((item) =>
                    <FavoriteItem user={user} item={item} database={database}/>
            )}
        </div>
    );
};

export default FavoriteItemList;