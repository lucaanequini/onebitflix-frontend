import Head from "next/head"
import HeaderAuth from "@/src/components/common/headerAuth"
import FeaturedSection from "@/src/components/homeAuth/featuredSection"
import Footer from '@/src/components/common/footer'
import NewestCategory from "@/src/components/homeAuth/newestCategory"
import FavoriteCategory from "@/src/components/homeAuth/favoriteCategory"
import FeaturedCategory from "@/src/components/homeAuth/featuredCategory"
import CategoryList from "@/src/components/homeAuth/listCategories"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PageSpinner from "@/src/components/common/spinner"

const HomeAuth = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!sessionStorage.getItem('onebitflix-token')) {
            router.push('/login')
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <PageSpinner />
    }
    return (
        <>
            <Head>
                <title>OneBitFlix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <FeaturedSection></FeaturedSection>
                <NewestCategory></NewestCategory>
                <FavoriteCategory></FavoriteCategory>
                <FeaturedCategory></FeaturedCategory>
                <CategoryList></CategoryList>
                <Footer></Footer>
            </main>
        </>
    )
}

export default HomeAuth