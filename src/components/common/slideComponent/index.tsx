import { CourseType } from '@/src/services/courseService'
import SlideCard from '../slideCard'
//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'


interface props {
    course?: CourseType[]
}

const SlideComponent = ({ course }: props) => {
    return (
        <>
            <div className='d-flex flex-column align-items-center py-4'>
                <Splide
                    options={{
                        type: "loop",
                        perPage: 4,
                        perMove: 1,
                        pagination: false,
                        width: 1200
                    }}
                >
                    {course?.map((course) => (
                        <SplideSlide key={course.id}>
                            <SlideCard course={course} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}

export default SlideComponent