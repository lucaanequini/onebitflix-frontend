import Head from "next/head"
import HeaderAuth from "@/src/components/common/headerAuth"
import FeaturedSection from "@/src/components/homeAuth/featuredSection"
import Footer from '@/src/components/common/footer'
import NewestCategory from "@/src/components/homeAuth/newestCategory"

const HomeAuth = () => {
    return (
        <>
            <Head>
                <title>OneBitFlix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <FeaturedSection></FeaturedSection>
                <NewestCategory></NewestCategory>
            </main>
        </>
    )
}

export default HomeAuth