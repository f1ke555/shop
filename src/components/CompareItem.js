import React from 'react';
import {Button, Card, Image} from "react-bootstrap";
import trashBin from '../images/trashBin.png'
import {addDoc, collection} from "firebase/firestore";

const CompareItem = ({item, user, database}) => {
    const addItemInBasket = async (item) => {
        await addDoc(collection(database, "items_basket" + user?.email), {
            email: user.email,
            item
        });
    }

    return (
        <div className='d-flex'>
            <Card className='p-2 card__device'>
                <Image src={item.item.photoURL} width={160} height={150}/>
                <div>
                    <h6>{item.item.name}</h6>
                    <div>{item.item.price} ₽</div>
                </div>
                <div className='d-flex justify-content-between pt-2'>
                    <Button onClick={() => addItemInBasket(item)} className="btn btn-danger">В корзину</Button>
                    <div className='d-flex align-items-center'>
                        <img style={{width: 18, height: 18, cursor: "pointer", marginRight: 5}} src={trashBin}></img>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CompareItem;