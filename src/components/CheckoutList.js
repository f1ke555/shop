import React, {useState} from 'react';
import {Card, Image} from "react-bootstrap";
import {numWord} from "../utils/utils";

const CheckoutList = ({items, user, cardPay}) => {

    const [isDelivery, setIsDelivery] = useState(false)

    return (
        <div>
            <Card className='card__checkout mt-5'>
                <h3>
                    {items?.reduce((acc, curr) => {
                        acc += curr.item.count
                        return acc
                    }, 0)} {numWord(items)}
                </h3>
                <div className='d-flex'>
                    {items?.map(item =>
                        <div className='card__checkout__items'>
                            <Image className='m-3' src={item.item.photoURL} width={50} height={50}/>
                        </div>
                    )}
                </div>
            </Card>
            <Card className='card__checkout mt-5'>
                <h3>Способ получения</h3>
                <div className='d-flex'>
                    <button onClick={() => setIsDelivery(false)} className='button__checkout'>Самовывоз</button>
                    <button onClick={() => setIsDelivery(true)} className='button__checkout'>Доставка</button>
                </div>
            </Card>
            <Card className='card__checkout mt-5'>
                {isDelivery
                    ?
                    <h3>Выберите адрес доставки</h3>
                    :
                    <h3>Выберите адрес магазина</h3>
                }

                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A16cc525a67b3d0ecc496339bd90894b70e6e8e10f21900a15abf80f5d440f2d4&amp;source=constructor"
                    width="850" height="450" frameBorder="0"></iframe>
            </Card>
            <Card className='card__checkout mt-5'>
                <h3>Способ оплаты</h3>
                <button className='button__checkout button__checkout__pay'>
                    <div className='d-flex justify-content-between'>
                        <div onClick={cardPay}>Банковской картой</div>
                        <div onClick={cardPay}>Visa, MasterCard, Мир, SberPay</div>
                    </div>
                </button>
                <button className='button__checkout button__checkout__pay'>
                    <div className='d-flex justify-content-between'>
                        <div>При получении</div>
                        <div>Наличными, картой, по SMS или в личном кабинете на сайте</div>
                    </div>
                </button>
            </Card>
            <Card className='card__checkout mt-5'>
                <h3>Покупатель</h3>
                <div className='d-flex justify-content-between'>
                    <div>Имя и фамилия</div>
                    <h6>{user?.displayName}</h6>
                </div>
                <div className='d-flex justify-content-between'>
                    <div>Номер телефона</div>
                    <h6>{user?.phoneNumber}</h6>
                </div>
            </Card>
            <Card className='card__checkout mt-5'>
                <h3>Получатель</h3>
                <div className='d-flex'>
                    <button className='button__checkout'>Я получатель</button>
                    <button className='button__checkout'>Получит другой человек</button>
                </div>
            </Card>
        </div>
    );
};

export default CheckoutList;