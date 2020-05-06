import React from 'react'
import { Row, Col, Button } from 'antd'
import logo from '../image/logo.jpg'

function SuccessComponent(props) {

    return (
        <div style={{backgroundColor: 'rgb(239, 239, 239', backgroundSize:'100%'}}>
            <Row style={{paddingTop:'20px', paddingBottom: '50px'}}>
                <Col span={18} offset={3} style={{backgroundColor: 'white'}}>
                    <img src={logo} style={{width:'100%'}} alt="logo civil"/>
                    <h1 className="title">ทำเนียบรุ่นศิษย์เก่าโยธาตีนดอย</h1>
                    <div className="center">
                        <Button type="primary" href="/list" >ยอดผู้ลงทะเบียน</Button>
                    </div>
                    <p style={{fontSize:'2em', textAlign:"center", color: 'green'}}>การลงทะเบียนเสร็จสิ้นขอบพระคุณพี่ๆทุกคนครับ</p>
                    <p style={{fontSize:'2em', textAlign:"center", color: 'red'}}>หากต้องการแก้ไขข้อมูลกรุณาแจ้งมาด้วยนะครับ</p>
                </Col>
            </Row>
        </div>
    )
}

export default SuccessComponent