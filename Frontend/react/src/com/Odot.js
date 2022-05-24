import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import '../App.css';
import { Player } from 'video-react';
// import video from '../../public/'; ‏
export default function Odot() {

    return (
        <><div className="remove" style={{ backgroundImage: `url(./תמונה1.png)`, display: 'flex', alignItems:'center', justifyContent: 'center'}} >
            <div className="back">
                <h4>למה חשוב ?</h4>
                <Typography>כל אחד מאיתנו מייצר בממוצע 2 ק”ג פסולת ביום.<br></br> לחומרים שמהן עשויות האריזות ייקח שנים רבות להתכלות, <br></br>אבל את החומרים האלה אפשר למחזר. כך, <br></br>במקום שהאריזות ייטמנו באדמה ויזהמו אותה ואת המים שאנחנו שותים, <br></br>הן יכולות לזכות לחיים חדשים. כך למשל,<br></br> בקבוק השמפו שלך יכול להפוך לאדנית לפרחים ולשמח אותך בכל בוקר מחדש.<br></br> כל מה שצריך לעשות זה להפריד בבית את האריזות למחזור.</Typography>
                <Typography>השלב הראשון בתהליך המחזור מתחיל כבר בבית כשאתם אוספים וממיינים את האריזות <br></br>מיתר הפסולת ומשליכים לפחים השונים בהתאם לסוג החומר שממנו הן עשויות:<br></br> אל הפח הכתום משליכים אריזות פלסטיק מסוגים שונים,<br></br> אריזות מתכת וקרטוני משקה וחלב.</Typography>
            </div>
            <video width="600" height="400" controls autoPlay>
                <source src="../../video/vid.mp4" type="video/mp4" />
            </video>
        </div>
        </>
    );
};

