

import React from 'react';
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
recognition.interimResults = false




class Speech extends Component {

    constructor(fieldLabel) {
        super()
        this.toggleListen = this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
        this.state = {
            listening: false,
            TextFieldId: ''

        }

    }

    toggleListen(newTextFieldId) {
        this.setState({
            listening: !this.state.listening,
            TextFieldId: newTextFieldId
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
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
            }


            //-------------------------COMMANDS------------------------------------

            const transcriptArr = finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3, -1)
            textFieldChanger(this.state.TextFieldId, finalTranscript)

            if (stopCmd[0] === 'stop' && stopCmd[1] === 'recording') {
                recognition.stop()
                this.setState({ listening: false })
                recognition.onend = () => {
                    console.log('Stopped listening per command.')

                    const finalText = transcriptArr.slice(0, -3).join(' ')
                    textFieldChanger(this.state.TextFieldId, finalText)
                }
            }
        }

        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
        }

        function textFieldChanger(id, result) {
            document.getElementById(id).value = result
        }

    }

    render() {
        return (

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
                            <TextField id='HeightTextId' label="Height"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => this.toggleListen('HeightTextId')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                        <GridCell span={1}></GridCell>
                        <GridCell span={5}>
                            <TextField id='WeightTextId' label="Weight"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => this.toggleListen('WeightTextId')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                        <GridCell span={1}></GridCell>
                    </GridRow>
                    <GridRow style={{ "paddingBottom": "20px" }}>
                        <GridCell span={6}>
                            <TextField id='AgeTextId' label="Age"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => this.toggleListen('AgeTextId')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>

                        <GridCell span={6}>
                            <TextField id='AdministrationTextId' label="Administration Type"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => this.toggleListen('AdministrationTextId')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                    </GridRow>
                    <GridRow style={{ "paddingBottom": "20px" }}>
                        <GridCell span={12}>
                            <TextField fullwidth id='MedicationTypeTextId' label="Medication Type"
                                trailingIcon={{
                                    icon: <CloseIcon />,
                                    tabIndex: 0,
                                    onClick: () => console.log('Clear')
                                }}
                            />
                        </GridCell>
                        <GridCell>
                            <IconButton onClick={() => this.toggleListen('MedicationTypeTextId')}>
                                <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
                            </IconButton>
                        </GridCell>
                    </GridRow>
                    <GridRow>
                        <GridCell span={4} >
                            {/* <Button outlined unelevated style={{ "float": "left", "clear": "none" }}>
                                <div style={{ "float": "left", "width": "80%" }}><Typography use={'headline6'}>Record:</Typography></div>
                                <div style={{ "float": "right", "width": "15%", "paddingTop": "3px" }}><Mic /></div>
                            </Button> */}
                        </GridCell>
                        <GridCell span={5} />
                        <GridCell span={3}>
                            <Button outlined ripple>Confirm</Button>
                        </GridCell>
                    </GridRow>
                </Grid>
            </Card>
        )
    }
}


export function Form() {
    return (
        <FormField className='App-header'>
            <Speech />
        </FormField>
    )
}
