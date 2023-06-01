import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import FavoriteItemList from "../FavoriteItemList";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {apiTransport} from "../../store/DeviceStore";
import {apiService} from "../../service/api.service";
import Loader from "../Loader";


const FavoritesPage = () => {

    const {database} = useContext(Context)
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        apiTransport.getFavoriteDevice(user).then(() => {
            setIsLoading(false)
        })
        apiService.favoriteDevice$.subscribe((devices) => setItems(devices))
    }, )

    if (!items?.length) {
        return (
            <Container>
                <h1 className='pt-5'>Избранное пусто</h1>
            </Container>
            )
    }

    if (isLoading) {
        return <Loader/>
    }


    return (
        <div>
            <h1 className='pt-5 pb-5'>Избранное</h1>
                <FavoriteItemList items={items} user={user} database={database}/>
        </div>
    );
};

export default FavoritesPage;