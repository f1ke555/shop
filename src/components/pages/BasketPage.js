import React, {useContext, useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import BasketItemList from "../BasketItemList";
import {Context} from "../../index";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {apiTransport} from "../../store/DeviceStore";
import {apiService} from "../../service/api.service";
import {numWord} from "../../utils/utils";
import Loader from "../Loader";

const BasketPage = () => {

    const {database} = useContext(Context)
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])

    useEffect(() => {
        apiTransport.getBasketDevice(user).then(() => {
            setIsLoading(false)
        })
        apiService.basketDevice$.subscribe((devices) => setItems(devices))
    }, )

    if (!items?.length) {
        return (
            <h1 className='pt-5'>Корзина пустая</h1>
        )
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <h1 className='pt-5'>Корзина</h1>
            <div className='d-flex'>
                <BasketItemList database={database} user={user} items={items}/>
                <Card style={{width: 360, height: 200}} className='card__order p-3 m-5'>
                    <h5>Детали заказа</h5>
                    <div className='d-flex justify-content-between'>
                        <h6>{items?.reduce((acc, curr) => {
                            acc += curr.item.count
                            return acc
                        }, 0)} {numWord(items)}</h6>
                        <h6>
                            {items?.reduce((acc, curr) => {
                                acc += curr.item.price * curr.item.count
                                return acc
                            }, 0)} ₽
                        </h6>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h5>Итого</h5>
                        <h5> {items?.reduce((acc, curr) => {
                            acc += curr.item.price * curr.item.count
                            return acc
                        }, 0)} ₽</h5>
                    </div>
                    <Link className='btn btn-danger mt-4' to='/basket/checkout'>
                        Перейти к оформлению
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default BasketPage;