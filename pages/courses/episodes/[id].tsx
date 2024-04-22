import { useRouter } from "next/router";
import styles from "../../../styles/episodes.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import React, { useEffect, useRef, useState } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import PageSpinner from "@/src/components/common/spinner";
import { Container, Button } from "reactstrap";
import ReactPlayer from "react-player";
import Footer from "@/src/components/common/footer";
import watchEpisodeService from "@/src/services/episodeService";

const EpisodePage = function () {
    const [course, setCourse] = useState<CourseType>()
    const [getEpisodeTime, setGetEpisodeTime] = useState(0)
    const [episodeTime, setEpisodeTime] = useState(0)
    const [isReady, setIsReady] = useState(false)

    const router = useRouter()

    const episodeOrder = parseFloat(router.query.id?.toString() || '')
    const episodeId = parseFloat(router.query.episodeid?.toString() || '')
    const courseId = router.query.courseid?.toString() || ''

    const playerRef = useRef<ReactPlayer>(null)

    const handleGetEpisodeTime = async () => {
        const res = await watchEpisodeService.getWatchTime(episodeId)

        if (res.data !== null) {
            setGetEpisodeTime(res.data.seconds)
        }
    }

    const handleSetEpisodeTime = async () => {
        await watchEpisodeService.setWatchTime({
            episodeId,
            seconds: Math.round(episodeTime)
        })
    }

    const handlePlayerTime = () => {
        playerRef.current?.seekTo(getEpisodeTime)
        setIsReady(true)
    }

    if (isReady === true) {
        setTimeout(() => {
            handleSetEpisodeTime()
        }, 1000 * 3)
    }

    useEffect(() => {
        handleGetEpisodeTime()
    }, [router])

    const getCourseId = async () => {
        if (typeof courseId !== 'string') return

        const res = await courseService.getEpisodes(courseId)

        if (res.status === 200) {
            setCourse(res.data)
        }
    }

    const handleLastEpisode = () => {
        router.push(`/courses/episodes/${episodeOrder - 1}?courseid=${course?.id}&episodeid=${episodeId - 1}`)
    }

    const handleNextEpisode = () => {
        router.push(`/courses/episodes/${episodeOrder + 1}?courseid=${course?.id}&episodeid=${episodeId + 1}`)
    }

    useEffect(() => {
        getCourseId()
    }, [courseId])

    if (course?.episodes === undefined) return <PageSpinner />

    if (episodeOrder + 1 < course?.episodes?.length) {
        if (Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong) {
            handleNextEpisode()
        }
    }

    return (
        <>
            <Head>
                <title>Onebitflix - {course.episodes[episodeOrder].name}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric logoUrl="/home" btnContent="Voltar para o curso" btnUrl={`/courses/${courseId}`} />
                <Container className="d-flex flex-column align-items-center gap-3 pt-5">
                    <p className={styles.title}>{course.episodes[episodeOrder].name}</p>
                    {typeof window === 'undefined' ? null : (
                        <ReactPlayer className={styles.videoPlayer}
                            url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${course.episodes[episodeOrder].videoUrl}&token=${sessionStorage.getItem('onebitflix-token')}`}
                            controls ref={playerRef} onStart={handlePlayerTime} onProgress={(progress) => { setEpisodeTime(progress.playedSeconds) }}
                        />
                    )}
                    <div className={styles.episodeBtnDiv}>
                        <Button className={styles.episodeBtn} disabled={episodeOrder === 0 ? true : false} onClick={handleLastEpisode}>
                            <img src="/episode/iconArrowLeft.svg" alt="leftArrow" className={styles.arrowImg} />
                            <p className={styles.textBtn}>Anterior</p>
                        </Button>
                        <Button className={styles.episodeBtn} disabled={episodeOrder + 1 === course.episodes.length ? true : false} onClick={handleNextEpisode}>
                            <p className={styles.textBtn}>Próximo</p>
                            <img src="/episode/iconArrowRight.svg" alt="rightArrow" className={styles.arrowImg} />
                        </Button>
                    </div>
                    <p className='text-center py-4'>{course.episodes[episodeOrder].synopsis}</p>
                </Container>
                <div className='pt-5'>
                    <Footer />
                </div>
            </main>
        </>
    );
};

export default EpisodePage;