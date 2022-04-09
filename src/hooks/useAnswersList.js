import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useAnswersList = (videoID) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        async function fetchVideos() {
            // database related works
            const db = getDatabase();
            const answerRef = ref(db, "answers/" + videoID + "/questions");
            const answerQuery = query(
                answerRef,
                orderByKey(),

            );

            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(answerQuery)
                setLoading(false)
                if (snapshot.exists()) {
                    setAnswers((prevAnswer) => {
                        return [...prevAnswer, ...Object.values(snapshot.val())]
                    })
                } else {

                }
            } catch (err) {
                console.log(err)
                setLoading(false);
                setError(true);

            }
        }
        setTimeout(() => {
            fetchVideos()
        }, 2000)
    }, [videoID])

    return {
        loading,
        error,
        answers,

    }
}

export default useAnswersList