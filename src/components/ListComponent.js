import React from 'react'
import { Row, Col } from 'antd'

function SuccessComponent() {

    return (
        <div style={{backgroundColor: 'rgb(239, 239, 239', backgroundSize:'100%'}}>
            <Row style={{paddingTop:'20px', paddingBottom: '50px'}}>
                <Col span={18} offset={3} style={{backgroundColor: 'white'}}>
                    <img src={logo} style={{width:'100%'}} alt="logo civil"/>
                    <h1 className="title">ทำเนียบรุ่นศิษย์เก่าโยธาตีนดอย</h1>
                    
                </Col>
            </Row>
        </div>
    )
}

export default SuccessComponent