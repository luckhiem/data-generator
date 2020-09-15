import React, { useContext } from 'react';
import { ProfileContext, HistoryContext } from '../../../Layout/app';
import { ipcRenderer } from 'electron';
import { Button } from 'antd';

const GenerateButton = (rowProfileId) => {
    const { profiles, setProfiles } = useContext(ProfileContext);
    const { history, setHistory } = useContext(HistoryContext);
    let newHistory = [...history];

    return (
        <Button
            key="4"
            type="primary"
            style={{ marginRight: '5px' }}
            onClick={() => {
                let index;
                let arg = {
                    domain: '',
                    username: '',
                    password: '',
                    profileId: '',
                    generateConfig: '',
                    configApp: '',
                    configSpace: ''

                }
                const newProfile = [...profiles];
                profiles.forEach((item, i) => {
                    if (rowProfileId.rowProfileId === item.profileId) {
                        index = i;
                        newProfile[i].status = 'PROCESSING';
                    }
                });
                setProfiles(newProfile);
                arg.domain = newProfile[index].domain;
                arg.username = newProfile[index].username;
                arg.password = newProfile[index].password;
                arg.profileId = newProfile[index].profileId;
                arg.generateConfig = newProfile[index].generateConfig;
                arg.configApp = newProfile[index].configApp;
                arg.configSpace = newProfile[index].configSpace;
                ipcRenderer.send('request-setup', arg);
                const listener = (event, response) => {
                    const newProfileRes = [...profiles];
                    const historyValue = {
                        status: '',
                        profileId: '',
                        profileName: '',
                        operation: 'Generate data'
                    }
                    profiles.forEach((item, i) => {
                        if (rowProfileId.rowProfileId === item.profileId) {
                            newProfileRes[i].status = response.status;
                            newProfileRes[i].config = response.config;
                            newProfileRes[i].log = response.log;
                        }
                    });
                    historyValue.status = response.status;
                    historyValue.profileId = rowProfileId.rowProfileId;
                    historyValue.profileName = newProfile[index].name;
                    newHistory = [...history, historyValue];
                    setProfiles(newProfileRes);
                    setHistory(newHistory);
                    window.localStorage.setItem('profiles', JSON.stringify(newProfileRes));
                    window.localStorage.setItem('history', JSON.stringify(newHistory));
                    ipcRenderer.removeListener('reply-request-setup', listener);
                };
                ipcRenderer.on('reply-request-setup', listener);
            }}>
            Generate</Button>
    )
}

export default GenerateButton