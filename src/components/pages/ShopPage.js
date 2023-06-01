import React, {useContext, useEffect, useState} from "react";
import DeviceList from "../DeviceList";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {apiTransport} from "../../store/DeviceStore";
import {apiService} from "../../service/api.service";
import Loader from "../Loader";
import {doc, updateDoc} from "firebase/firestore";
import CarouselActions from "../CarouselActions";
import DeviceItem from "../DeviceItem";
import {useNavigate} from "react-router-dom";




const ShopPage = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const {database} = useContext(Context)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSearch, setIsSearch] = useState('')
    const [isCategory, setIsCategory] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        apiTransport.getCategory()
        apiTransport.getAllDevice().then(() => {
            setIsLoading(false)
        })
    }, [isSearch])

    useEffect(() => {
        apiService.allDevice$.subscribe((devices) => setItems(devices))
        apiService.inputSearch$.subscribe((search) => setIsSearch(search))
        apiService.allCategory$.subscribe((category) => setIsCategory(category))
    })

    if (isLoading) {
        return <Loader/>
    }

    const handleChangeCategory = async (item) => {
        const databaseRef = doc(database, 'category', `${item.id}`)
        await updateDoc(databaseRef, {
            popularity: item.popularity + 1
        })
        console.log(item)
        apiService.changeCategory$.next(item.name)
        navigate(`category/${apiService.changeCategory$.value}`)
        apiService.linkChange$.next(true)
    }

    return (
        <div>
            <h2 className='pt-5'>Акции</h2>
            <CarouselActions database={database}/>
            <h2 className='pt-5'>Популярные категории</h2>
            <div className='d-flex justify-content-between pt-5'>
                {isCategory
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 7)
                    .map(item =>
                    <div style={{cursor: "pointer"}} className='d-flex flex-column align-items-center'>
                        <img onClick={() => handleChangeCategory(item)} width={170} height={150} src={item.photoURL}/>
                        <div>{item.name}</div>
                    </div>
                )}
            </div>
            <h2 className='pt-5'>Популярные товары</h2>
            <div className='d-flex'>
                {items
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 7)
                    .map(item =>
                    <DeviceItem database={database} user={user} item={item}/>
                )}
            </div>
            <h2 className='pt-5'>Все товары</h2>
            <DeviceList user={user} database={database} shopItems={items}/>
        </div>

    )
}

export default ShopPage;


