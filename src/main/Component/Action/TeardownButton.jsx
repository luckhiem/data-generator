import React, { useContext } from 'react';
import { ProfileContext } from '../../Layout/app';
import { ipcRenderer } from 'electron';
import { Button } from 'antd';

const TeardownButton = (rowProfileId) => {
    const { profiles, setProfiles } = useContext(ProfileContext);
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
                    window.localStorage.setItem('profiles', JSON.stringify(newProfileRes));
                    ipcRenderer.removeListener('reply-request-teardown', listener);
                };
                ipcRenderer.on('reply-request-teardown', listener);
            }}>
            Teardown</Button>
    )
}

export default TeardownButton