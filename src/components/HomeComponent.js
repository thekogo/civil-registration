import React, { useState } from 'react'
import { Form, Row, Col, Select, Button, Input, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import logo from '../image/logo.jpg'
import firebase from '../api/firebase'

const { Option } = Select
const { TextArea } = Input

const province_th = [
    'กรุงเทพฯ',
    'กระบี่',
    'กาญจนบุรี',
    'กาฬสินธุ์',
    'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี',
    'ชัยนาท',
    'ชัยภูมิ',
    'ชุมพร',
    'เชียงใหม่',
    'เชียงราย',
    'ตรัง',
    'ตราด',
    'ตาก',
    'นครนายก',
    'นครปฐม',
    'นครพนม',
    'นครราชสีมา',
    'นครศรีธรรมราช',
    'นครสวรรค์',
    'นนทบุรี',
    'นราธิวาส',
    'น่าน',
    'บึงกาฬ',
    'บุรีรัมย์',
    'ปทุมธานี',
    'ประจวบคีรีขันธ์',
    'ปราจีนบุรี',
    'ปัตตานี',
    'พระนครศรีอยุธยา',
    'พะเยา',
    'พังงา',
    'พัทลุง',
    'พิจิตร',
    'พิษณุโลก',
    'เพชรบุรี',
    'เพชรบูรณ์',
    'แพร่',
    'ภูเก็ต',
    'มหาสารคาม',
    'มุกดาหาร',
    'แม่ฮ่องสอน',
    'ยโสธร',
    'ยะลา',
    'ร้อยเอ็ด',
    'ระนอง',
    'ระยอง',
    'ราชบุรี',
    'ลพบุรี',
    'ลำปาง',
    'ลำพูน',
    'เลย',
    'ศรีสะเกษ',
    'สกลนคร',
    'สงขลา',
    'สตูล',
    'สมุทรปราการ',
    'สมุทรสงคราม',
    'สมุทรสาคร',
    'สระแก้ว',
    'สระบุรี',
    'สิงห์บุรี',
    'สุโขทัย',
    'สุพรรณบุรี',
    'สุราษฎร์ธานี',
    'สุรินทร์',
    'หนองคาย',
    'หนองบัวลำภู',
    'อ่างทอง',
    'อำนาจเจริญ',
    'อุดรธานี',
    'อุตรดิตถ์',
    'อุทัยธานี',
    'อุบลราชธานี',
];


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt6M = file.size / 1024 / 1024 < 6;
    if (!isLt6M) {
      message.error('Image must smaller than 6MB!');
    }
    return isJpgOrPng && isLt6M;
}

