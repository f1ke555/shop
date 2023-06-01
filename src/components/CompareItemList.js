import React from 'react';
import CompareItem from "./CompareItem";

const CompareItemList = ({items, user, database}) => {

    return (
        <div className='d-flex'>
            {items?.map(item =>
            <CompareItem database={database} user={user} item={item}/>
            )}
        </div>
    );
};

export default CompareItemList;