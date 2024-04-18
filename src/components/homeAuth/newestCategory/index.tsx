import useSWR from 'swr'
import courseService from '@/src/services/courseService'
import SlideComponent from '../../common/slideComponent'
import styles from '@/styles/slideCategory.module.scss'
import PageSpinner from '../../common/spinner'

const NewestCategory = () => {
    const { data, error } = useSWR('/newest', courseService.getNewestCourses)

    if (error) return error
    if (!data) {
        return <PageSpinner />
    }

    return (
        <>
            <p className={styles.title}>LANÇAMENTOS</p>
            <SlideComponent course={data.data} />
        </>
    )
}

export default NewestCategory