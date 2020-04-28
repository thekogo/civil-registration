import React,{ useState, useEffect} from 'react'
import { Row, Col, Table, Button, Select } from 'antd'
import firebase from '../api/firebase'
import logo from '../image/logo.jpg'

let filters = [...Array(43).keys()];

const { Option } = Select

function SuccessComponent() {

    const [loading, setLoading] = useState(true)
    const [filteredInfo, setFilteredInfo] = useState([])

    const [users, setUsers] = useState({})
    const columns = [
        {
            title: 'ลำดับที่',
            key: 'index',
            render: (text, record, index) => index+1,
        },
        {
            title:'รุ่น',
            dataIndex: 'generation',
            filters: filters.map( (value) => {
                return ({
                    text: (value+1).toString(),
                    value: (value+1),
                })
            }),
            filteredValue: filteredInfo || null,
            onFilter: (value, record) => record.generation === value,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.generation - b.generation,
            ellipsis: true,
        },
        {
            title:'ชื่อ',
            dataIndex: 'firstname',
            key: 'firstname'
        },
        {
            title:'นามสกุล',
            dataIndex: 'lastname',
            key: 'lastname'
        },
        {
            title:'ชื่อเล่น',
            dataIndex: 'nickname',
            key: 'nickname'
        },
        {
            title:'เบอร์โทร',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title:'Line ID',
            dataIndex: 'line',
            key: 'line'
        },
    ]

    useEffect( () => {
        const db = firebase.database()
        const userRef = db.ref("users/")
        userRef.once("value", function(snapshot) {
            let arrUsers = Object.values(snapshot.val())
            setUsers(arrUsers)
            setLoading(false)
            console.log(arrUsers)
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code)
          });
    }, [])

    const changeFilter = value => {
        if(value != "") {
            setFilteredInfo([value])
        } else {
            setFilteredInfo(null)
        }
        console.log(value)
    }

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters.generation)
      };
    
    if(loading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div style={{backgroundColor: 'rgb(239, 239, 239', backgroundSize:'100%'}}>
                <Row style={{paddingTop:'20px', paddingBottom: '50px'}}>
                    <Col span={18} offset={3} style={{backgroundColor: 'white'}}>
                        <img src={logo} style={{width:'100%'}} alt="logo civil"/>
                        <h1 className="title">ทำเนียบรุ่นศิษย์เก่าโยธาตีนดอย</h1>
                        <h2 style={{display:"block", textAlign:"center"}}>จำนวนผู้ลงทะเบียน {users.length} คน</h2>
                        <div className="center">
                            <br />
                            <Button type="primary" href="/" >กลับไปหน้าลงทะเบียน</Button>
                        </div>
                        <div className="center">
                            <br />
                            <h2>รุ่น</h2>
                            <Select style={{width: '120px', marginLeft: '10px'}} onChange={changeFilter} defaultValue="">
                                <Option value="">ทั้งหมด</Option>
                                { filters.map( (value) => (
                                    <Option key={value+1} value={(value+1).toString()}>{value+1}</Option>
                                )) }
                            </Select>
                        </div>
                        <br />
                        <Table 
                            dataSource={users} 
                            columns={columns} 
                            onChange={handleChange} 
                            pagination={{ position: ['bottomCenter'] }}
                        />;
                    </Col>
                </Row>
            </div>
        )
    }

}

export default SuccessComponent