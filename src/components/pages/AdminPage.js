import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {addDoc, collection} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

const AdminPage = () => {
    const {database} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [items, loading] = useCollectionData(
        collection(database, 'items')
    )

    const addItem = async (e) => {
        e.preventDefault()
        await addDoc(collection(database, "items"), {
            name,
            price,
            category,
            brand,
        });
    }

    return (
        <div>
            <form>
                <h1>Добавление товара</h1>
                <input onChange={(event) => setName(event.target.value)} value={name} placeholder='Назвавние'/>
                <input onChange={(event) => setPrice(event.target.value)} value={price} placeholder='Цена'/>
                <input onChange={(event) => setCategory(event.target.value)} value={category} placeholder='Категория'/>
                <input onChange={(event) => setBrand(event.target.value)} value={brand} placeholder='Бренд'/>
                <button onClick={addItem}>Добавить</button>
            </form>
            <form>
                <h1>Добавление категории</h1>
                <input/>
            </form>
            <form>
                <h1>Добавление бренда</h1>
                <input/>
            </form>
            {
                items?.map(item =>
                    <div>
                        <div>{item.name}</div>
                        <div>{item.email}</div>
                    </div>

                )
            }
        </div>
    );
};

export default AdminPage;