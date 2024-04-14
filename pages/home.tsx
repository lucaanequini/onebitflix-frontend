import Head from "next/head"
import HeaderAuth from "@/src/components/common/headerAuth"

const HomeAuth = () => {
    return (
        <>
            <Head>
                <title>OneBitFlix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderAuth></HeaderAuth>
            </main>
        </>
    )
}

export default HomeAuth