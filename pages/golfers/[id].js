import useUserScores from '../../lib/useUserScores'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useUserName from '../../lib/useUserName'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


const UserScores = () => {
  const router = useRouter()
  const { id } = router.query
  const { name, error: errorUser } = useUserName(id)
  const { scores, error: errorScores } = useUserScores(id)
  const [ text, setText ] = useState( "  doesn't have any scores yet!")

  useEffect(() => {
    if (scores && scores.length > 0) {
      setText('  scores:')
    }
  }, [ scores ])

  return (
    <Layout>
      <>
        { errorUser ? (
          errorUser.message.errors
        ) : (errorScores ? (
          errorScores
        ) : (
          <>
            { name && <h1>{name} {text}</h1>}
            { scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                numberOfHoles={score.number_of_holes}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={score.user_name}
              />
            ))}
          </>
        ))}
      </>
    </Layout>
  )
}

export default UserScores
