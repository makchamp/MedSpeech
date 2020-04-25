
'use strict'
import React, { useState } from 'react';
import '@rmwc/button/styles';
import '@rmwc/textfield/styles';
import { TextField } from '@rmwc/textfield';
import '@rmwc/icon/styles';
import { FormField } from '@rmwc/formfield';
import '@rmwc/formfield/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, GridRow, GridCell } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { Card } from "@rmwc/card";
import '@rmwc/card/styles';
import './form.css';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import '@rmwc/list/styles'

import '@rmwc/button/styles';
import { Button } from '@rmwc/button';

import Mic from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';



import { Component } from 'react';
// import SpeechRecognition from 'react-speech-recognition'






const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'en-US'
//To increase accuracy interimResults can be set to false
recognition.interimResults = true




class Speech extends Component {

    constructor() {
        super()
        this.toggleListen = this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
        this.state = {
            listening: false,
        }

    }
    toggleListen() {
        console.log('yo');
        this.setState({
            listening: !this.state.listening
        }, this.handleListen)
    }

    handleListen() {

        console.log('listening?', this.state.listening)

        if (this.state.listening) {
            recognition.start()
            recognition.onend = () => {
                console.log("...continue listening...")
                recognition.start()
            }

        } else {
            recognition.stop()
            recognition.onend = () => {
                console.log("Stopped listening per click")
            }
        }

        recognition.onstart = () => {
            console.log("Listening!")
        }

        let finalTranscript = ''
        recognition.onresult = event => {
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interimTranscript += transcript;
            }
            document.getElementById('YAYAYACOCOJUMBO').innerHTML = interimTranscript
            // document.getElementById('final').innerHTML = finalTranscript

            //-------------------------COMMANDS------------------------------------

            const transcriptArr = finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3, -1)
            console.log('stopCmd', stopCmd)

            if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
                recognition.stop()
                recognition.onend = () => {
                    console.log('Stopped listening per command')
                    const finalText = transcriptArr.slice(0, -3).join(' ')
                    document.getElementById('YAYAYACOCOJUMBO').innerHTML = finalText
                }
            }
        }

        //-----------------------------------------------------------------------

        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
        }

    }

    render() {
        return (
            <div>
                <IconButton onClick={this.toggleListen}>
                    <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                </IconButton>
                <p id="YAYAYACOCOJUMBO"> yeyho</p>
            </div>

        )
    }
}


export function Form() {
    const [sp, setSp] = useState(new Speech());
    console.log(sp);
    return (

        <FormField className='App-header'>
            <Speech />
            <Card>
                <Grid>
                    <GridRow style={{ "paddingBottom": "30px" }}>
                        <GridCell span={12} >
                            <div use={"headline4"}>Patient X</div>
                            <div className={"mdc-list-divider"} />

                        </GridCell>
                    </GridRow>
                    <GridRow style={{ "paddingBottom": "20px" }}>
                        <GridCell span={5}>
                            <TextField label="Height"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => console.log('mic for height is clicked')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                        <GridCell span={1}></GridCell>
                        <GridCell span={5}>
                            <TextField label="Weight"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => console.log('mic for weight clicked')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                        <GridCell span={1}></GridCell>
                    </GridRow>
                    <GridRow style={{ "paddingBottom": "20px" }}>
                        <GridCell span={6}>
                            <TextField label="Age"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => console.log('mic for age clicked')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>

                        <GridCell span={6}>
                            <TextField label="Administration Type"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => console.log('mic for administration type clicked')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                    </GridRow>
                    <GridRow style={{ "paddingBottom": "20px" }}>
                        <GridCell span={12}>
                            <TextField fullwidth label="Medication Type"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => console.log('mic for medication type clicked')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                    </GridRow>
                    <GridRow>
                        <GridCell span={4} >
                            <Button outlined unelevated style={{ "float": "left", "clear": "none" }}>
                                <div style={{ "float": "left", "width": "80%" }}><Typography use={'headline6'}>Record:</Typography></div>
                                <div style={{ "float": "right", "width": "15%", "paddingTop": "3px" }}><Mic /></div>
                            </Button>
                        </GridCell>
                        <GridCell span={5} />
                        <GridCell span={3}>
                            <Button outlined ripple>Confirm</Button>
                        </GridCell>
                    </GridRow>
                </Grid>
            </Card>
        </FormField>
    )
}
