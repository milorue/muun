import React from 'react';

const Dog = (props) =>{
    return(
        <div>
            <p>
                My dog Thundric is great. I couldn’t decide between Thunder or Electric. Don’t call him Rick.
            </p>
            <p>
                <button onClick={() => props.history.goBack()}>Back</button>
            </p>
        </div>
        )
}

const Cat = () =>{
    return "MEOW I'm a cat"
}

export {Dog, Cat}