function HomeComponent(props) {

    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [dis, setDis] = useState(false)
    const [uploading, setUploading] = useState('')


    const handleSubmit = (values) => {
        setDis(true)
        // Create a root reference
        const file = values['image']['file']['originFileObj']
        var storageRef = firebase.storage().ref('image/' + values.firstname + '_' + values.lastname + file.name);

        const data = {...values}
        Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {});
        


        console.log('Received values of form: ', data);
        console.log(file)
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUploading('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads
          }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
              console.log('File available at', downloadURL);
              delete data['image']; 
              data.imageUrl = downloadURL;
              const db = firebase.database();
              await db.ref("users/").push(data); 
              window.location ='./success'
            });
          });
    
        
    };

    //generate array 1 to 44
    const gens = Array.from(Array(44), (_,x) => x+1);

    const prefix_th = (
        <Form.Item name="prefix_name" noStyle rules={[{ required: true }]}>
          <Select 
            style={{ width: 90 }} 
          >
            <Option value="นาย">นาย</Option>
            <Option value="นาง">นาง</Option>
            <Option value="นางสาว">นางสาว</Option>
          </Select>
        </Form.Item>
      );


        //Upload 
        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
        );


        const handleChange = info => {
            if (info.file.status === 'uploading') {
              setLoading(true);
              return;
            }
            if (info.file.status === 'done') {
              // Get this url from response in real world.
              getBase64(info.file.originFileObj, imageUrl => {
                  setImageUrl(imageUrl)
                  setLoading(false)
              }
              );
            }
          };


    return (
        <div style={{backgroundColor: 'rgb(239, 239, 239'}}>
            <Row style={{paddingTop:'20px', paddingBottom: '50px'}}>
                <Col span={18} offset={3} style={{backgroundColor: 'white'}}>
                    <img src={logo} style={{width:'100%'}} alt="logo civil"/>
                    <h1 className="title">ทำเนียบรุ่นศิษย์เก่าโยธาตีนดอย</h1>
                    <div className="center">
                        <Button type="primary" href="/list" >ยอดผู้ลงทะเบียน</Button>
                    </div>
                    <Row>
                        <Col span={20} offset={2}>
                            <Form 
                                name="register"
                                onFinish={handleSubmit}
                                form={form}
                                initialValues={{prefix_name: "นาย"}}
                            >
                                <div style={{textAlign:'center'}}>
                                  <h2>รูปภาพเจ้าของข้อมูล</h2>
                                  <Form.Item name="image" rules={[{required: true}]}>
                                      <Upload
                                          name="avatar"
                                          listType="picture-card"
                                          className="avatar-uploader"
                                          showUploadList={false}
                                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                          beforeUpload={beforeUpload}
                                          onChange={handleChange}
                                      >
                                          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                      </Upload>
                                  </Form.Item>

                                </div>
                                <Form.Item label="รุ่นที่" name="generation" rules={[{ required: true }]}>
                                    <Select style={{width:'50%'}}>
                                        {gens.map(gen => (
                                            <Option value={gen}>{gen}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <hr/>
                                <h2>ประวัติส่วนตัว</h2>
                                <Row>
                                    <Col lg={{span: 8}}>
                                        <Form.Item label="ชื่อ" name="firstname" rules={[{ required: true }]}>
                                                <Input
                                                    addonBefore={prefix_th}
                                                    placeholder="สมชาย"
                                                />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col lg={{span: 8, offset:1}}>
                                        <Form.Item label="นามสกุล" name="lastname" rules={[{ required: true }]}>
                                            <Input
                                                placeholder="ใจดี"

                                            />
                                        </Form.Item>
                                    </Col>
                                        
                                    <Col lg={{span:6 , offset:1}}>
                                        <Form.Item label="ชื่อเล่น" name="nickname" rules={[{ required: true }]}>
                                            <Input 
                                                style={{width:'100%'}}
                                                placeholder="ชัย"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={{span: 8}}>
                                        <Form.Item label="ยศ (ถ้ามี)" name="rank">
                                                <Input
                                                    placeholder="ร้อยตำรวจตรี"
                                                />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col lg={{span: 8, offset:1}}>
                                        <Form.Item label="เบอร์โทรศัพท์" name="phone" rules={[{required: true}]}>
                                            <Input
                                                placeholder="090-323xxxx"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={{span:15}}>
                                        <Form.Item label="ที่อยู่ปัจจุบัน" name="address" rules={[{required: true}]}>
                                            <TextArea
                                                rows={2}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <hr/>
                                <h2>การทำงาน</h2>
                                <Row>
                                    <Col lg={{span: 8}}>
                                        <Form.Item label="สถานที่ทำงาน" name="workname" rules={[{ required: true }]}>
                                                <Input
                                                    placeholder="โรงงาน..."
                                                />
                                        </Form.Item>
                                    
                                    </Col>
                                    {/* <Col lg={{span: 8, offset:1}}>
                                        <Form.Item label="ตำแหน่ง (ถ้ามี)" name="position">
                                            <Input
                                                placeholder="หัวหน้าฝ่าย..."
                                            />
                                        </Form.Item>
                                    </Col> */}
                                    <Col lg={{span: 8, offset:1 }}>
                                        <Form.Item label="จังหวัด" name="workaddress" rules={[{required: true}]}>
                                            <Select>
                                            {province_th.map(province => (
                                                <Option value={province}>{province}</Option>
                                            ))}
                                            </Select>
                                        </Form.Item>
                                    
                                    </Col>
                                </Row>
                                <span style={{textAlign:'center'}}>{uploading}</span>
                                <Button disabled={dis} htmlType="submit" type="primary" style={{marginBottom:'20px', float:'right'}}>บันทึกข้อมูล</Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default HomeComponent