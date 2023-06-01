import React from 'react';
import {Card, Image} from "react-bootstrap";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";


const BasketItem = ({item, user, database}) => {

    const handleChangeCount = async (direction, item) => {
        const databaseRef = doc(database, 'items_basket' + user?.email, `${item.id}`)
        console.log(databaseRef)
        if (direction === 'minus' && item.item.count === 1) {
           await deleteItem(item)
        } else if (direction === 'plus') {
            await updateDoc(databaseRef, {
                item:{
                    ...item.item,
                    count: item.item.count + 1
                }
            })
        } else if (direction === 'minus') {
            await updateDoc(databaseRef, {
                item:{
                    ...item.item,
                    count: item.item.count - 1
                }
            })
        }
    }

    const deleteItem = async (item) => {
        await deleteDoc(doc(database, 'items_basket' + user?.email, `${item.id}`))
    }

    return (
        <Card className='card__basket'>
            <div className='d-flex justify-content-between container align-items-center'>
                <Image src={item.item.photoURL} width={120} height={120}/>
                <h6>{item.item.name}</h6>
                <div>
                    <div className='d-flex pt-4'>
                        <button type='button' onClick={() => handleChangeCount('minus', item)} className='btn btn-outline-dark btn-sm m-2'>-</button>
                        <div className='m-2'>{item.item.count}</div>
                        <button type='button' onClick={() => handleChangeCount('plus', item)} className='btn btn-outline-dark btn-sm m-2'>+</button>
                    </div>
                    <button style={{marginRight: "auto", marginLeft: 'auto', width: 100}} className='button' onClick={() => deleteItem(item)}>Удалить</button>
                </div>
                <h5>{item.item.price * item.item.count} ₽</h5>
            </div>
        </Card>
    );
};

export default BasketItem;