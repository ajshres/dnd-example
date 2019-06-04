import * as React from 'react';

const BucketList: any[] = [
    {
        id: 1,
        text: "Bucket 1 Text 1"
    },
    {
        id: 2,
        text: "Bucket 1 Text 2"
    },
    {
        id: 3,
        text: "Bucket 2 Text 1"
    },
    {
        id: 4,
        text: "Bucket 2 Text 2"
    },
]

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            bucket: BucketList
        }
    }
    render() {
        return (
            <div>
                something
            </div>
        )
    }
}