import React from 'react'
import HeadlineContainer from '../../../components/AdminComponents/Headline/HeadlineContainer'
import ServiceItemContainer from '../../../components/AdminComponents/ServiceItem/ServiceItemContainer'

function ServicesPresentational() {
    return (
        <div className='p-6 bg-gray-50 shadow-lg'>
            <HeadlineContainer headlineLabel="ادارة الخدمات" buttonLabel="إضافة فئة" buttonIcon="+" />
            <ul className='bg-bg shadow rounded'>
                <ServiceItemContainer />
                <ServiceItemContainer />
                <ServiceItemContainer />
                <ServiceItemContainer />
            </ul>
        </div>
    )
}

export default ServicesPresentational
