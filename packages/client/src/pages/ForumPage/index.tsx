import { Background } from '@/components/background'
import { Button } from '@/components/button'
import { Paper } from '@/components/paper'
import { Space } from '@/components/space'
import { Typography } from '@/components/typography'
import { TopicItem } from './TopicItem'

import styles from './styles.module.css'

const list = [
  { id: 1, name: '34lldks', comments: 32_423 },
  { id: 2, name: '34lldks', comments: 32_423 },
  { id: 3, name: '34lldks', comments: 32_423 },
  { id: 4, name: '34lldks', comments: 32_423 },
  { id: 5, name: '34lldks', comments: 32_423 },
  { id: 6, name: '34lldks', comments: 32_423 },
]

const ForumPage = () => {
  return (
    <Background>
      <Space gap="40px" className={styles.container}>
        <Typography tag="h1" fontSize="xxl" align="center">
          Forum
        </Typography>

        <Paper>
          <Space gap="32px" className={styles.topics}>
            <Space gap="24px" className={styles.topicList}>
              {list.map(({ id, name, comments }) => (
                <TopicItem
                  key={id}
                  topicName={name}
                  commentsNumber={comments}
                />
              ))}
            </Space>

            <Button color="orange">Новый топик</Button>
          </Space>
        </Paper>

        <Button>Back</Button>
      </Space>
    </Background>
  )
}

export default ForumPage
