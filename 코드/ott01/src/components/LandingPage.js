import React, {useEffect} from 'react'
import axios from 'axios'

function LandingPage () {

    useEffect(() => {
        axios.get('/movies')
            .then( response => {
                return (
                    <div>
                        {response.data}
                    </div>
                );
            });
    }, [] )
}

export default LandingPage