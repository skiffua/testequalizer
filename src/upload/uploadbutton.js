import React from 'react'
import getinfoaboutfile from './infoaboutfile/getinfoaboutfile'


function Uploadbutton (){
    return(
        <label > Виберіть трек для завантаження 
        <input type="file" id="soundsource" accept="audio/mp3" onChange={getinfoaboutfile} />
        </label>
    )
}

export default Uploadbutton