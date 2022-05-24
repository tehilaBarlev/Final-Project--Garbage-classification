import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const dbContext = createContext([]);

export default function DBContext(props) {
    console.log('in render context')
    const [db, setDb] = useState([]);
    // כששולחים ל useEffect מערך ריק
    // הפונקציה ציקרא רק פעם אחת - בפעם הראשונה שהקומפוננטה נטענת
    useEffect(() => {
      // פונקציה לקריאת שרת שאמורה לקבל נתונים
      // מקבלת כפרמטר את הכתובת של השרת שממנו רוצים לקבל נתונים
      axios.get('/db.json')
      // לתוך .then 
      // יש לשלוח פונקציה, הפונקציה הזו תורץ כאשר הנתונים יגיעו, מקבלת כפרמטר את הנתונים שהגיעו מהשרת
      .then((data) => {
        setDb(data.data);
      })
    }, []);
  
  // סוג של קומפוננטה שמגיעה עם הקונטקס, כל קומפונטה שתהיה בפנים, תוכל לגשת למידע שיש בקונטקסט הזה
  // value prop - מכיל את המידע שאנו רוצים שיהיה בקונקסט
    return (
    <dbContext.Provider value={db}>
      {/* children - מאפיין שמגיע תמיד, מכיל את מה שנכנס בתוך הקומפוננטה */}
      { props.children }
    </dbContext.Provider>
    );
  }
