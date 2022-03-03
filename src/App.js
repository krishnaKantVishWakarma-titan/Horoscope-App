import './App.css';
import logo from './icons/copy.png'
import React, { useState, useRef, useEffect } from 'react';

function App() {

  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);

  const [val, setVal] = useState({
    name: '',
    date: '',
    sign: '',
    description: '',
  })

  const [date, setDate] = useState('');

  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const signRef = useRef(null);

  const nameErrRef = useRef(null);
  const dateErrRef = useRef(null);
  const signErrRef = useRef(null);

  const validation = () => {
    // validations
    var flag = true;
    nameErrRef.current.style.display = 'none';
    dateErrRef.current.style.display = 'none';
    signErrRef.current.style.display = 'none';
    if (nameRef.current.value == "") {
      nameErrRef.current.style.display = 'block';
      flag = false;
    }
    if (dateRef.current.value == "") {
      dateErrRef.current.style.display = 'block';
      flag = false;
    }
    if (signRef.current.value == "") {
      signErrRef.current.style.display = 'block';
      flag = false;
    }

    return flag; 

  }

  const _getHoroscopeHandle = () => {
    if (validation()) {
      var date;
      if (val.date === "today") {
        var newdate = new Date();
        date = newdate.getFullYear() + "-" + ("0" + (newdate.getMonth() + 1)).slice(-2) + "-" + ("0" + newdate.getDate()).slice(-2);
      } else if (val.date === "yesterday") {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        date = yesterday.getFullYear() + "-" + ("0" + (yesterday.getMonth() + 1)).slice(-2) + "-" + ("0" + yesterday.getDate()).slice(-2);
      } else if (val.date === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        date = tomorrow.getFullYear() + "-" + ("0" + (tomorrow.getMonth() + 1)).slice(-2) + "-" + ("0" + tomorrow.getDate()).slice(-2);
      }

      setDate(date);

      var formdata = new FormData();
      formdata.append("date", date);
      formdata.append("sign", val.sign.toUpperCase());
      formdata.append("api_key", "d1f255a373a3cef72e03aa9d980c7eca");
      formdata.append("timezone", "5.5");

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://divineapi.com/api/1.0/get_daily_horoscope.php", requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log("res", response)
        setVal({...val, description: response.data.prediction.personal})
        setTab1(false);
        setTab2(true);  
      })
      .catch(error => console.log('error', error));

    }
  }

  return (
    <div className="mainbody">

      <div className='cont'>
        <div className='title defaultFLoat'>Horoscope</div>

        {tab1 && (
          <>

            {/* form */}
            <div className='formcont'>

              <div className='formsin'>
                <div className='formsinname defaultFLoat'>Name*</div>
                <div className='formsinimputcont defaultFLoat'><input ref={nameRef} onChange={e => setVal({...val, name: e.target.value})} type='text' placeholder='Enter your name ....' /></div>
                <div className='formsinerror defaultFLoat displayNone' ref={nameErrRef}>*This field requird</div>
              </div>

              <div className='formsin'>
                <div className='formsinname defaultFLoat'>Date*</div>
                <div className='formsinimputcont defaultFLoat'>
                  <select ref={dateRef} onChange={e => setVal({...val, date: e.target.value})}>
                    <option value="">Select day</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                  </select>
                </div>
                <div className='formsinerror defaultFLoat displayNone' ref={dateErrRef}>*This field requird</div>
              </div>

              <div className='formsin'>
                <div className='formsinname defaultFLoat'>Horoscope Sign*</div>
                <div className='formsinimputcont defaultFLoat'>
                  <select ref={signRef} onChange={e => setVal({...val, sign: e.target.value})}>
                    <option value="">Select Sign</option>
                    <option value="aries">Aries</option>
                    <option value="taurus">Taurus</option>
                    <option value="gemini">Gemini</option>
                    <option value="cancer">Cancer</option>
                    <option value="leo">Leo</option>
                    <option value="virgo">Virgo</option>
                    <option value="libra">Libra</option>
                    <option value="scorpio">Scorpio</option>
                    <option value="sagittarius">Sagittarius</option>
                    <option value="capricorn">Capricorn</option>
                    <option value="aquarius">Aquarius</option>
                    <option value="pisces">Pisces</option>
                  </select>
                </div>
                <div className='formsinerror defaultFLoat displayNone' ref={signErrRef}>*This field requird</div>
              </div>

              <div className='defaultFLoat'>
                <button className='submitButton' onClick={_getHoroscopeHandle}><span><img src={logo} alt="s" /></span><div className='defaultRight'>Submit</div></button>
              </div>

            </div>

          </>
        )}

        {tab2 && (
          <>
          
            <div className='formcont1'>
              <div className='defaultFloat res'>
                <span className='res0'>Name : </span>
                <span className='res1'>{val.name}</span>
              </div>
              <div className='defaultFloat res'>
                <span className='res0'>Date : </span>
                <span className='res1'>{date}</span>
              </div>
              <div className='defaultFloat res'>
                <span className='res0'>Description : </span>
                <span className='res1'>{val.description}</span>
              </div>
              <div className='defaultFLoat'>
                <button className='submitButton1' onClick={() => {setTab2(false);setTab1(true)}}>Submit</button>
              </div>
            </div>
          
          </>
        )}


      </div>

    </div>
  );
}

export default App;
