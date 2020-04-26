import React, {useState} from 'react';
import {Form} from './form/form'
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust} from '@rmwc/top-app-bar'
import '@rmwc/top-app-bar/styles';
import '@rmwc/button/styles';
import { Button } from '@rmwc/button';


function App() {
    let [err, setErr] = useState("");
    let errBox = document.getElementById("errorString");
    let formTopBorder = 100; // px
    if (err !== "") formTopBorder = "1000";
    let [formstate, setFormState] = useState(true);


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

            {
                formstate?
                <Form setError={(error) => {setErr(error)}} topPadding={formTopBorder} setFormState={() => setFormState(false)}/>
                : <Confirm onClick={() => setFormState(true)}/>
            }
        </div>
    );
}

function Confirm({onClick}) {
    return (
        <div style={{"text-align": "center", "padding-top": "200px"}}>
            Confirmed! <Button onClick={() => onClick()}>Next Patient?</Button>
        </div>
    )
}

export default App;
