import React from 'react';
import {Form} from './form/form'
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust} from '@rmwc/top-app-bar'
import '@rmwc/top-app-bar/styles';


function App() {
  return (
      <div>
          <TopAppBar>
              <TopAppBarRow>
                  <TopAppBarSection>
                      <TopAppBarTitle>MedSpeech</TopAppBarTitle>
                  </TopAppBarSection>
              </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />
          <Form/>
      </div>
  );
}

export default App;
