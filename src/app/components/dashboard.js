import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui';

class Dashboard extends Component {

    render() {
        return (
            <Tabs>
                <Tab label="Acceptane criteria" >
                    <div>
                        <h2>Tab One</h2>
                        <p>
                            This is an example tab.
                        </p>
                        <p>
                            You can put any sort of HTML or react component in here. It even keeps the component state!
                        </p>
                    </div>
                </Tab>
                <Tab label="Test plan" >
                    <div>
                        <h2>Tab Two</h2>
                        <p>
                            This is another example tab.
                        </p>
                    </div>
                </Tab>
                <Tab label="Progress">
                    <div>
                        <h2>Tab Three</h2>
                        <p>
                            This is a third example tab.
                        </p>
                    </div>
                </Tab>
                <Tab label="Release plan">
                    <div>
                        <h2>Tab Three</h2>
                        <p>
                            This is a third example tab.
                        </p>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}
export default Dashboard;
