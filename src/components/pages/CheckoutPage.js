import React, {useContext, useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../../index";
import {Link} from "react-router-dom";
import CheckoutList from "../CheckoutList";
import {apiTransport} from "../../store/DeviceStore";
import {apiService} from "../../service/api.service";
import {numWord} from "../../utils/utils";
import Loader from "../Loader";

const CheckoutPage = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [isCardPay, setIsCardPay] = useState(false)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        apiTransport.getBasketDevice(user).then(() => {
            setIsLoading(false)
        })
        apiService.basketDevice$.subscribe((devices) => setItems(devices))
    }, )

    const handleChangePay = () => {
        setIsCardPay(!isCardPay)
    }

    if (isLoading) {
        return <Loader/>
    }


    return (
        <div>
            <h1 className='pt-5'>Оформление заказа</h1>
            <div className='d-flex'>
                <CheckoutList auth={auth} cardPay={handleChangePay} user={user} items={items}/>
                <Card style={{width: 360, height: 200}} className='card__purchase  p-3 m-5 position-fixed'>
                    <h5>К оплате</h5>
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
                    {isCardPay
                        ?
                        <Link className='btn btn-danger mt-4'>
                            Заказать
                        </Link>
                        :
                        <Link className='btn btn-danger mt-4'>
                            Оплатить
                        </Link>
                    }

                </Card>
            </div>
        </div>
    );
};

export default CheckoutPage;