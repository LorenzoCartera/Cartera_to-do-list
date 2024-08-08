import logo_white from '../src/assets/logo_white.png'

function Header(){
    return(
        <div className='logostrip'><p>
            <img src = {logo_white} alt = "LexMeet logo" height="35" className="logo"/>
            LexMeet</p>
        </div>
    )
}

export default Header