import React, {useEffect, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import heart from '../images/heart.png'
import {addDoc, collection, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {apiService} from "../service/api.service";
import redheart from '../images/redheart.png'
import {apiTransport} from "../store/DeviceStore";

const DeviceItem = ({item, index, user, database}) => {

    const [itemsBasket, setItemsBasket] = useState([])
    const [itemsFavorite, setItemsFavorite] = useState([])
    const [isBasket, setIsBasket] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)


    const navigate = useNavigate();

    useEffect(() => {
        apiTransport.getBasketDevice(user)
        apiService.basketDevice$.subscribe((devices) => setItemsBasket(devices))
    }, [isBasket])

    useEffect(() => {
        apiTransport.getFavoriteDevice(user)
        apiService.favoriteDevice$.subscribe((devices) => setItemsFavorite(devices))
    }, [isFavorite])

    const getItemBasketClass = () => {
        const thisItemInBasket = itemsBasket.some(e => e.item.id === item.id)
        return thisItemInBasket ? 'btn btn-secondary' : 'btn btn-danger'
    }

    const getItemFavoriteBoolean = () => {
        let itemFavorite = false
        if (itemsFavorite.some(e => e.item.id === item.id)) {
            itemFavorite = true
        }
        return itemFavorite
    }

    const addItemInBasket = async (item) => {
        if (getItemBasketClass() === 'btn btn-secondary') {
            navigate('basket')
        } else {
            await addDoc(collection(database, "items_basket" + user.email), {
                item: item,
            });
        }
        setIsBasket(true)
    }

    const addItemInFavorites = async (item) => {
        console.log(item)
        if (getItemFavoriteBoolean()) {
            const elementId = itemsFavorite.find(favorite => favorite.item.id === item.id).id
            await deleteDoc(doc(database, 'item__favorite' + user?.email, `${elementId}`))
            setIsFavorite(false)
        } else {
            await addDoc(collection(database, "item__favorite" + user.email), {
                email: user.email,
                item
            })
            setIsFavorite(true)
        }
    }

    const changeItem = async (item) => {
        const databaseRef = doc(database, 'items', `${item.id}`)
        await updateDoc(databaseRef, {
            popularity: item.popularity + 1
        })
        apiService.deviceId$.next(item.id)
        navigate(`/device/${item.id}`)
    }

    return (
        <Card className='card__device pt-5 d-flex flex-column justify-content-between'>
            <div>
                <img style={{cursor: "pointer"}} onClick={() => changeItem(item)} src={item?.photoURL} width={160} height={150} src={item.photoURL}/>
                <h6 className='pt-3'>{item.name}</h6>
            </div>
            <div className='d-flex flex-column'>
                <div>{item.price} ₽</div>
                <div className='pt-1 d-flex justify-content-between align-items-center'>
                    <Button
                        onClick={() => addItemInBasket(item)}
                        className={getItemBasketClass()}
                    >
                        {getItemBasketClass() === 'btn btn-secondary' ? 'В корзине' : 'В корзину'}
                    </Button>
                    <img
                        onClick={() => addItemInFavorites(item)}
                        style={{width: 20, height: 20, cursor: "pointer", marginRight: 10}}
                        src={getItemFavoriteBoolean() ? redheart : heart}
                    />
                </div>
            </div>
        </Card>
    );
};

export default DeviceItem;