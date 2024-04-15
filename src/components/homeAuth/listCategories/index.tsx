import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from 'swr'
import categoriesService from '@/src/services/categoriesService'
import { CategoryType } from '@/src/services/categoriesService'
import ListCategoriesSlide from '../listCategoriesSlide'

const CategoryList = () => {
    const { data, error } = useSWR('/listCategories', categoriesService.getCategories)

    if (error) return error
    if (!data) return (<p>Loading...</p>)
    return (
        <>
            {data.data.categories?.map((category: CategoryType) => (
                <ListCategoriesSlide key={category.id} categoryId={category.id} categoryName={category.name} />
            ))}
        </>
    )
}

export default CategoryList