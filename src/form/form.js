

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
            TextFieldId: '',
            listenAll: false,
            textFields: [
                {
                    id:'HeightTextId', placeholder:'Height'
                },
                {
                    id:'WeightTextId', placeholder:'Weight'
                },
                {
                    id:'AgeTextId', placeholder:'Age'
                },
                {
                    id:'AdministrationTextId', placeholder:"Administration Type"
                },
                {
                    id:'MedicationTypeTextId', placeholder:'Medication Type'
                }
            ]
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
            if (this.state.listenAll) {
                let values = finalTranscript.split("is")
                if (values.length > 1) {
                    values = values.slice(1, values.length)
                    console.log(values)
                    values.forEach((value, index) => {
                        let newValue = value.split(' ')[1]
                        console.log(newValue)
                        if (this.state.textFields[index] != null) textFieldChanger(this.state.textFields[index].id, newValue)
                    })
                }
            } else {
                textFieldChanger(this.state.TextFieldId, finalTranscript)
            }
            const transcriptArr = finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3, -1)


            if (stopCmd[0] === 'stop' && stopCmd[1] === 'recording') {
                recognition.stop()
                this.setState({ listening: false, listenAll: false })
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
            if (id != null && document.getElementById(id) != null) document.getElementById(id).value = result
        }

    }

    render() {
        return (

            <Card style={{"width": "60%"}}>
                <Grid style={{"width": "100%"}}>
                    <GridRow style={{ "paddingBottom": "10px" }}>
                        <GridCell span={12} >
                            <Typography use={"headline4"}>Patient X</Typography>
                            <div className={"mdc-list-divider"} />
                        </GridCell>
                    </GridRow>
                    <GridRow style={{ "paddingBottom": "30px" }}>
                        <GridCell span={12}>
                            <Button
                                outlined unelevated
                                label={<Typography use={"headline6"}>Start Recording</Typography>}
                                icon={<Mic/>}
                                style={{"width":"100%"}}
                                onClick={() => {
                                    this.setState({listenAll: !this.state.listenAll});
                                    this.toggleListen('')
                                }}
                            />
                        </GridCell>
                    </GridRow>

                    {
                        this.state.textFields.map(({id, placeholder}) => {
                            return (
                                <GridRow style={{ "paddingBottom": "50px" }}>
                                    <GridCell span={12}>
                                        <InputField id={id} placeholder={placeholder} toggleListen={this.toggleListen} />
                                    </GridCell>
                                </GridRow>
                            )
                        })
                    }
                    <GridRow>
                        <GridCell span={9} />
                        <GridCell span={3}>
                            <Button outlined ripple>Confirm</Button>
                        </GridCell>
                    </GridRow>
                </Grid>
            </Card>
        )
    }
}

function InputField({id, placeholder, toggleListen}) {
    return (
        <TextField
            fullwidth
            id={id}
            placeholder={placeholder}
            trailingIcon={{
                icon: <MicButton toggleListen={() => {
                    toggleListen(id)
                }}/>,
                tabIndex: 0,
                onClick: () => console.log('Clear')
            }}
        />
    )
}

function MicButton({toggleListen}) {
    return (
        <IconButton onClick={() => toggleListen()}>
            <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
        </IconButton>
    )
}


export function Form() {
    return (
        <FormField className='App-header'>
            <Speech />
        </FormField>
    )
}
