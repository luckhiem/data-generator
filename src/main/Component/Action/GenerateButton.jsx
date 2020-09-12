import React, { useContext } from 'react';
import { ProfileContext } from '../../Layout/app';
import { ipcRenderer } from 'electron';
import { Button } from 'antd';

const GenerateButton = (rowProfileId) => {
    const { profiles, setProfiles } = useContext(ProfileContext);
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
                ipcRenderer.send('request-to-kintone', arg);
                const listener = (event, response) => {
                    const newProfileRes = [...profiles];
                    profiles.forEach((item, i) => {
                        if (rowProfileId.rowProfileId === item.profileId) {
                            newProfileRes[i].status = response.status;
                            newProfileRes[i].config = response.config;
                            newProfileRes[i].log = response.log;
                        }
                    });
                    setProfiles(newProfileRes);
                    window.localStorage.setItem('profiles', JSON.stringify(newProfileRes));
                    ipcRenderer.removeListener('kintone-reply', listener);
                };
                ipcRenderer.on('kintone-reply', listener);
            }}>
            Generate</Button>
    )
}

export default GenerateButton