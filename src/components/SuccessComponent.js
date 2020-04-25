import React from 'react'
import { Form, Row, Col, Select, Button, Input, DatePicker, Upload, message } from 'antd'
import logo from '../image/logo.jpg'

function SuccessComponent(props) {

    return (
        <div style={{backgroundColor: 'rgb(239, 239, 239', backgroundSize:'100%'}}>
            <Row style={{paddingTop:'20px', paddingBottom: '50px'}}>
                <Col span={18} offset={3} style={{backgroundColor: 'white'}}>
                    <img src={logo} style={{width:'100%'}} alt="logo civil"/>
                    <h1 className="title">ทำเนียบรุ่นศิษย์เก่าโยธาตีนดอย</h1>
                    <p style={{fontSize:'2em', textAlign:"center", color: 'green'}}>การลงทะเบียนเสร็จสิ้นขอบคุณในความร่วมมือ</p>
                </Col>
            </Row>
        </div>
    )
}

export default SuccessComponent