import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {apiTransport} from "../../store/DeviceStore";
import {apiService} from "../../service/api.service";
import DeviceItem from "../DeviceItem";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../Loader";

const BrandPage = () => {

    const {database, auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const [items, setItems] = useState([])
    const [isLink, setIsLink] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const location = useLocation()

    useEffect(() => {
        apiTransport.getBrandDevice(decodeURI(location.pathname.split('/')[2])).then(() => {
            setIsLoading(false)
        })
        setIsLink(false)
    }, [isLink])

    useEffect(() => {
        apiService.brandDevice$.subscribe((devices) => setItems(devices))
        apiService.linkChange$.subscribe(link => setIsLink(link))
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <h1 className='pt-5'>{decodeURI(location.pathname.split('/')[1])}/{decodeURI(location.pathname.split('/')[2])}</h1>
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

export default BrandPage;