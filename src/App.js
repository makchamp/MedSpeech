import React, {useState} from 'react';
import {Form} from './form/form'
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust} from '@rmwc/top-app-bar'
import '@rmwc/top-app-bar/styles';


function App() {
    let [err, setErr] = useState("")
    let errBox = document.getElementById("errorString")
    let formTopBorder = 100 // px
    if (err !== "") formTopBorder = "1000"


    return (
        <div>
            <TopAppBar>
                <TopAppBarRow>
                    <TopAppBarSection>
                        <TopAppBarTitle>MedSpeech</TopAppBarTitle>
                    </TopAppBarSection>
                </TopAppBarRow>
                {
                    err !== "" ? <div style={{
                            "width": "100%",
                            "background-color": "red",
                            "padding": "10px",
                            "text-align": "center"
                        }} id="errorString">
                            {err}
                        </div>
                        : ""
                }
            </TopAppBar>
            <TopAppBarFixedAdjust/>

            <Form setError={(error) => {setErr(error)}} topPadding={formTopBorder}/>
        </div>
    );
}

export default App;
