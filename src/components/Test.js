import React, { useState } from 'react';

const Test = () => {
    function formatCreatedAt(created_at) {
    const currentDate = new Date();
    const tweetDate = new Date(created_at);
    console.log("current", currentDate);
    console.log("tweet", tweetDate);

    // 경과 시간 계산 (분 단위)
    const timeDiff = Math.floor((currentDate - tweetDate) / 1000 / 60);

    if (timeDiff < 1) {
      return '방금 전';
    } else if (timeDiff < 60) {
      return `${timeDiff}분 전`;
    } else if (timeDiff < 1440) {
      const hours = Math.floor(timeDiff / 60);
      return `${hours}시간 전`;
    } else {
      const options = {
        month: 'short',
        day: 'numeric',
      };

      const formattedDate = tweetDate.toLocaleString('en-US', options);
      return formattedDate;
    }
  }

  return (
    <div className="menu-container" style={{width:"300px", backgroundColor:"yellow", padding:"10px", textAlign:"center"}}>
      <p>{formatCreatedAt("2023-05-21T09:30:00")}</p>
      <img src="img/img.jpg" style={{borderRadius:"50%", height:"48px"}} />
    </div>
  );
};

export default Test;