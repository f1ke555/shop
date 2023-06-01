import React, {useContext, useEffect, useState} from 'react';
import {addDoc, collection, doc, getDoc} from "firebase/firestore";
import {Context} from "../../index";
import {Button, Image} from "react-bootstrap";
import heart from "../../images/heart.png";
import statistic from "../../images/statistic.png";
import {apiService} from "../../service/api.service";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../Loader";

const DevicePage = () => {

    const {database} = useContext(Context)
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const [item, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const docRef = doc(database, "items", `${apiService.deviceId$.value}`);
            const docSnap = await getDoc(docRef);
            setItem(docSnap.data())
        })()
    }, [])

    const addItemInBasket = async (item) => {
        await addDoc(collection(database, "items_basket" + user.email), {
            item: item,
        });
    }

    const addItemInFavorites = async (item) => {
        await addDoc(collection(database, "item__favorite" + user.email), {
            email: user.email,
            item
        })
    }

    const addItemInCompare = async (item) => {
        await addDoc(collection(database, "items_compare" + user.email), {
            email: user.email,
            item,
        })
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <div className='d-flex pt-5'>
                <Image width={400} height={300} src={item.photoURL}/>
                <div style={{marginLeft: 30}} className='d-flex flex-column'>
                    <h4>{item.name}</h4>
                    <div className='d-flex'>
                        <img
                            onClick={() => addItemInFavorites(item)}
                            style={{width: 17, height: 17, cursor: "pointer", marginRight: 5}}
                            src={heart}
                        />
                        <img
                            onClick={() => addItemInCompare(item)}
                            style={{width: 20, height: 17, cursor: "pointer"}}
                            src={statistic}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <div className='card__order'>
                        <h4>{item.price} ₽</h4>
                        <Button
                            onClick={() => addItemInBasket(item)}
                            className='btn btn-danger'
                        >
                            В корзину
                        </Button>
                    </div>

                </div>
            </div>
            <div className='card__description mt-5'>
                <h3>О товаре</h3>
                <div>{item.description}</div>
            </div>
        </div>
    );
};

export default DevicePage;