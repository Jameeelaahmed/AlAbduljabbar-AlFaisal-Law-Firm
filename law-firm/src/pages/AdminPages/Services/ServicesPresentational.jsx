import React from 'react'
import HeadlineContainer from '../../../components/AdminComponents/Headline/HeadlineContainer'

function ServicesPresentational() {
    return (
        <div className='p-6 bg-gray-50 shadow-lg'>
            <HeadlineContainer headlineLabel="ادارة الخدمات" buttonLabel="إضافة خدمه" buttonIcon="+" />
        </div>
    )
}

export default ServicesPresentational
