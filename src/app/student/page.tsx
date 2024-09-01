import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="personal-info">
          <div className="col-md-4">
          <img src="/image/ab.jpg" className="img-fluid img-bordered" alt="Profile Picture" width="300" />
        </div>
        <div className="personalbox">
            <p>ชื่อ - นามสกุล : รามิล ไกยบุตร <br />
              รหัสนักศึกษา : 653450297-4 <br />
              อีเมลล์ : ramin.k@kkumail.com  <br />
              สาขาวิชา : วิทยาการคอมพิวเตอร์และสารสนเทศ <br /> 
              ช่องทางติดต่อ  <br />
              FB : Ramin Kaiyabut <br />
              IG : rmiin_n
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
