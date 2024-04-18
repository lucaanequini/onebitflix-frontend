import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from 'swr'
import courseService from '@/src/services/courseService'
import SlideComponent from '../../common/slideComponent'
import PageSpinner from '../../common/spinner'

const FeaturedCategory = () => {
    const { data, error } = useSWR('/featured', courseService.getFeaturedCourses)

    if (error) return error
    if (!data) {
        return <PageSpinner />
    }

    return (
        <>
            <p className={styles.title}>EM DESTAQUE</p>
            <SlideComponent course={data.data} />
        </>
    )
}

export default FeaturedCategory