

import React, { useState } from 'react';
import '@rmwc/button/styles';
import '@rmwc/textfield/styles';
import { TextField } from '@rmwc/textfield';
import '@rmwc/icon/styles';
import { FormField } from '@rmwc/formfield';
import '@rmwc/formfield/styles';

import { Grid, GridRow, GridCell} from '@rmwc/grid';
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

import {Checkbox} from '@rmwc/checkbox';
import '@rmwc/checkbox/styles';



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
            statusColor: '',
            textFields: [
                {
                    id: 'HeightTextId', placeholder: 'Height', isANum: true
                },
                {
                    id: 'WeightTextId', placeholder: 'Weight', isANum: true
                },
                {
                    id: 'AgeTextId', placeholder: 'Age', isANum: true
                },
                {
                    id: 'AdministrationTextId', placeholder: "Administration Type", isANum: true
                },
                {
                    id: 'MedicationTypeTextId', placeholder: 'Medication Type', isANum: false
                }
            ],
            checkBoxes: [
                false, false, false, false, false
            ]
        }

    }

    toggleListen(newTextFieldId) {
        this.setState({
            listening: !this.state.listening,
            TextFieldId: newTextFieldId
        }, this.handleListen)
        document.getElementById("status").innerHTML = "Listening ... "
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
            document.getElementById("status").innerHTML = ""
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
                    values.forEach((value, index) => {
                        let newValue = value.split(' ')[1]
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
                document.getElementById("status").innerHTML = ""
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


            <Card style={{ "width": "50%" }}>
               
                <div id="status" style={{ "color": "red", "fontSize": "24", "text-align": "center", "font-weight": "bold", "paddingTop": "15px" }}></div>
               
                <Grid style={{ "width": "100%" }}>
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
                                icon={<Mic />}
                                style={{ "width": "100%" }}
                                onClick={() => {
                                    this.setState({ listenAll: !this.state.listenAll });
                                    this.toggleListen('')
                                }}
                            />
                        </GridCell>
                    </GridRow>

                    {
                        this.state.textFields.map(({ id, placeholder, isANum }, index) => {
                            return (
                                <GridRow style={{ "paddingBottom": "50px" }}>
                                    <GridCell span={12}>
                                        <Checkbox
                                            style={{"width": "98%"}}
                                            label={
                                                    <GridRow>
                                                        <GridCell span={12}>
                                                            <InputField id={id} placeholder={placeholder} isANum={isANum} toggleListen={this.toggleListen} />
                                                        </GridCell>
                                                    </GridRow>
                                            }
                                            checked={this.state.checkBoxes[index]}
                                            onChange={() => {
                                                this.state.checkBoxes[index] = !this.state.checkBoxes[index]
                                                this.setState({checkBoxes: this.state.checkBoxes})
                                            }}
                                        />
                                    </GridCell>

                                </GridRow>
                            )
                        })
                    }
                    <GridRow>
                        <GridCell span={9} />
                        <GridCell span={3}>
                            <Button
                                outlined ripple
                                style={{"float": "right"}}
                                onClick={() => {
                                    let errorFeedback = getInvalidatedInputs(this.state.textFields)
                                    let checkBoxFeedback = getCheckBoxFeedback(this.state.checkBoxes)
                                    errorFeedback = errorFeedback === "" ? checkBoxFeedback : errorFeedback
                                    this.props.setError(errorFeedback)
                                    if (errorFeedback === "") {
                                        this.props.setFormState()
                                    }
                                }}>
                                Confirm
                            </Button>
                        </GridCell>
                    </GridRow>
                </Grid>
            </Card >
        )
    }
}

function getCheckBoxFeedback(arr) {
    let isAllChecked = arr.reduce((total, value) => {
        return total && value
    })
    if (isAllChecked) {
        return ""
    }
    return "Please have someone verify the values that you have inputted before confirming your submission."
}

function getInvalidatedInputs(arr) {
    let errString = ""
    arr.forEach(({ id, placeholder, isANum }) => {
        let regex = isANum ? /[0-9]*\s*/ : /[A-z]*\s*/

        if (document.getElementById(id).value == null || document.getElementById(id).value === "") {
            errString += placeholder.split("(")[0] + " was not filled out, "
        } else if (!matchesRegex(document.getElementById(id).value, regex)) {
            if (isANum) {
                errString += placeholder.split("(")[0] + " should not include any letters, "
            } else {
                errString += placeholder.split("(")[0] + " should not include any numbers, "
            }
        }
    })
    return errString.slice(0, errString.length - 2)
}

function matchesRegex(value, regex) {
    console.log(value)
    console.log(regex)
    let split = value.split(regex)
    console.log(split)
    if (split.length === 2 && split[0] === "" && split[1] === "") return true;
    return false;
}

function InputField({ id, placeholder, isANum, toggleListen }) {
    return (
        <TextField
            fullwidth
            id={id}
            placeholder={placeholder}
            trailingIcon={{
                icon: <MicButton toggleListen={() => {
                    toggleListen(id)
                }} />,
                tabIndex: 0,
                onClick: () => console.log('Clear')
            }}
            pattern={isANum ? "[0-9]*" : "[A-z]*"}
        />
    )
}

function MicButton({ toggleListen }) {
    return (
        <IconButton onClick={() => toggleListen()}>
            <div style={{ "float": "right", "width": "100%", "height": "100%", "paddingTop": "4px" }}><Mic /></div>
        </IconButton>
    )
}


export function Form({ setError, setFormState }) {
    let [topPadding, setTopPadding] = useState(0)
    return (
        <FormField className='App-header' style={{ "padding-top": topPadding + "px" }}>
            <Speech setError={(error) => {
                setError(error)
                if (error !== "") {
                    setTopPadding(50)
                } else {
                    setTopPadding(0)
                }

            }}
                    setFormState={() => setFormState()}
            />
        </FormField>
    )
}
