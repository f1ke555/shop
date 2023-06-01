import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {apiService} from "../../service/api.service";
import {apiTransport} from "../../store/DeviceStore";
import DeviceItem from "../DeviceItem";
import {useAuthState} from "react-firebase-hooks/auth";
import {useLocation} from "react-router-dom";
import Loader from "../Loader";

const CategoryPage = () => {

    const {database, auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const [items, setItems] = useState([])
    const [isLink, setIsLink] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const location = useLocation()

     useEffect(() => {
         apiTransport.getCategoryDevice(decodeURI(location.pathname.split('/')[2])).then(() => {
             setIsLoading(false)
         })
         setIsLink(false)
     }, [isLink])

    useEffect(() => {
        apiService.categoryDevice$.subscribe((devices) => setItems(devices))
        apiService.linkChange$.subscribe(link => setIsLink(link))
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <h1 className='pt-5'>{decodeURI(location.pathname.split('/')[2])}</h1>
            <div className='d-flex'>
                {items?.map((item, index) =>
                    <DeviceItem
                        item={item}
                        index={index}
                        user={user}
                        database={database}
                    />
                )}
            </div>
        </div>
    );
};

export default CategoryPage;