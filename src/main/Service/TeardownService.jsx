import { useContext } from 'react';
import { ProfileContext } from '../Layout/app';
import { ipcRenderer } from 'electron';

const TeardownService = (rowProfileId) => {
    // const { profiles, setProfiles } = useContext(ProfileContext);
    // let index;
    // let arg = {
    //     domain: '',
    //     username: '',
    //     password: '',
    //     profileId: '',
    //     generateConfig: '',
    //     configApp: '',
    //     configSpace: ''

    // }
    // const newProfile = [...profiles];
    // profiles.forEach((item, i) => {
    //     if (rowProfileId === item.profileId) {
    //         index = i;
    //         newProfile[i].status = 'PROCESSING';
    //     }
    // });
    // setProfiles(newProfile);
    // console.log('newProfile', newProfile)
    // arg.domain = newProfile[index].domain;
    // arg.username = newProfile[index].username;
    // arg.password = newProfile[index].password;
    // arg.profileId = newProfile[index].profileId;
    // arg.generateConfig = newProfile[index].generateConfig;
    // arg.configApp = newProfile[index].configApp;
    // arg.configSpace = newProfile[index].configSpace;
    ipcRenderer.send('request-teardown', arg);
    const listener = (event, response) => {
        // const newProfile = [...profiles];
        // profiles.forEach((item, i) => {
        //     if (rowProfileId === item.profileId) {
        //         newProfile[i].status = response.status;
        //         newProfile[i].config = response.config;
        //         newProfile[i].log = response.log;
        //     }
        // });
        // setProfiles(newProfile);
        console.log('request-teardown-res', response)
        ipcRenderer.removeListener('reply-request-teardown', listener);
    };
    ipcRenderer.on('reply-request-teardown', listener);
}

export default TeardownService