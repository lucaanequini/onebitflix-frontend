import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from 'swr'
import categoriesService from '@/src/services/categoriesService'
import SlideComponent from '../../common/slideComponent'
import PageSpinner from '../../common/spinner'

interface props {
    categoryId: number
    categoryName: string
}

const ListCategoriesSlide = ({ categoryId, categoryName }: props) => {
    const { data, error } = useSWR(`/categoriesCourses/${categoryId}`, () => categoriesService.getCourses(categoryId))

    if (error) return error
    if (!data) {
        return <PageSpinner />
    }
    return (
        <>
            <p className={styles.title}>{categoryName}</p>
            <SlideComponent course={data.data.courses}></SlideComponent>
        </>
    )
}

export default ListCategoriesSlide