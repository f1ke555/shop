import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            Страница не найдена. Перейдите на <Link to=''>главную страницу</Link>
        </div>
    );
};

export default NotFoundPage;