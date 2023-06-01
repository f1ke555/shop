import React, {useState} from 'react';
import {apiService} from "../service/api.service";
import {doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const DropdownHeader = ({database, items, category}) => {

    const [isView, setIsView] = useState('list__brands')
    const [filteredBrands, setFilteredBrands] = useState([])


    let navigate = useNavigate();
    const handleChangeCategory = async (item) => {
        const databaseRef = doc(database, 'category', `${item.id}`)
        await updateDoc(databaseRef, {
            popularity: item.popularity + 1
        })
        apiService.changeCategory$.next(item.name)
        navigate(`category/${apiService.changeCategory$.value}`)
        apiService.linkChange$.next(true)
    }

    const handleMouseEnterCategory = (item) => {
        setIsView('list__brands__view')
        apiService.changeCategory$.next(item)
        const filterBrands = items?.filter(item => item.category === apiService.changeCategory$.value)
        setFilteredBrands(filterBrands)
    }

    const handleMouseEnterBrand = () => {
        setIsView('list__brands__view')
    }

    const handleChangeBrand = (brand) => {
        apiService.changeBrand$.next(brand)
        navigate(`${apiService.changeCategory$.value}/${apiService.changeBrand$.value}`)
    }

    return (
        <div className="dropdown-menu">
            <div className='d-flex'>
                <div className='category__modal'>
                    {category?.map(item =>
                        <div
                            className={apiService.changeCategory$.value === item.name ? 'category__modal__active__hover' : 'category__modal__active'}
                            key={item.name}
                            onMouseEnter={() => handleMouseEnterCategory(item.name)}
                            onClick={() => handleChangeCategory(item)}
                            style={{cursor: "pointer"}}
                        >
                            {item.name}
                        </div>
                    )}
                </div>
                <div className='brand__modal'>
                    {filteredBrands?.map(item =>
                        <div
                            style={{cursor: "pointer"}}
                            onMouseEnter={handleMouseEnterBrand}
                            onClick={() => handleChangeBrand(item.brand)}
                            className={isView}
                        >
                            {item.brand}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropdownHeader;