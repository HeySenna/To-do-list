import React from 'react'

const PageNotFound = () =>{
  return (
    <div>
        <h1 className='mt-4 mb-4 text-center'>
            <h1 style={{ color: 'blue'}}>Ops...</h1>
            <img src='https://media.istockphoto.com/id/1404059706/vector/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space.jpg?s=612x612&w=0&k=20&c=DvPAUof9UsNuNqCJy2Z7ZLLk75qDA3bbLXOOW_50wAk=' alt='Not Found'/>
            <br />
            <h1 style ={{ color: 'blue'}}>404 Page Not Found!</h1>
            <h1 style = {{ color: 'blue'}}>Página não Encontrada!</h1>
        </h1>
    </div>
  )
}

export default PageNotFound;