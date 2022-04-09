import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useQuizList = (videoID) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function fetchVideos() {
            // database related works
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoID + "/questions");
            const quizQuery = query(
                quizRef,
                orderByKey(),

            );

            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(quizQuery)
                setLoading(false)
                if (snapshot.exists()) {
                    setQuestions((prevQuestion) => {
                        return [...prevQuestion, ...Object.values(snapshot.val())]
                    })
                } else {

                }
            } catch (err) {
                console.log(err)
                setLoading(false);
                setError(true);

            }
        }
        fetchVideos()
    }, [videoID])

    return {
        loading,
        error,
        questions,

    }
}

export default useQuizList