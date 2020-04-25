import React from 'react'
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

export function Form() {
    return (
        <FormField className='App-header'>
            <Card>
                <Grid>
                    <GridRow style={{ "paddingBottom": "30px" }}>
                        <GridCell span={12} >
                            <Typography use={"headline4"}>Patient X</Typography>
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
                            <IconButton onClick={() => console.log('mic for height clicked')}>
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
