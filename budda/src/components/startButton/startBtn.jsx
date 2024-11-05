import React from 'react';
import './startBtn.css';
import { Link } from 'react-router-dom';

export default function StartBtn() {
  return (
    <div className="startbtncontainer">
      <Link to="/all-list" className="startbtnlink">
        <div className="startbtntext">시작하기</div>
      </Link>
    </div>
  );
}
