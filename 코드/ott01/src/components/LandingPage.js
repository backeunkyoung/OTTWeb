import React, {useEffect} from 'react';
import axios from 'axios';
import jquery from 'jquery';
import $ from 'jquery';

function LandingPage () {

    useEffect(() => {
        axios.get( '/hello' )
            .then(response => {
                console.log (response.data);
            }
        );

        axios.get( '/movies' )
            .then(response => {
                console.log (response.data);

                return (
                    <div>
                        {response.data}
                    </div>
                )
            }
        );
    }, []);

    return (
        <div>
            LandingPage 랜딩페이지
        </div>
    )
}

export default LandingPage;