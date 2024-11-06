import Logo from '../../assets/icons/logo';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6><Logo /><b>ShopE</b></h6>
            <p>House My Brand designs clothing for the young, the old & everyone in between – but most
              importantly, for the fashionable</p>

          </div>

          <div className="site-footer__links">
            <ul>
              <li>Shopping online</li>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Payment options</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
            <ul>
              <li>Information</li>
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">Bacome a member</a></li>
              <li><a href="#">Site feedback</a></li>
            </ul>
            <ul>
              <li>Contact</li>
              <li><a href="#">vkaran242@gmail.com</a></li>
              <li><a href="#">+91 8287674409</a></li>
              <li><a title='linkedin' href="https://www.linkedin.com/in/karan-verma-306546288"><i className="icon-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
      </div>
    </footer>
  )
};


export default Footer