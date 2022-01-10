import { useState } from 'react'

import BlockEntry from '@components/entry/block'
import styles from './posts-list.module.css'
import type { Post } from '@lib/types'

type Props = {
  posts: Post[]
  paginate?: boolean
  showDescription?: boolean
}

const Posts = ({ posts, paginate, showDescription }: Props) => {
  const [showMore, setShowMore] = useState(4)

  return (
    <ul className={styles.container}>
      {posts.slice(0, paginate ? showMore : undefined).map((post) => {
        const date = new Date(post.date).toLocaleDateString('default', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        })

        return (
          <BlockEntry
            key={`post-item-${post.slug}`}
            href={`/blog/${post.slug}`}
            title={post.title}
            type={date}
            as={`/blog/${post.slug}`}
            description={showDescription ? post.description : undefined}
          />
        )
      })}
      {paginate && showMore < posts.length && (
        <button
          onClick={() => {
            setShowMore(showMore + 4)
          }}
          className={styles.button}
        >
          Show More
        </button>
      )}
    </ul>
  )
}

export default Posts
