import React from 'react';
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {Carousel} from "react-bootstrap";

const CarouselActions = ({database}) => {

    const [actions] = useCollectionData(
        collection(database, 'actions')
    )


    return (
        <Carousel className='pt-5'>
            {actions?.map(action =>
                <Carousel.Item>
                    <img width={1500} height={400} src={action.photoURL}/>
                </Carousel.Item>
            )}
        </Carousel>
    );
};

export default CarouselActions;