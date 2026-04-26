import { useState } from 'react'

export function TwitterFollowCard({ userName, name, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  
 
  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  const buttonClassName = isFollowing 
    ? 'tw-followCard-followButton is-following' 
    : 'tw-followCard-followButton'

    const handleClick = () => {
      setIsFollowing(!isFollowing)
    }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img 
          className='tw-followCard-avatar' 
          alt="El avatar de franco" 
          src={`https://unavatar.io/github/${userName}`}/>
        <div className='tw-followCard-info'>
          <strong> {name} </strong>
          <span className='tw-followCard-infoUsername'>@{userName}</span>
        </div>
      </header>

    <aside>
      <button className={buttonClassName} onClick= {handleClick}>
        {text}
      </button>
    </aside> 
  </article>
  )
}