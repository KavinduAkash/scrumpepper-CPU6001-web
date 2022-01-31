import React from "react";
import {Button, Table} from "antd";
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined, SelectOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';


const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        className: 'drag-visible',
    },
    {
        title: 'User Story',
        dataIndex: 'user_story',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
    },
];

const SortableItem = SortableElement(props => <tr {...props} />);
const SortableBody = SortableContainer(props => <tbody {...props} />);

class BacklogTable extends React.Component {

    state = {
        dataSource: [],
    };

    componentDidMount() {
        this.prepareData();
    }

    componentWillUnmount() {
        this.prepareData()
    }

    prepareData = () => {
        let user_stories = this.props.user_stories;
        let data = [];
        if(user_stories!=null && user_stories!='' && user_stories!=undefined) {
            user_stories.map((r, i)=>{
                let obj = {
                    key: i+1,
                    edit: <Button type={'link'}><SelectOutlined /></Button>,
                    user_story: r.title,
                    status: r.statusType,
                    priority: "",
                    index: i
                }
                data.push(obj);
            })
            this.setState({dataSource: data})
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state;
        if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(
                el => !!el,
            );
            this.setState({ dataSource: newData });
        }
    };

    DraggableContainer = props => (
        <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={this.onSortEnd}
            {...props}
        />
    );


    DraggableBodyRow = ({ className, style, ...restProps }) => {
        const { dataSource } = this.state;
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };



    render() {
        const { dataSource } = this.state;
        return (
            <div>
                <Table
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="index"
                    components={{
                        body: {
                            wrapper: this.DraggableContainer,
                            row: this.DraggableBodyRow,
                        },
                    }}
                />
            </div>
        );
    }
}

export default BacklogTable;
