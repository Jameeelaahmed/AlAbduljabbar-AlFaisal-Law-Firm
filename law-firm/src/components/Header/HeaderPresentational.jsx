import { Link } from 'react-router-dom'
import logo1 from '../../assets/Logos/Logo1.png'
import logo2 from '../../assets/Logos/Logo2.png'
function HeaderPresentational() {
    return (
        <div className="p-2 fixed bg-white w-full flex justify-between items-center z-15">
            <div className="flex items-center">
                <img className='w-[50px]' src={logo1} alt="logo1" />
                <img className='w-[50px]' src={logo2} alt="logo2" />
                <p className='font-bold'>العبد الجبار و الفيصل</p>
            </div>
            <ul className='flex justify-around'>
                <li className='p-2'>
                    <Link>
                        <p>الرئيسية</p>
                    </Link>
                </li>
                <li className='p-2'>
                    <Link>
                        <p>من نحن</p>
                    </Link>
                </li>
                <li className='p-2'>
                    <Link>
                        <p>من نحن</p>
                    </Link>
                </li >
                <li className='p-2'>
                    <Link>
                        <p>خدماتنا</p>
                    </Link>
                </li>
                <li className='p-2'>
                    <Link>
                        <p>الأسأله الشائعة</p>
                    </Link>
                </li>
                <li className='p-2'>
                    <Link>
                        <p>اتصل بنا</p>
                    </Link>
                </li>
            </ul>
            <div>
                <Link to='login'>
                    تسجيل دخول
                </Link>
            </div>
        </div>
    )
}

export default HeaderPresentational
