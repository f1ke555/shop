import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Container, Image, Nav} from "react-bootstrap";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import MyModal from "./UI/Modal/MyModal";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import statistic from '../images/statistic.png'
import heart from '../images/heart.png'
import trashBin from '../images/trashBin.png'
import userImage from '../images/user.png'
import userOut from '../images/userOut.png'
import {apiService} from "../service/api.service";
import logo from '../images/logo.png'
import DropdownHeader from "./DropdownHeader";

const Header = () => {
    const {auth, database} = useContext(Context)
    const [user] = useAuthState(auth)
    const [modal, setModal] = useState(false)
    const [isCategory, setIsCategory] = useState([])
    const [items, setItems] = useState([])
    const [itemsBasket, setItemsBasket] = useState([])
    const [itemsFavorite, setItemsFavorite] = useState([])

    useEffect(() => {
        apiService.allDevice$.subscribe((devices) => setItems(devices))
        apiService.allCategory$.subscribe((category) => setIsCategory(category))
        apiService.favoriteDevice$.subscribe((devices) => setItemsFavorite(devices))
        apiService.basketDevice$.subscribe((devices) => setItemsBasket(devices))
    }, [])

    const login = async () => {
        const provider = new GoogleAuthProvider()
        const {user} = await signInWithPopup(auth,provider)
        setModal(false)
    }

    const handleChangeSearch = (e) => {
        apiService.inputSearch$.next(e.target.value)
    }

    // const handleMouseLeaveCategory = () => {
    //     setIsView('list__brands')
    //     apiService.changeCategory$.next('')
    // }

    return (
            <nav className="navbar navbar-expand-lg sticky-top bg-light">
                <Container>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Переключатель навигации">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex justify-content-around"
                             id="navbarSupportedContent">
                            <div>
                                <Link to=''>
                                    <Image width={60} height={40} src={logo}/>
                                </Link>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-danger dropdown-toggle"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Каталог
                                    </button>
                                    <DropdownHeader database={database} items={items} category={isCategory}/>
                                </div>
                                <input onChange={event => handleChangeSearch(event)} className='input__search'
                                       placeholder='Поиск в GadgetStore'/>
                            </div>
                            {user
                                ?
                                <Nav>
                                    <div className='icon_header'>
                                        <Image className='icon_head' width={30} height={30} src={userImage}/>
                                        <div style={{marginRight: 30}}>{user.displayName}</div>
                                    </div>
                                    <Link className='button position-relative' to='favorites'>
                                        <div>
                                            <Image width={30} height={30} src={heart}/>
                                            {itemsFavorite?.length
                                                ?
                                                <div style={{left: 50}}
                                                     className='count__header'>{itemsFavorite?.length}</div>
                                                :
                                                <></>
                                            }

                                        </div>
                                        Избранное
                                    </Link>
                                    <Link className='button position-relative' to='basket'>
                                        <div>
                                            <Image width={30} height={30} src={trashBin}/>
                                            {itemsBasket?.length
                                                ?
                                                <div className='position-absolute count__header'>{itemsBasket?.reduce((acc, curr) => {
                                                    acc += curr.item.count
                                                    return acc
                                                }, 0)}</div>
                                                :
                                                <></>
                                            }
                                        </div>
                                        Корзина
                                    </Link>
                                    <button className='button' onClick={() => auth.signOut()}>
                                        <div>
                                            <Image width={30} height={30} src={userOut}/>
                                        </div>
                                        Выйти
                                    </button>
                                </Nav>
                                :
                                <Nav>
                                    <button onClick={() => setModal(true)} className='button'>
                                        <div>
                                            <Image width={30} height={30} src={userOut}/>
                                        </div>
                                        Войти
                                    </button>
                                    <MyModal visible={modal} setVisible={setModal}>
                                        <div>
                                            <button className='btn btn-danger' onClick={login}>Войти с помощью Google
                                            </button>
                                        </div>
                                    </MyModal>
                                    <Link className='button button__disabled' to='compare'>
                                        <div>
                                            <Image width={30} height={30} src={statistic}/>
                                        </div>
                                        Сравнение
                                    </Link>
                                    <Link className='button button__disabled' to='favorites'>
                                        <div>
                                            <Image width={30} height={30} src={heart}/>
                                        </div>
                                        Избранное
                                    </Link>
                                    <Link className='button button__disabled' to='basket'>
                                        <div>
                                            <Image width={30} height={30} src={trashBin}/>
                                        </div>
                                        Корзина
                                    </Link>
                                </Nav>
                            }
                        </div>
                    </div>
                </Container>

            </nav>
    );
};

export default Header;