import styles from '../../styles/course.module.scss'
import Head from "next/head";
import HeaderAuth from '@/src/components/common/headerAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import courseService, { CourseType } from '@/src/services/courseService';
import { Container, Button } from 'reactstrap';
import PageSpinner from '@/src/components/common/spinner';
import EpisodeList from '@/src/components/episodeList';
import Footer from '@/src/components/common/footer';

const CoursePage = () => {
    const [course, setCourse] = useState<CourseType>()
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!sessionStorage.getItem('onebitflix-token')) {
            router.push('/login')
        } else {
            setLoading(false)
        }
    }, [])

    const getCourse = async () => {
        if (typeof id !== 'string') return

        const res = await courseService.getEpisodes(id)
        if (res.status === 200) {
            setCourse(res.data)
            setLiked(res.data.liked)
            setFavorited(res.data.favorited)
        }
    }

    useEffect(() => {
        getCourse()
    }, [id])

    const handleLikeCourse = async () => {
        if (typeof id !== 'string') return

        if (liked === true) {
            await courseService.removeLike(id)
            setLiked(false)
        } else {
            await courseService.addLike(id)
            setLiked(true)
        }
    }

    const handleFavCourse = async () => {
        if (typeof id !== 'string') return

        if (favorited === true) {
            await courseService.removeFromFav(id)
            setFavorited(false)
        } else {
            await courseService.addToFav(id)
            setFavorited(true)
        }
    }


    if (loading) {
        return <PageSpinner />
    }

    if (course === undefined) return <PageSpinner />

    return (
        <>
            <Head>
                <title>Onebitflix - {course?.name}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div style={{
                    backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),
	                url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "550px"
                }}>
                    <HeaderAuth />
                </div>
                <Container className={styles.courseInfo}>
                    <p className={styles.title}>{course?.name}</p>
                    <p className={styles.description}>{course?.synopsis}</p>
                    <Button outline className={styles.btn} disabled={course?.episodes?.length === 0 ? true : false}>
                        ASSISTIR AGORA!
                        <img src="/buttonPlay.svg" alt="buttonImg" className={styles.btnImg} />
                    </Button>
                    <div className={styles.interactions}>
                        {liked === false ?
                            (
                                <img src="/course/iconLike.svg" alt="likeImg" className={styles.interactionsImg} onClick={handleLikeCourse} />
                            ) : (
                                <img src="/course/iconLiked.svg" alt="likedImg" className={styles.interactionsImg} onClick={handleLikeCourse} />
                            )
                        }
                        {favorited === false ?
                            (
                                <img src="/course/iconAddFav.svg" alt="favImg" className={styles.interactionsImg} onClick={handleFavCourse} />
                            ) : (
                                <img src="/course/iconFavorited.svg" alt="favImg" className={styles.interactionsImg} onClick={handleFavCourse} />
                            )}

                    </div>
                </Container>
                <Container className={styles.episodeInfo}>
                    <p className={styles.episodeDivision}>EPISÓDIOS</p>
                    <p className={styles.episodeLength}>{course?.episodes?.length} episódios</p>
                    {course?.episodes?.length === 0 ? (
                        <p><strong>Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;</strong></p>
                    ) : (
                        course?.episodes?.map((episode) => (
                            <EpisodeList key={episode.id} episode={episode} course={course} />
                        ))
                    )}
                </Container>
                <Footer></Footer>
            </main>
        </>
    );
};

export default CoursePage;