import React from 'react'
import './Footer.scss'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
const Footer = () => {
    return (
        <div id="footer-main-div">
            <div className="footer_cont">
            <div id="social">
                <div><FacebookIcon></FacebookIcon></div>
                <div id="ins-icon"><InstagramIcon></InstagramIcon></div>
                <div><TwitterIcon></TwitterIcon></div>
            </div>
            <div id="terms">Policy & Terms</div>
            <div id="copyright">© 2021 İsmail Şentürk</div>
            </div>
            
        </div>
    )
}

export default Footer
