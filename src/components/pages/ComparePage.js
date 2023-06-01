import React, {useContext, useEffect, useState} from 'react';
import CompareItemList from "../CompareItemList";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {apiTransport} from "../../store/DeviceStore";
import {apiService} from "../../service/api.service";

const ComparePage = () => {

    const {database} = useContext(Context)
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const [items, setItems] = useState([])

    useEffect(() => {
        apiTransport.getCompareDevice(user)
        apiService.compareDevice$.subscribe((devices) => setItems(devices))
    }, )

    return (
        <CompareItemList database={database} user={user} items={items}/>
    );
};

export default ComparePage;