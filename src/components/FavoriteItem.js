import React, {useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import {addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import {apiTransport} from "../store/DeviceStore";
import {apiService} from "../service/api.service";
import {useNavigate} from "react-router-dom";

const FavoriteItem = ({item, user, database}) => {

    const [itemsBasket, setItemsBasket] = useState([])
    const [isBasket, setIsBasket] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        apiTransport.getBasketDevice(user)
        apiService.basketDevice$.subscribe((devices) => setItemsBasket(devices))
    }, [isBasket])

    const getItemBasketClass = () => {
        const thisItemInBasket = itemsBasket.some(e => e.item.id === item.item.id)
        return thisItemInBasket ? 'btn btn-secondary' : 'btn btn-danger'
    }

    const addItemInBasket = async (item) => {
        if (getItemBasketClass() === 'btn btn-secondary') {
            navigate('/basket')
        } else {
            await addDoc(collection(database, "items_basket" + user.email), {
                item: item,
            });
        }
        setIsBasket(true)
    }

    const deleteItem = async (item) => {
        await deleteDoc(doc(database, 'item__favorite' + user?.email, `${item.id}`))
    }

    return (
        <div className='d-flex justify-content-between card__favorites'>
            <div className='d-flex p-3'>
                <Image src={item.item.photoURL} width={250} height={180}/>
                <div className='m-4 d-flex flex-column justify-content-sm-between'>
                    <h5>{item.item.name}</h5>
                    <div className='d-flex'>
                        <button className='button'>Сравнить</button>
                        <button onClick={() => deleteItem(item)} className='button'>Удалить</button>
                    </div>
                </div>
            </div>
            <div className='p-3'>
                <h4>{item.item.price} ₽</h4>
                <button
                    onClick={() => addItemInBasket(item.item)}
                    className={getItemBasketClass()}
                >
                    {getItemBasketClass() === 'btn btn-secondary' ? 'В корзине' : 'В корзину'}
                </button>
            </div>
        </div>
    );
};

export default FavoriteItem;