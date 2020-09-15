import React, { useContext } from 'react';
import { ProfileContext, HistoryContext } from '../../../Layout/app';
import { ipcRenderer } from 'electron';
import { Button } from 'antd';

const TeardownButton = (rowProfileId) => {
    const { profiles, setProfiles } = useContext(ProfileContext);
    const { history, setHistory } = useContext(HistoryContext);
    let newHistory = [...history];
    let timeRunning = new Date().toLocaleString();

    return (
        <Button
            key="3"
            type="submit"
            danger
            style={{ marginRight: '5px' }}
            onClick={() => {
                let index;
                let arg = {
                    domain: '',
                    username: '',
                    password: '',
                    config: ''

                }
                const historyValue = {
                    time: '',
                    status: '',
                    profileId: '',
                    profileName: '',
                    operation: 'Teardown data'
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
                arg.config = newProfile[index].config;
                ipcRenderer.send('request-teardown', arg);
                const listener = (event, response) => {
                    const newProfileRes = [...profiles];
                    profiles.forEach((item, i) => {
                        if (rowProfileId.rowProfileId === item.profileId) {
                            newProfileRes[i].status = response.status;
                            newProfileRes[i].config = null;
                            newProfileRes[i].log = null;
                        }
                    });
                    setProfiles(newProfileRes);
                    historyValue.status = response.status;
                    historyValue.profileId = rowProfileId.rowProfileId;
                    historyValue.profileName = newProfile[index].name;
                    historyValue.time = timeRunning;
                    newHistory = [...history, historyValue];
                    setHistory(newHistory);
                    window.localStorage.setItem('profiles', JSON.stringify(newProfileRes));
                    window.localStorage.setItem('history', JSON.stringify(newHistory));
                    ipcRenderer.removeListener('reply-request-teardown', listener);
                };
                ipcRenderer.on('reply-request-teardown', listener);
            }}>
            Teardown</Button>
    )
}

export default TeardownButton