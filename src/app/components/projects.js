import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardActions,
    FlatButton,
    CardText,
    Avatar
} from 'material-ui';

class Project extends Component {

    renderReplies() {
        return (
            <CardText expandable={true} style={{paddingTop: '0px', paddingBottom: '0px', paddingLeft: '20px'}}>
                asasasasaSÅ
            </CardText>
        );
    }

    render() {
        return (
            <div className="ticket-item">
                <Card initiallyExpanded={false}>
                    <CardHeader
                        title="Test project x"
                        subtitle="project to test new test software"
                        avatar={<Avatar style={{color: 'green'}}>ATH</Avatar>}
                        showExpandableButton={true}>
                    </CardHeader>
                    <CardText expandable={true}>asdsads sadsdas dasd asdasdasdasd asdasd sadsasad asdsa dsa dsa asd
                    </CardText>
                    {this.renderReplies()}
                    <CardText expandable={true}>
                        <span>Assigend To: <strong>'N/A'</strong></span>
                        <br />
                        <span>Status: <strong>Active</strong></span>
                    </CardText>
                    <CardActions expandable={true}>
                        <FlatButton label="Close"/>
                    </CardActions>
                </Card>
            </div>
        );
    }

}
export default Project;
