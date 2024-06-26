import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from 'swr'
import courseService from '@/src/services/courseService'
import SlideComponent from '../../common/slideComponent'
import PageSpinner from '../../common/spinner'

const FavoriteCategory = () => {
    const { data, error } = useSWR('/favorites', courseService.getFavs)

    if (error) return error
    if (!data) {
        return <PageSpinner />
    }
    return (
        <>
            <p className={styles.title}>MINHA LISTA</p>
            {data.data.courses.length >= 1 ? (
                <SlideComponent course={data.data.courses} />
            ) : (
                <p className='text-center pt-3'> <strong>Você não tem nenhum curso na lista de favoritos</strong></p>
            )}
        </>
    )
}

export default FavoriteCategory