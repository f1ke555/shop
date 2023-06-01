import React from 'react';
import DeviceItem from "./DeviceItem";
import {apiService} from "../service/api.service";

const DeviceList = ({shopItems, user, database}) => {
    return (
        <div className='d-flex flex-wrap'>
            {
                shopItems
                    .filter(item => item.name.toLowerCase().includes(apiService.inputSearch$.value.toLowerCase()))
                    .map((item, index) =>
                    <DeviceItem
                        item={item}
                        key={item.id}
                        user={user}
                        database={database}
                    />
                )
            }
        </div>
    );
};

export default DeviceList;